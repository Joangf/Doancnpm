package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.*;
import com.cnpm.eLibrary_service.dto.response.AuthenticationResponse;
import com.cnpm.eLibrary_service.dto.response.IntrospectResponse;
import com.cnpm.eLibrary_service.dto.response.ResetPasswordResponse;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.AuthenticationService;
import com.cnpm.eLibrary_service.service.MailService;
import com.cnpm.eLibrary_service.service.RedisService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RedisService redisService;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    @Value("${jwt.signerKey}")
    protected String SECRET_KEY;

    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    @Override
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();

    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() ->new AppException(ErrorCode.USERNAME_NOT_EXISTED));

        boolean isAuthenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if(!isAuthenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        String token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(isAuthenticated)
                .build();
    }

    @Override
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signedToken = verifyToken(request.getToken(), true);

            var jti = signedToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signedToken.getJWTClaimsSet().getExpirationTime();

            long ttl = (expiryTime.getTime() - System.currentTimeMillis()) / 1000;

            if (ttl > 0) {
                redisService.setValue(jti, request.getToken(), ttl, TimeUnit.SECONDS);
            }

        } catch (AppException e) {
            log.info("Token already expired");
        }
    }

    @Override
    public AuthenticationResponse refreshToken(RefreshTokenRequest request) throws ParseException, JOSEException {
        var signedToken = verifyToken(request.getToken(), true);

        var jti = signedToken.getJWTClaimsSet().getJWTID();
        Date expiryTime = signedToken.getJWTClaimsSet().getExpirationTime();


        long ttl = (expiryTime.getTime() - System.currentTimeMillis()) / 1000;

        if (ttl > 0) {
            redisService.setValue(jti, request.getToken(), ttl, TimeUnit.SECONDS);
        }

        String username = signedToken.getJWTClaimsSet().getSubject();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        String newToken = generateToken(user);
        return AuthenticationResponse.builder()
                .token(newToken)
                .authenticated(true)
                .build();
    }

    @Override
    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_EMAIL_NOT_EXISTED));

        String token = UUID.randomUUID().toString();


        redisService.setValue("RESET:" + token, user.getUsername(), 5L, TimeUnit.MINUTES);

        String subject = "Đổi mật khẩu eLibrary";
        String body = "Xin chào,\n\nToken của bạn là: " + token
                + "\nMã này sẽ hết hạn sau 5 phút.\n\nTrân trọng,\neLibrary Team";
        mailService.sendEmail(user.getEmail(), subject,body);
    }

    @Override
    public ResetPasswordResponse resetPassword(ResetPasswordRequest request) {
        String username = redisService.getValue("RESET:" + request.getToken());
        if (username == null) {
            throw new AppException(ErrorCode.INVALID_OR_EXPIRED_TOKEN);
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USERNAME_NOT_EXISTED));

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);


        redisService.deleteValue("RESET:" + request.getToken());

        return ResetPasswordResponse.builder()
                .username(username)
                .password(request.getPassword())
                .build();
    }

    private SignedJWT verifyToken(String token, boolean isRefresh)
            throws ParseException, JOSEException {
        JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = isRefresh
                ? new Date(signedJWT
                .getJWTClaimsSet().getIssueTime()
                .toInstant().plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS).toEpochMilli())
                :signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean isValid = signedJWT.verify(verifier);

        if(!(isValid && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if(redisService.getValue(signedJWT.getJWTClaimsSet().getJWTID()) != null)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    private String generateToken(User user)  {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("hoangha.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("role", user.getRole().toString())
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader,payload);


        try {
            jwsObject.sign(new MACSigner(SECRET_KEY.getBytes()));
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
        return jwsObject.serialize();
    }


}
