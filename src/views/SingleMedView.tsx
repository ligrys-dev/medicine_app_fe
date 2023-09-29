import { MedDetails } from '../components/MedDetails';
import { useParams } from 'react-router-dom';

export const SingleMedView = () => {
  const { id } = useParams();

  return <MedDetails id={id ?? ''} />;
};
