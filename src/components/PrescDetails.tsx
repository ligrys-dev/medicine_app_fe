import { useEffect, useState } from 'react';
import { PrescriptionEntity } from '../../../medicine_app_be/types';
import { Spinner } from './common/Spinner';
import { config } from '../utils/config/config';
// import ky from 'ky';
import { AssignMeds } from './AssignMeds';
import { api } from '../utils/api';

interface Props {
  id: string;
}

export const PrescDetails = ({ id }: Props) => {
  const [presc, setPresc] = useState<PrescriptionEntity | null>(null);
  const [meds, setMeds] = useState<string[] | null>(null);
  const [isAssigningMeds, setIsAsigningMeds] = useState(false);

  useEffect(() => {
    (async () => {
      const prescData = await api
        .get(`${config.apiUrl}/prescription/${id}`)
        .json();
      setPresc(prescData as PrescriptionEntity);

      const medsData = await api
        .get(`${config.apiUrl}/medicine/prescription/${id}`)
        .json();
      // console.log(medsData);
      setMeds(medsData as string[]);
    })();
  }, [id]);

  const handleSaveAssigning = async (assignedMedId: string) => {
    // console.log(assignedMedId);
    await api.patch(`${config.apiUrl}/prescription/${id}/${assignedMedId}`);

    const medsData = await api
      .get(`${config.apiUrl}/medicine/prescription/${id}`)
      .json();

    setMeds(medsData as string[]);
    setIsAsigningMeds(false);
  };

  if (!presc) return <Spinner />;

  return (
    <>
      <p>Szczegóły recepty:</p>
      <p>Numer recepty: {presc.prescriptionNumber}</p>
      <p>Data wystawienia: {new Date(presc.issueDate).toLocaleDateString()}</p>
      <p>
        Data ważności:{' '}
        {presc.expireDate
          ? new Date(presc.expireDate.toLocaleString()).toLocaleDateString()
          : null}
      </p>
      <p>
        Przypisane leki: {meds?.map(med => `${med}, `)}
        {isAssigningMeds ? (
          <AssignMeds
            onSave={handleSaveAssigning}
            onCancel={() => setIsAsigningMeds(false)}
          />
        ) : (
          <button onClick={() => setIsAsigningMeds(true)}>Przypisz leki</button>
        )}
      </p>
    </>
  );
};
