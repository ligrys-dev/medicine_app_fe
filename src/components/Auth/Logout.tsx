import { Link } from 'react-router-dom';

export const Logout = () => {
  const onLogout = () => localStorage.removeItem('token');

  return (
    <Link onClick={onLogout} to="/login">
      Wyloguj
    </Link>
  );
};
