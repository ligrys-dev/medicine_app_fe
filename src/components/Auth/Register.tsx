// Register.tsx
import ky from 'ky';
import { FC, useState } from 'react';
import { config } from 'src/utils/config/config';
import { Link, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await ky.post(`${config.apiUrl}/register`, {
        json: { username, password, email },
      });

      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <div>
        <h2>Rejstracja</h2>
        <input
          type="text"
          placeholder="nazwa użytkownika"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Zarejestruj</button>
      </div>
      <div>
        <p>
          Masz już konto? <Link to="/login"> Zaloguj się! </Link>
        </p>
      </div>
    </>
  );
};
