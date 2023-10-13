// Register.tsx
import ky from 'ky';
import { FC, useState } from 'react';

export const Register: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      await ky.post('/register', { json: { username, password } });

      // Przekieruj użytkownika do strony logowania po udanej rejestracji
      // history.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
