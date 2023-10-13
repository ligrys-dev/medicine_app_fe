import { useEffect } from 'react';
import { AddMed } from 'src/components/Med/AddMed';
import { useAuth } from 'src/utils/hooks/useAuth';

export const MedFormView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return <AddMed />;
};
