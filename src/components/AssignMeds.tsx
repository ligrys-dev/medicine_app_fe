import { SyntheticEvent, useEffect, useState } from 'react';
import { CancelBtn } from './common/cancelBtn';
import { SimpleMedicineEntity } from 'types';
import { config } from '../utils/config/config';
import ky from 'ky';

interface Props {
  onCancel: () => void;
  onSave: (assignedMedId: string) => void;
}

export const AssignMeds = ({ onCancel, onSave }: Props) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [meds, setMeds] = useState<SimpleMedicineEntity[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await ky.get(`${config.apiUrl}/medicine/`).json();

      setMeds(data as SimpleMedicineEntity[]);
    })();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // console.log('Wybrana opcja:', selectedOption);
    onSave(selectedOption);
  };

  return (
    <>
      <p>Przypisz leki</p>
      <form onSubmit={handleSubmit}>
        <label>
          Wybierz opcję:
          <select
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
          >
            {meds?.map(med => (
              <option key={med.id} value={med.id}>
                {med.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Wyślij</button>
      </form>
      <CancelBtn onCancel={onCancel} />
    </>
  );
};
