// import ky from 'ky';
import { useEffect, useState } from 'react';
import { config } from '../utils/config/config';
import { Dosage, MedicineEntity, PrescriptionMedicine } from 'types';
import { Spinner } from './common/Spinner';
import { Link } from 'react-router-dom';
import { DosageEditor } from './DosageEditor';
import { api } from '../utils/api';

interface Props {
  id: string;
}

export const MedDetails = ({ id }: Props) => {
  const [med, setMed] = useState<MedicineEntity | null>(null);
  const [isEditingDosage, setIsEditingDosage] = useState(false);
  const [prescriptions, setPrescriptions] = useState<
    PrescriptionMedicine[] | null
  >(null);

  useEffect(() => {
    (async () => {
      const medicineData = await api
        .get(`${config.apiUrl}/medicine/${id}`)
        .json();
      setMed(medicineData as MedicineEntity);

      const prescriptionData = await api
        .get(`${config.apiUrl}/prescription/medicine/${id}`)
        .json();

      // console.log(prescriptionData);
      setPrescriptions(prescriptionData as PrescriptionMedicine[]);
    })();
  }, [id]);

  const handleEditDosageClick = () => {
    setIsEditingDosage(true);
  };

  const handleSaveDosageClick = async (editedDosage: Dosage) => {
    await api.patch(`${config.apiUrl}/medicine/${id}`, {
      json: { dosage: editedDosage },
    });
    setMed(
      prevMed =>
        ({
          ...prevMed,
          dosage: editedDosage,
        } as MedicineEntity),
    );
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
            onSave={handleSaveDosageClick}
            onCancel={() => setIsEditingDosage(false)}
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

      {prescriptions !== null && (
        <p>
          Numery recept:{' '}
          {prescriptions.map(prescription => (
            <Link to={`/presc/${prescription.id}`} key={prescription.id}>
              {prescription.prescriptionNumber}{' '}
            </Link>
          ))}
        </p>
      )}

      <p>Notatka: {med.note}</p>
      <Link to="../medicine">Powrót</Link>
    </>
  );
};
