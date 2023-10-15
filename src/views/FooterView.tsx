import { useEffect } from 'react';
import { useAuth } from 'src/utils/hooks/useAuth';
import styled from 'styled-components';

export const FooterView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return (
    <>
      <Footer>
        <p>ligrys 2023</p>
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
