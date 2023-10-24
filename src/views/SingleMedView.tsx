import { useParams } from 'react-router-dom';
import { MedDetails } from 'src/components/Med/MedDetails';

export const SingleMedView = () => {
  const { id } = useParams();

  return <MedDetails id={id ?? ''} />;
};
