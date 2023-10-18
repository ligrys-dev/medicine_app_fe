/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from 'js-cookie';
import { ReactNode, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from 'src/components/Auth/Login';
import { Register } from 'src/components/Auth/Register';
import { AppView } from 'src/views/AppView';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get('token');
  if (!isAuthenticated) {
    useEffect(() => {
      navigate('/login');
    });
  }

  return children;
};

export const App = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="*" element={<PrivateRoute children={<AppView />} />}></Route>
    </Routes>
  );
};
