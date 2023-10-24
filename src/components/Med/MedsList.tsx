import { useEffect, useState } from 'react';
import { SimpleMedicineEntity } from 'types';
// import ky from 'ky';
import { config } from 'src/utils/config/config';
import { Med } from 'src/components/Med/Med';
import { Spinner } from 'src/components/common/Spinner';
import { api } from 'src/utils/api';
import { StyledList } from '../styled/StyledList';
import { useErrorHandler } from 'src/utils/hooks/useErrorHandler';
import { ErrorPage } from '../common/ErrorPage';
import { StyledBtn } from '../styled/StyledBtn';
import { HTTPError } from 'ky';

export const MedsList = () => {
  const [meds, setMeds] = useState<SimpleMedicineEntity[] | null>(null);
  const { error, clearError, handleError } = useErrorHandler();

  useEffect(() => {
    try {
      (async () => {
        const data = await api.get(`${config.apiUrl}/medicine/`).json();

        setMeds(data as SimpleMedicineEntity[]);
      })();
    } catch (e) {
      handleError(e as HTTPError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteMed = async (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten lek?')) {
      try {
        await api.delete(`${config.apiUrl}/medicine/${id}`);

        const data = await api.get(`${config.apiUrl}/medicine/`).json();
        setMeds(data as SimpleMedicineEntity[]);
      } catch (e) {
        handleError(e as HTTPError);
      }
    }
  };

  if (meds === null) return <Spinner />;

  if (error)
    return (
      <>
        <ErrorPage error={error}>
          <StyledBtn onClick={clearError}>Wyczyść</StyledBtn>
        </ErrorPage>
      </>
    );

  return (
    <>
      <StyledList>
        {meds.map(med => (
          <Med key={med.id} med={med} onDeleteMed={handleDeleteMed} />
        ))}
      </StyledList>
    </>
  );
};
