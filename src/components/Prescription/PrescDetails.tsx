import { useEffect, useState } from 'react';
import { PrescriptionEntity } from 'types';
import { Spinner } from 'src/components/common/Spinner';
import { config } from 'src/utils/config/config';
import { AssignMeds } from 'src/components/Prescription/AssignMeds';
import { api } from 'src/utils/api';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'src/utils/hooks/useErrorHandler';
import { HTTPError } from 'ky';
import { ErrorPage } from '../common/ErrorPage';
import styled from 'styled-components';
import { DeleteBtn } from '../common/DeleteBtn';
import { StyledBtn } from '../styled/StyledBtn';
import { StyledLink } from '../styled/StyledLink';
import { StyledSectionHeader } from '../styled/StyledSectionHeader';

interface Props {
  id: string;
}

export const PrescDetails = ({ id }: Props) => {
  const [presc, setPresc] = useState<PrescriptionEntity | null>(null);
  const [meds, setMeds] = useState<string[] | null>(null);
  const [isAssigningMeds, setIsAsigningMeds] = useState(false);
  const { error, clearError, handleError } = useErrorHandler();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const prescData = await api
          .get(`${config.apiUrl}/prescription/${id}`)
          .json();
        setPresc(prescData as PrescriptionEntity);

        const medsData = await api
          .get(`${config.apiUrl}/medicine/prescription/${id}`)
          .json();
        setMeds(medsData as string[]);
      } catch (e) {
        handleError(e as HTTPError);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSaveAssigning = async (assignedMedId: string) => {
    await api.patch(`${config.apiUrl}/prescription/${id}/${assignedMedId}`);

    const medsData = await api
      .get(`${config.apiUrl}/medicine/prescription/${id}`)
      .json();

    setMeds(medsData as string[]);
    setIsAsigningMeds(false);
  };

  const handleDeletePrescClick = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć tą receptę?')) {
      try {
        await api.delete(`${config.apiUrl}/prescription/${id}`);
        navigate('/presc');
      } catch (e) {
        handleError(e as HTTPError);
      }
    }
  };

  if (!presc) return <Spinner />;

  if (error)
    return (
      <>
        <ErrorPage error={error}>
          <StyledBtn onClick={clearError}>Wyczyść</StyledBtn>
        </ErrorPage>
      </>
    );

  return (
    <PrescContainer>
      <StyledSectionHeader>Szczegóły recepty:</StyledSectionHeader>
      <div>Numer recepty: {presc.prescriptionNumber}</div>
      <div>
        Data wystawienia: {new Date(presc.issueDate).toLocaleDateString()}
      </div>
      <div>
        Data ważności:{' '}
        {presc.expireDate
          ? new Date(presc.expireDate.toLocaleString()).toLocaleDateString()
          : null}
      </div>
      <div>
        Przypisane leki: {meds?.map(med => `${med}, `)}
        {isAssigningMeds ? (
          <AssignMeds
            onSave={handleSaveAssigning}
            onCancel={() => setIsAsigningMeds(false)}
          />
        ) : (
          <StyledBtn onClick={() => setIsAsigningMeds(true)}>
            Przypisz leki
          </StyledBtn>
        )}
      </div>
      <StyledLink to="../presc">Powrót</StyledLink>

      <DeleteBtn onClick={() => handleDeletePrescClick()}>
        Usuń receptę
      </DeleteBtn>
    </PrescContainer>
  );
};

const PrescContainer = styled.div`
  /* border: 1px solid; */
  width: 80vw;
  margin: 0 auto;
  line-height: 2rem;
  text-align: center;

  button {
    margin: 0 auto;
  }
`;
