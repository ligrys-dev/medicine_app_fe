import { PrescriptionEntity } from 'types';
import { DeleteBtn } from '../common/DeleteBtn';
import { StyledLink } from '../styled/StyledLink';

interface Props {
  presc: PrescriptionEntity;
  onPrescDelete: (id: string) => void;
}

export const Presc = ({ presc, onPrescDelete }: Props) => (
  <li>
    <div>{presc.prescriptionNumber}</div>{' '}
    <StyledLink to={presc.id ?? ''} state={presc}>
      Szczegóły
    </StyledLink>
    <DeleteBtn onClick={() => onPrescDelete(presc.id ?? '')}>Usuń</DeleteBtn>
  </li>
);
