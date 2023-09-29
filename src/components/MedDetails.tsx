import ky from 'ky';
import { useEffect, useState } from 'react';
import { config } from '../utils/config/config';
import { Dosage, MedicineEntity } from 'types';
import { Spinner } from './common/Spinner';
import { Link } from 'react-router-dom';
import { DosageEditor } from './DosageEditor';

interface Props {
  id: string;
}

export const MedDetails = ({ id }: Props) => {
  const [med, setMed] = useState<MedicineEntity | null>(null);
  const [isEditingDosage, setIsEditingDosage] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await ky.get(`${config.apiUrl}/medicine/${id}`).json();
      setMed(data as MedicineEntity);
    })();
  }, [id]);

  const handleEditDosageClick = () => {
    setIsEditingDosage(true);
  };

  const handleSaveDosageClick = async (editedDosage: Dosage) => {
    // Wyślij nowe dawkowanie na serwer
    await ky.patch(`${config.apiUrl}/medicine/${id}`, {
      json: { dosage: editedDosage },
    });
    // Zaktualizuj lokalny stan z nowym dawkowaniem
    setMed(
      prevMed =>
        ({
          ...prevMed,
          dosage: editedDosage,
        } as MedicineEntity),
    );
    // Wyłącz tryb edycji
    setIsEditingDosage(false);
  };

  if (med === null) return <Spinner />;
  return (
    <>
      <p>
        {med.name} - {med.form}
      </p>
      <p>
        Dawkowanie: {med.dosage.dailyDoses} x {med.dosage.doseQuantity}{' '}
        {med.dosage.doseUnit}{' '}
        {isEditingDosage ? (
          <DosageEditor
            initialDosage={med.dosage}
            onSave={handleSaveDosageClick} // Przekazujemy funkcję obsługi zapisu
            onCancel={() => setIsEditingDosage(false)} // Dodajemy obsługę anulowania
          />
        ) : (
          <button onClick={handleEditDosageClick}>Edytuj</button>
        )}
      </p>

      {med.startDate !== null && (
        <p>
          Data rozpoczęcia:{' '}
          {med.startDate ? new Date(med.startDate).toLocaleDateString() : ''}
        </p>
      )}

      {med.endDate !== null && (
        <p>
          Data zakoczenia:{' '}
          {med.endDate ? new Date(med.endDate).toLocaleDateString() : ''}
        </p>
      )}

      <p>Notatka: {med.note}</p>
      <Link to="../medicine">Powrót</Link>
    </>
  );
};
