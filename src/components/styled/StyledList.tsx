import styled from 'styled-components';

export const StyledList = styled.ul`
  display: flex;
  padding: 0;
  /* border: 1px solid; */
  margin: 1rem auto;
  width: 80vw;
  list-style: none;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  li {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
    flex-basis: 35%;
    border: 2px solid navy;
    border-radius: 2rem;
    padding: 0.2rem;
    text-align: center;

    div {
      flex-grow: 1;
      align-self: center;
    }
  }
`;
