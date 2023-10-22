import ky from 'ky';
import { FC, useState } from 'react';
import { config } from 'src/utils/config/config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledAuthLink } from '../styled/StyledAuthLink';
import Cookie from 'js-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyledSubmit } from '../styled/StyledSubmit';
import { FormError } from '../common/FormError';
import { StyledBtn } from '../styled/StyledBtn';

interface LoginData {
  username: string;
  pwd: string;
}

export const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async ({
    username,
    pwd,
  }: LoginData): Promise<void> => {
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

      navigate('/presc');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginContainer>
      <h1>Portfel leków i e-recept</h1>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Logowanie</h2>
        <div>
          <label>
            <input
              type="text"
              placeholder="nazwa użytownika"
              {...register('username', { required: true })}
            />
            <FormError
              error={errors.username}
              message="To pole jest wymagane"
            />
          </label>

          <label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="hasło"
              {...register('pwd', { required: true })}
            />
            <FormError error={errors.pwd} message="To pole jest wymagane" />
          </label>
          <StyledBtn
            onClick={() => setShowPassword(prev => !prev)}
            type="button"
          >
            👁️
          </StyledBtn>

          <StyledSubmit type="submit" />
        </div>
      </LoginForm>
      <div>
        <p>
          Nie masz jeszcze konta?{' '}
          <StyledAuthLink to="/register"> Zarejestruj się! </StyledAuthLink>
        </p>
        <StyledBtn onClick={() => onSubmit({ username: 'test', pwd: 'haslo' })}>
          Wypróbuj demo{' '}
        </StyledBtn>
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

const LoginForm = styled.form`
  h2 {
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    text-align: center;
  }

  div {
    text-align: center;
    label {
      display: block;
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
  }
`;
