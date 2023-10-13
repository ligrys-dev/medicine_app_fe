import { Link } from 'react-router-dom';
import { SimpleMedicineEntity } from 'types';

interface Props {
  med: SimpleMedicineEntity;
  onDeleteMed: (id: string) => void;
}

export const Med = ({ med, onDeleteMed }: Props) => (
  <li>
    {med.name} <Link to={med.id}>Szczegóły</Link>
    <button onClick={() => onDeleteMed(med.id)}>Usuń</button>
  </li>
);
