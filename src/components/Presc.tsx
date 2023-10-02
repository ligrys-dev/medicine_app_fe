import { Link } from 'react-router-dom';
import { PrescriptionEntity } from 'types';

interface Props {
  presc: PrescriptionEntity;
}

export const Presc = ({ presc }: Props) => (
  <li>
    {presc.prescriptionNumber}{' '}
    <Link to={presc.id ?? ''} state={presc}>
      Szczegóły
    </Link>
  </li>
);
