interface Props {
  onCancel: () => void;
}

export const CancelBtn = ({ onCancel }: Props) => {
  return <button onClick={onCancel}>Anuluj</button>;
};
