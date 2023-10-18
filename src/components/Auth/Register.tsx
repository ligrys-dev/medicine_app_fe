import ky from 'ky';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/utils/config/config';
import { ConfirmBtn } from '../common/ConfirmBtn';
import { StyledAuthLink } from '../styled/StyledAuthLink';

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
    <RegisterContainer>
      <h1>Portfel leków i e-recept</h1>
      <RegisterForm>
        <h2>Rejstracja</h2>
        <div>
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
          <ConfirmBtn onClick={handleRegister}>Zarejestruj</ConfirmBtn>
        </div>
      </RegisterForm>
      <div>
        <p>
          Masz już konto?{' '}
          <StyledAuthLink to="/login"> Zaloguj się! </StyledAuthLink>
        </p>
      </div>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  width: 60vw;
  margin: 2rem auto;
  padding: 1rem;

  div {
    text-align: center;
  }

  h1 {
    text-align: center;
    text-transform: uppercase;
    color: navy;
  }
`;

const RegisterForm = styled.div`
  h2 {
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    text-align: center;
  }

  div {
    text-align: center;
    input {
      background: navy;
      color: white;
      padding: 0.2rem 0.5rem;
      margin: 0.3rem 0.3rem;
      border: 2px solid navy;
      border-radius: 1rem;

      &::placeholder {
        color: white;
        opacity: 70%;
      }
    }
  }
`;
