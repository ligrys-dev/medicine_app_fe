import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export const DeleteBtn = ({ children, onClick }: Props) => {
  return <StyledBtn onClick={onClick}>{children}</StyledBtn>;
};

const StyledBtn = styled.button`
  font-size: 1rem;
  display: block;
  margin-left: 0.3rem;
  text-decoration: none;
  color: white;
  background: navy;
  border: 1px solid;
  border-radius: 1rem;
  padding: 0.2rem 1rem;
  transition: 0.2s;

  &:hover {
    background: white;
    color: navy;
  }
`;
