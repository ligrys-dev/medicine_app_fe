import { SyntheticEvent, useEffect, useState } from 'react';
// import ky from 'ky';
import { SimpleMedicineEntity } from 'types';
import { CancelBtn } from 'src/components/common/cancelBtn';
import { config } from 'src/utils/config/config';
import { api } from 'src/utils/api';

interface Props {
  onCancel: () => void;
  onSave: (assignedMedId: string) => void;
}

export const AssignMeds = ({ onCancel, onSave }: Props) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [meds, setMeds] = useState<SimpleMedicineEntity[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await api.get(`${config.apiUrl}/medicine/`).json();

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
