import { useParams } from 'react-router-dom';
import { MedDetails } from 'src/components/MedDetails';

export const SingleMedView = () => {
  const { id } = useParams();

  return <MedDetails id={id ?? ''} />;
};
