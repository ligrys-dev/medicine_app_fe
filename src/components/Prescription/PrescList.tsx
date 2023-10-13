import { useEffect, useState } from 'react';
import { PrescriptionEntity } from '../../../../medicine_app_be/types';
// import ky from 'ky';
import { config } from 'src/utils/config/config';
import { Spinner } from 'src/components/common/Spinner';
import { Presc } from 'src/components/Prescription/Presc';
import { api } from 'src/utils/api';

export const PrescList = () => {
  const [prescs, setPrescss] = useState<PrescriptionEntity[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await api.get(`${config.apiUrl}/prescription`).json();
      setPrescss(data as PrescriptionEntity[]);
    })();
  }, []);

  const handleDeletePresc = async (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tą receptę?')) {
      await api.delete(`${config.apiUrl}/prescription/${id}`);

      const data = await api.get(`${config.apiUrl}/prescription/`).json();
      setPrescss(data as PrescriptionEntity[]);
    }
  };

  if (prescs === null) return <Spinner />;

  return (
    <ul>
      {prescs.map(presc => (
        <Presc
          key={presc.id}
          presc={presc}
          onPrescDelete={handleDeletePresc}
        ></Presc>
      ))}
    </ul>
  );
};
