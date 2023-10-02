import { useParams } from 'react-router-dom';
import { PrescDetails } from '../components/PrescDetails';

export const SinglePrescView = () => {
  const { id } = useParams();

  return <PrescDetails id={id ?? ''} />;
};
