import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  background: navy;
  border: 1px solid;
  border-radius: 1rem;
  padding: 0.2rem 1rem;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: white;
    color: navy;
  }
`;
