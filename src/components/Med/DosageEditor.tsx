import { ChangeEvent, useState } from 'react';
import { Dosage } from 'types';
import styled from 'styled-components';
import { CancelBtn } from '../common/CancelBtn';
import { ConfirmBtn } from '../common/ConfirmBtn';

interface Props {
  initialDosage: Dosage;
  onSave: (editedDosage: Dosage) => void;
  onCancel: () => void;
}

export const DosageEditor = ({ initialDosage, onSave, onCancel }: Props) => {
  const [editedDosage, setEditedDosage] = useState<Dosage>(initialDosage);

  const handleDosageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDosage(prevDosage => ({
      ...prevDosage,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editedDosage);
  };

  return (
    <Container>
      <StyledForm>
        <StyledDiv>Dawkowanie: </StyledDiv>
        <DoseInput
          type="number"
          name="dailyDoses"
          value={editedDosage.dailyDoses}
          onChange={handleDosageChange}
        />
        x
        <DoseInput
          type="number"
          name="doseQuantity"
          value={editedDosage.doseQuantity}
          onChange={handleDosageChange}
        />
        <UnitInput
          type="text"
          name="doseUnit"
          value={editedDosage.doseUnit}
          onChange={handleDosageChange}
        />
        <ConfirmBtn onClick={handleSaveClick}>Zapisz</ConfirmBtn>{' '}
        <CancelBtn onCancel={onCancel} />
      </StyledForm>
    </Container>
  );
};

const Container = styled.div`
  background: rgba(00, 00, 128, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: navy;
`;

const StyledForm = styled.div`
  background: white;
  border: 0.2rem solid navy;
  border-radius: 0.3rem;
  padding: 3rem 0;
  width: 40vw;
  position: relative;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
`;

const StyledDiv = styled.div`
  background: white;
  color: navy;
  width: 15vw;
  margin: 0 auto;
  border-radius: 1rem;
  text-transform: uppercase;
`;

const DoseInput = styled.input`
  background: navy;
  color: white;
  width: 14%;
  border: 2px solid navy;
  border-radius: 1rem;
  margin: 0.2rem;
  text-align: center;
`;

const UnitInput = styled.input`
  display: block;
  margin: 0 auto;
  background: navy;
  color: white;
  width: 30.5%;
  border: 2px solid navy;
  border-radius: 1rem;
  text-align: center;
`;
