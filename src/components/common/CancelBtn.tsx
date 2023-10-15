import { ConfirmBtn } from './ConfirmBtn';

interface Props {
  onCancel: () => void;
}

export const CancelBtn = ({ onCancel }: Props) => {
  return <ConfirmBtn onClick={onCancel}>Anuluj</ConfirmBtn>;
};
