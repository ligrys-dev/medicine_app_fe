import { FieldErrors } from 'react-hook-form';
import { MedicineEntity } from 'types';

interface Props {
  message: string;
  error: FieldErrors<MedicineEntity> | undefined;
}

export const FormError = ({ message, error }: Props) => {
  if (!error) return;
  return <span>{message}</span>;
};
