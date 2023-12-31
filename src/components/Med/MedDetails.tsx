import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dosage, MedicineEntity, PrescriptionMedicine } from 'types';
import { config } from 'src/utils/config/config';
import { Spinner } from 'src/components/common/Spinner';
import { DosageEditor } from 'src/components/Med/DosageEditor';
import { api } from 'src/utils/api';
import { useErrorHandler } from 'src/utils/hooks/useErrorHandler';
import styled from 'styled-components';
import { HTTPError } from 'ky';
import { DeleteBtn } from '../common/DeleteBtn';
import { ErrorPage } from '../common/ErrorPage';
import { StyledBtn } from '../styled/StyledBtn';
import { StyledLink } from '../styled/StyledLink';
import { StyledSectionHeader } from '../styled/StyledSectionHeader';

interface Props {
  id: string;
}

export const MedDetails = ({ id }: Props) => {
  const [med, setMed] = useState<MedicineEntity | null>(null);
  const [isEditingDosage, setIsEditingDosage] = useState(false);
  const [prescriptions, setPrescriptions] = useState<
    PrescriptionMedicine[] | null
  >(null);
  const navigate = useNavigate();
  const { error, clearError, handleError } = useErrorHandler();

  useEffect(() => {
    try {
      (async () => {
        const medicineData = await api
          .get(`${config.apiUrl}/medicine/${id}`)
          .json();
        setMed(medicineData as MedicineEntity);

        const prescriptionData = await api
          .get(`${config.apiUrl}/prescription/medicine/${id}`)
          .json();

        setPrescriptions(prescriptionData as PrescriptionMedicine[]);
      })();
    } catch (e) {
      handleError(e as HTTPError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleEditDosageClick = () => {
    setIsEditingDosage(true);
  };

  const handleSaveDosageClick = async (editedDosage: Dosage) => {
    try {
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
    } catch (e) {
      handleError(e as HTTPError);
    }
  };

  const handleDeleteMedClick = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć ten lek?')) {
      try {
        await api.delete(`${config.apiUrl}/medicine/${id}`);
        navigate('/medicine');
      } catch (e) {
        handleError(e as HTTPError);
      }
    }
  };

  if (med === null) return <Spinner />;

  if (error)
    return (
      <>
        <ErrorPage error={error}>
          <StyledBtn onClick={clearError}>Wyczyść</StyledBtn>
        </ErrorPage>
      </>
    );

  return (
    <MedContainer>
      <StyledSectionHeader>Szczegóły leku:</StyledSectionHeader>
      <div>
        {med.name} - {med.form}
      </div>
      <div>
        Dawkowanie: {med.dosage.dailyDoses} x {med.dosage.doseQuantity}{' '}
        {med.dosage.doseUnit}{' '}
        {isEditingDosage ? (
          <DosageEditor
            initialDosage={med.dosage}
            onSave={handleSaveDosageClick}
            onCancel={() => setIsEditingDosage(false)}
          />
        ) : (
          <StyledBtn onClick={handleEditDosageClick}>Edytuj</StyledBtn>
        )}
      </div>

      {med.startDate !== null && (
        <div>
          Data rozpoczęcia:{' '}
          {med.startDate ? new Date(med.startDate).toLocaleDateString() : ''}
        </div>
      )}

      {med.endDate !== null && (
        <div>
          Data zakoczenia:{' '}
          {med.endDate ? new Date(med.endDate).toLocaleDateString() : ''}
        </div>
      )}

      {prescriptions !== null && (
        <div>
          Numery recept:{' '}
          {prescriptions.map(prescription => (
            <Link to={`/presc/${prescription.id}`} key={prescription.id}>
              {prescription.prescriptionNumber}{' '}
            </Link>
          ))}
        </div>
      )}

      <div>Notatka: {med.note}</div>
      <StyledLink to="../medicine">Powrót</StyledLink>
      <DeleteBtn onClick={() => handleDeleteMedClick()}>Usuń</DeleteBtn>
    </MedContainer>
  );
};

const MedContainer = styled.div`
  /* border: 1px solid; */
  width: 80vw;
  margin: 0 auto;
  line-height: 2rem;
  text-align: center;

  button {
    margin: 0 auto;
  }
`;
