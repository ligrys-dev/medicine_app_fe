// Login.tsx
import ky from 'ky';
import { FC, useState } from 'react';
import { config } from 'src/utils/config/config';
import { Link, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await ky
        .post(`${config.apiUrl}/login`, {
          json: { username, pwd },
        })
        .json();

      const token = response as { token: string };

      console.log(token);

      localStorage.setItem('token', token.token);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <div>
        <h2>Logowanie</h2>
        <input
          type="text"
          placeholder="nazwa użytkownika"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="hasło"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
        />
        <button onClick={handleLogin}>Zaloguj</button>
      </div>
      <div>
        <p>
          Nie masz jeszcze konta? <Link to="/register"> Załóż je! </Link>
        </p>
      </div>
    </>
  );
};
