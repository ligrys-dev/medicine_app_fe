import { useEffect, useState } from 'react';
import { SimpleMedicineEntity } from 'types';
// import ky from 'ky';
import { config } from '../utils/config/config';
import { Med } from './Med';
import { Spinner } from './common/Spinner';
import { api } from '../utils/api';

export const MedsList = () => {
  const [meds, setMeds] = useState<SimpleMedicineEntity[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await api.get(`${config.apiUrl}/medicine/`).json();

      setMeds(data as SimpleMedicineEntity[]);
    })();
  }, []);

  if (meds === null) return <Spinner />;

  return (
    <>
      <ul>
        {meds.map(med => (
          <Med key={med.id} med={med} />
        ))}
      </ul>
    </>
  );
};
