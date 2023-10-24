import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  error: Error;
  children?: ReactNode;
}

export const ErrorPage = ({ error, children }: Props) => (
  <Container>
    <h2>Coś poszło nie tak :( </h2>
    <div>{error.message}</div>
    {children}
  </Container>
);

const Container = styled.div`
  margin: 0 auto;
  text-align: center;
  color: navy;

  div {
    color: crimson;
    margin: 1rem auto;
    border: 2px solid crimson;
    width: 50%;
    padding: 3rem 1rem;
    border-radius: 100rem;
  }
`;
