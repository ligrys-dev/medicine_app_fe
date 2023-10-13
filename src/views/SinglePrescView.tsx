import { useParams } from 'react-router-dom';
import { PrescDetails } from 'src/components/PrescDetails';

export const SinglePrescView = () => {
  const { id } = useParams();

  return <PrescDetails id={id ?? ''} />;
};
