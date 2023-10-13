import { useEffect, useState } from 'react';
import { PrescriptionEntity } from '../../../medicine_app_be/types';
// import ky from 'ky';
import { config } from '../utils/config/config';
import { Spinner } from './common/Spinner';
import { Presc } from './Presc';
import { api } from '../utils/api';

export const PrescList = () => {
  const [prescs, setPrescss] = useState<PrescriptionEntity[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await api.get(`${config.apiUrl}/prescription`).json();
      setPrescss(data as PrescriptionEntity[]);
    })();
  }, []);

  if (prescs === null) return <Spinner />;

  return (
    <ul>
      {prescs.map(presc => (
        <Presc key={presc.id} presc={presc}></Presc>
      ))}
    </ul>
  );
};
