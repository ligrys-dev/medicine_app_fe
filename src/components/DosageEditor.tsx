import React, { useState } from 'react';
import { Dosage } from 'types';

interface Props {
  initialDosage: Dosage;
  onSave: (editedDosage: Dosage) => void;
  onCancel: () => void;
}

export const DosageEditor = ({ initialDosage, onSave, onCancel }: Props) => {
  const [editedDosage, setEditedDosage] = useState<Dosage>(initialDosage);

  const handleDosageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDosage(prevDosage => ({
      ...prevDosage,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editedDosage);
  };

  return (
    <div>
      <input
        type="number"
        name="dailyDoses"
        value={editedDosage.dailyDoses}
        onChange={handleDosageChange}
      />
      x
      <input
        type="number"
        name="doseQuantity"
        value={editedDosage.doseQuantity}
        onChange={handleDosageChange}
      />
      <input
        type="text"
        name="doseUnit"
        value={editedDosage.doseUnit}
        onChange={handleDosageChange}
      />
      <button onClick={handleSaveClick}>Zapisz</button>
      <button onClick={onCancel}>Anuluj</button>
    </div>
  );
};
