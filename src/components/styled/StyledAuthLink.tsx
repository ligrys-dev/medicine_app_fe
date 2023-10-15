import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledAuthLink = styled(Link)`
  padding: 0 0.5rem;
  color: navy;
  text-decoration: none;
  border-radius: 1rem;
  transition: 0.2s;

  &:hover {
    color: white;
    background-color: navy;
  }
`;
