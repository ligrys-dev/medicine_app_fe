import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logout = () => {
  const onLogout = () => Cookies.remove('token');

  return (
    <StyledLink onClick={onLogout} to="/login">
      Wyloguj
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  margin-bottom: 0.2rem;
  color: navy;
  text-decoration: none;
  background: white;
  border: 1px solid navy;
  border-radius: 1rem;
  padding: 0 1rem;
  transition: 0.2s;

  &:hover {
    color: white;
    background: navy;
    text-decoration: underline;
  }
`;
