package com.cnpm.eLibrary_service.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils; // Thêm cái này nếu cần inject biến private

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class FileServiceTest {

    @InjectMocks
    private FileServiceImpl fileService;


    @Test
    void saveFile_Success() throws IOException {
        // GIVEN
        // Giả lập một file upload từ client
        String fileName = "test-image.jpg";
        String content = "Hello World Content";
        MockMultipartFile multipartFile = new MockMultipartFile(
                "file",
                fileName,
                "image/jpeg",
                content.getBytes()
        );

        String subDir = "books";
        // WHEN
        String resultPath = fileService.saveFile(multipartFile, subDir);

        // THEN
        assertNotNull(resultPath);
        assertTrue(resultPath.contains(fileName)); // Tên file trả về phải chứa tên gốc
        assertTrue(resultPath.contains(subDir));   // Phải chứa subDir

        // Kiểm tra file có thực sự được tạo ra không
        File savedFile = new File(resultPath);
        assertTrue(savedFile.exists());
        assertTrue(savedFile.isFile());

        Files.deleteIfExists(savedFile.toPath());
        savedFile.getParentFile().delete();
    }
}