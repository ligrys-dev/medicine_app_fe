import ky, { HTTPError } from 'ky';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useErrorHandler } from 'src/utils/hooks/useErrorHandler';
import { config } from 'src/utils/config/config';
import { ErrorPage } from '../common/ErrorPage';
import { FormError } from '../common/FormError';
import { StyledAuthLink } from '../styled/StyledAuthLink';
import { StyledSubmit } from '../styled/StyledSubmit';
import { StyledBtn } from '../styled/StyledBtn';

interface RegisterData {
  username: string;
  email: string;
  peselNumber: string;
  password: string;
  confirmPwd: string;
}

export const Register: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { error, clearError, handleError } = useErrorHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterData>();

  const onSubmit: SubmitHandler<RegisterData> = async ({
    username,
    password,
    email,
    peselNumber,
    confirmPwd,
  }: RegisterData): Promise<void> => {
    if (password !== confirmPwd) {
      setError('confirmPwd', { type: 'manual', message: 'Hasła nie pasują' });
      return;
    }

    try {
      await ky.post(`${config.apiUrl}/register`, {
        json: { username, password, email, peselNumber },
      });

      navigate('/login');
    } catch (e) {
      handleError(e as HTTPError);
    }
  };

  if (error)
    return (
      <>
        <ErrorPage error={error}>
          <StyledBtn onClick={clearError}>Wyczyść</StyledBtn>
        </ErrorPage>
      </>
    );

  return (
    <RegisterContainer>
      <h1>Portfel leków i e-recept</h1>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Rejstracja</h2>
        <div>
          <label>
            <input
              type="text"
              placeholder="nazwa użytkownika"
              {...register('username', { required: true })}
            />
            <FormError
              error={errors.username}
              message="To pole jest wymagane"
            />
          </label>

          <label>
            <input
              type="email"
              placeholder="email"
              {...register('email', { required: true })}
            />
            <FormError error={errors.email} message="To pole jest wymagane" />
          </label>

          <label>
            <input
              type="number"
              placeholder="PESEL"
              {...register('peselNumber', {
                required: true,
                maxLength: 11,
                minLength: 11,
              })}
            />
            <FormError
              error={errors.email}
              message={
                errors.email?.type === 'required'
                  ? 'To pole jest wymagane'
                  : 'PESEL musi zawierać dokładnie 11 cyfr'
              }
            />
          </label>

          <label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="hasło"
              {...register('password', { required: true })}
            />

            <FormError
              error={errors.password}
              message="To pole jest wymagane"
            />
          </label>

          <label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="powtóż hasło"
              {...register('confirmPwd', { required: true })}
            />
            <FormError
              error={errors.confirmPwd}
              message={
                errors.confirmPwd?.type === 'required'
                  ? 'To pole jest wymagane'
                  : 'Hasła nie pasują'
              }
            />
          </label>

          <StyledBtn
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
          >
            👁️
          </StyledBtn>
          <StyledSubmit type="submit" />
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

const RegisterForm = styled.form`
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
        margin: 0.3rem 0.3rem;
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
