import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from 'src/components/Auth/Login';
import { Register } from 'src/components/Auth/Register';
import { AppView } from 'src/views/AppView';
import { useAuth } from './utils/hooks/useAuth';

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const isAuthenticated = !!Cookies.get('token');

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return children;
};

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<PrivateRoute children={<AppView />} />}></Route>
    </Routes>
  );
};
