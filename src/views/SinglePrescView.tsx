import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PrescDetails } from 'src/components/Prescription/PrescDetails';
import { useAuth } from 'src/utils/hooks/useAuth';

export const SinglePrescView = () => {
  const { id } = useParams();

  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return <PrescDetails id={id ?? ''} />;
};
