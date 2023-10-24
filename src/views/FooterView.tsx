import styled from 'styled-components';

export const FooterView = () => {
  return (
    <>
      <Footer>
        <p>Projekt na zaliczenie MegaK -- Maciej Ligęza 2023</p>
      </Footer>
    </>
  );
};

const Footer = styled.footer`
  text-align: center;
  background: navy;
  color: white;
  width: 80vw;
  margin: 0 auto;
  border-radius: 0.2rem;
`;
