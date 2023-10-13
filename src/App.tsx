// App.tsx
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { AppView } from './views/AppView';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate('/login');
  // }, [navigate]);

  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) {
    navigate('/login');
    return null;
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
