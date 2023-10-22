import styled from 'styled-components';

export const StyledBtn = styled.button`
  /* display: block; */
  margin: 0 0.4rem;
  padding: 0.2rem 0.5rem;
  text-transform: uppercase;
  background: navy;
  color: white;
  border: 1px solid navy;
  border-radius: 2rem;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: navy;
    background: white;
  }
`;
