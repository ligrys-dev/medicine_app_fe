// Login.tsx
import ky from 'ky';
import React, { useState } from 'react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await ky.post('/login', {
        json: { username, password },
      });

      const token = response.body;

      console.log(token);

      // Zapisz token w localStorage lub ciasteczku (zależnie od potrzeb)
      // localStorage.setItem('token', token);

      // Przekieruj użytkownika do innej strony po zalogowaniu
      // np. history.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
