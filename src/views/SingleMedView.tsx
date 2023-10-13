import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MedDetails } from 'src/components/MedDetails';
import { useAuth } from 'src/utils/hooks/useAuth';

export const SingleMedView = () => {
  const { id } = useParams();
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return <MedDetails id={id ?? ''} />;
};
