import { Link } from 'react-router-dom';
import { Logout } from 'src/components/Auth/Logout';
import styled from 'styled-components';

export const HeaderView = () => (
  <HeaderContainer>
    <StyledHeader>
      <h1>Portfel e-recept i leków </h1>
      <StyledNav>
        <NavLink to="/medicine">Leki</NavLink>{' '}
        <NavLink to="/medicine/add">Dodaj lek</NavLink>{' '}
        <NavLink to="/presc">Recepty</NavLink>{' '}
        <NavLink to="/presc/add">Dodaj receptę</NavLink> <Logout />
      </StyledNav>
    </StyledHeader>
  </HeaderContainer>
);

const HeaderContainer = styled.div`
  width: 80vw;
  margin: 0 auto;
`;

const StyledHeader = styled.header`
  background: navy;

  border: 2px solid navy;
  border-radius: 0.25rem;

  h1 {
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    background: navy;
    color: white;
    margin: 1rem 0 0 0;
    padding: 1rem;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: navy;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-bottom: 0.3rem;

  &:hover {
    text-decoration: underline;
  }
`;
