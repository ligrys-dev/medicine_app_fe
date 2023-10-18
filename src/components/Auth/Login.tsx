import ky from 'ky';
import { FC, useState } from 'react';
import { config } from 'src/utils/config/config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ConfirmBtn } from '../common/ConfirmBtn';
import { StyledAuthLink } from '../styled/StyledAuthLink';
import Cookie from 'js-cookie';

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

      Cookie.set('token', token.token, {
        expires: 1 / 24,
      });

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginContainer>
      <h1>Portfel leków i e-recept</h1>
      <LoginForm>
        <h2>Logowanie</h2>
        <div>
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
          <ConfirmBtn onClick={handleLogin}>Zaloguj</ConfirmBtn>
        </div>
      </LoginForm>
      <div>
        <p>
          Nie masz jeszcze konta?{' '}
          <StyledAuthLink to="/register"> Zarejestruj się! </StyledAuthLink>
        </p>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 60vw;
  margin: 2rem auto;
  padding: 1rem;

  div {
    text-align: center;
  }

  h1 {
    /* font-family: none; */
    text-align: center;
    text-transform: uppercase;
    color: navy;
  }
`;

const LoginForm = styled.div`
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
      margin: 0.2rem 0.3rem;
      border: 2px solid navy;
      border-radius: 1rem;

      &::placeholder {
        color: white;
        opacity: 70%;
      }
    }
  }
`;
