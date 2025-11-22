import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const getUserInfo = async (token) =>{
  localStorage.setItem('authToken', token);
  const response = await fetch(`${API_URL}/user/my-info`, {
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
  const idUser = data.result.id;
  localStorage.setItem('idUser', idUser);
  localStorage.setItem('isLoggedIn', 'true');
}
const OAuthSuccess = ({ setIsLoggedIn }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = params.get('token');
    getUserInfo(token);
    setIsLoggedIn(true);
    navigate("/");
  }, []);
};
export default OAuthSuccess;
