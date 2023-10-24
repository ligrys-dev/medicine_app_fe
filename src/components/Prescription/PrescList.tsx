import { useEffect, useState } from 'react';
import { PrescriptionEntity } from '../../../../medicine_app_be/types';
// import ky from 'ky';
import { config } from 'src/utils/config/config';
import { Spinner } from 'src/components/common/Spinner';
import { Presc } from 'src/components/Prescription/Presc';
import { api } from 'src/utils/api';
import { StyledList } from '../styled/StyledList';
import { useErrorHandler } from 'src/utils/hooks/useErrorHandler';
import { ErrorPage } from '../common/ErrorPage';
import { StyledBtn } from '../styled/StyledBtn';
import { HTTPError } from 'ky';

export const PrescList = () => {
  const [prescs, setPrescss] = useState<PrescriptionEntity[] | null>(null);
  const { error, clearError, handleError } = useErrorHandler();

  useEffect(() => {
    (async () => {
      const data = await api.get(`${config.apiUrl}/prescription`).json();
      setPrescss(data as PrescriptionEntity[]);
    })();
  }, []);

  const handleDeletePresc = async (id: string) => {
    try {
      if (window.confirm('Czy na pewno chcesz usunąć tą receptę?')) {
        await api.delete(`${config.apiUrl}/prescription/${id}`);

        const data = await api.get(`${config.apiUrl}/prescription/`).json();
        setPrescss(data as PrescriptionEntity[]);
      }
    } catch (e) {
      handleError(e as HTTPError);
    }
  };

  if (prescs === null) return <Spinner />;

  if (error)
    return (
      <>
        <ErrorPage error={error}>
          <StyledBtn onClick={clearError}>Wyczyść</StyledBtn>
        </ErrorPage>
      </>
    );

  return (
    <StyledList>
      {prescs.map(presc => (
        <Presc
          key={presc.id}
          presc={presc}
          onPrescDelete={handleDeletePresc}
        ></Presc>
      ))}
    </StyledList>
  );
};
