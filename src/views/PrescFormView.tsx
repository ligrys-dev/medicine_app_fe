import { useEffect } from 'react';
import { AddPresc } from 'src/components/Prescription/AddPresc';
import { useAuth } from 'src/utils/hooks/useAuth';

export const PrescFormView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return <AddPresc />;
};
