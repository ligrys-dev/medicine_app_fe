import { useEffect, useState } from 'react';
import { SimpleMedicineEntity } from 'types';
// import ky from 'ky';
import { config } from 'src/utils/config/config';
import { Med } from 'src/components/Med/Med';
import { Spinner } from 'src/components/common/Spinner';
import { api } from 'src/utils/api';

export const MedsList = () => {
  const [meds, setMeds] = useState<SimpleMedicineEntity[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await api.get(`${config.apiUrl}/medicine/`).json();

      setMeds(data as SimpleMedicineEntity[]);
    })();
  }, []);

  const handleDeleteMed = async (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten lek?')) {
      await api.delete(`${config.apiUrl}/medicine/${id}`);

      const data = await api.get(`${config.apiUrl}/medicine/`).json();
      setMeds(data as SimpleMedicineEntity[]);
    }
  };

  if (meds === null) return <Spinner />;

  return (
    <>
      <ul>
        {meds.map(med => (
          <Med key={med.id} med={med} onDeleteMed={handleDeleteMed} />
        ))}
      </ul>
    </>
  );
};
