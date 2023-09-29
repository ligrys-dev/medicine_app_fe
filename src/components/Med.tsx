import { Link } from 'react-router-dom';
import { SimpleMedicineEntity } from 'types';

interface Props {
  med: SimpleMedicineEntity;
}

export const Med = ({ med }: Props) => {
  return (
    <li>
      {med.name} <Link to={med.id}>Szczegóły</Link>
    </li>
  );
};
