import { useNavigate } from 'react-router-dom';
import ky from 'ky';
import { config } from 'src/utils/config/config';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const navigate = useNavigate();
  const validateToken = () => {
    const token = Cookies.get('token');
    const apiToken = ky
      .post(`${config.apiUrl}/verify`, { json: { token } })
      .json();
    if (!token || !apiToken) {
      navigate('/login');
    }
  };

  return { validateToken };
};
