import { useEffect } from 'react';
import { useAuth } from 'src/utils/hooks/useAuth';

export const FooterView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return (
    <>
      <hr />
      <footer>
        <p>ligrys 2023</p>
      </footer>
    </>
  );
};
