import { useEffect } from 'react';
import { PrescList } from 'src/components/PrescList';
import { useAuth } from 'src/utils/hooks/useAuth';

export const PrescView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return <PrescList />;
};
