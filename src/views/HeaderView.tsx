import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from 'src/components/Auth/Logout';
import { useAuth } from 'src/utils/hooks/useAuth';

export const HeaderView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });
  return (
    <>
      <header>
        <h1>Moje leki</h1>
        <h2>Portfel e-recept i leków </h2>
      </header>
      <nav>
        <Link to="/medicine">Leki</Link>{' '}
        <Link to="/medicine/add">Dodaj lek</Link>{' '}
        <Link to="/presc">Recepty</Link>{' '}
        <Link to="/presc/add">Dodaj receptę</Link>
      </nav>
      <div>
        <Logout />
      </div>
      <hr />
    </>
  );
};
