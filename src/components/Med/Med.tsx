import { SimpleMedicineEntity } from 'types';
import { DeleteBtn } from '../common/DeleteBtn';
import { StyledLink } from '../styled/StyledLink';

interface Props {
  med: SimpleMedicineEntity;
  onDeleteMed: (id: string) => void;
}

export const Med = ({ med, onDeleteMed }: Props) => (
  <li>
    <div> {med.name} </div>
    <StyledLink to={med.id}>Szczegóły</StyledLink>
    <DeleteBtn onClick={() => onDeleteMed(med.id)}>Usuń</DeleteBtn>
  </li>
);
