import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export const ConfirmBtn = ({ children, onClick }: Props) => {
  return <StyledBtn onClick={onClick}>{children}</StyledBtn>;
};

const StyledBtn = styled.button`
  /* display: block; */
  margin: 0 0.8rem;
  padding: 0.2rem 0.5rem;
  text-transform: uppercase;
  background: navy;
  color: white;
  border: 1px solid navy;
  border-radius: 2rem;
  transition: 0.2s;

  &:hover {
    color: navy;
    background: white;
  }
`;
