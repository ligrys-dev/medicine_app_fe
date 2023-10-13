import { Link } from 'react-router-dom';
import { PrescriptionEntity } from 'types';

interface Props {
  presc: PrescriptionEntity;
  onPrescDelete: (id: string) => void;
}

export const Presc = ({ presc, onPrescDelete }: Props) => (
  <li>
    {presc.prescriptionNumber}{' '}
    <Link to={presc.id ?? ''} state={presc}>
      Szczegóły
    </Link>
    <button onClick={() => onPrescDelete(presc.id ?? '')}>Usuń</button>
  </li>
);
