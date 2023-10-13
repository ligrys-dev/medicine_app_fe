import { useEffect, useState } from 'react';
// import ky from 'ky';
import { PrescriptionEntity } from '../../../../medicine_app_be/types';
import { Spinner } from 'src/components/common/Spinner';
import { config } from 'src/utils/config/config';
import { AssignMeds } from 'src/components/AssignMeds';
import { api } from 'src/utils/api';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
}

export const PrescDetails = ({ id }: Props) => {
  const [presc, setPresc] = useState<PrescriptionEntity | null>(null);
  const [meds, setMeds] = useState<string[] | null>(null);
  const [isAssigningMeds, setIsAsigningMeds] = useState(false);
  const navigate = useNavigate();

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

  const handleDeletePrescClick = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć ten lek?')) {
      await api.delete(`${config.apiUrl}/prescription/${id}`);
      navigate('/medicine');
    }
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
      <button onClick={() => handleDeletePrescClick}>Usuń</button>
    </>
  );
};
