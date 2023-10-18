import { StyledBtn } from '../styled/StyledBtn';

interface Props {
  onCancel: () => void;
}

export const CancelBtn = ({ onCancel }: Props) => {
  return <StyledBtn onClick={onCancel}>Anuluj</StyledBtn>;
};
