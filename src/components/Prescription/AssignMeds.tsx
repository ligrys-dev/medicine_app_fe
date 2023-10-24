import { SyntheticEvent, useEffect, useState } from 'react';
// import ky from 'ky';
import { SimpleMedicineEntity } from 'types';
import { CancelBtn } from 'src/components/common/CancelBtn';
import { config } from 'src/utils/config/config';
import { api } from 'src/utils/api';
import styled from 'styled-components';
import { useErrorHandler } from 'src/utils/hooks/useErrorHandler';
import { HTTPError } from 'ky';
import { ErrorPage } from '../common/ErrorPage';
import { StyledBtn } from '../styled/StyledBtn';

interface Props {
  onCancel: () => void;
  onSave: (assignedMedId: string) => void;
}

export const AssignMeds = ({ onCancel, onSave }: Props) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [meds, setMeds] = useState<SimpleMedicineEntity[] | null>(null);
  const { error, clearError, handleError } = useErrorHandler();

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get(`${config.apiUrl}/medicine/`).json();

        setMeds(data as SimpleMedicineEntity[]);
      } catch (e) {
        handleError(e as HTTPError);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    onSave(selectedOption);
  };

  if (error)
    return (
      <>
        if (error) return (
        <>
          <ErrorPage error={error}>
            <StyledBtn onClick={clearError}>Wyczyść</StyledBtn>
          </ErrorPage>
        </>
        );
      </>
    );

  return (
    <Container>
      <div>Przypisz leki</div>
      <form onSubmit={handleSubmit}>
        <label>
          Wybierz opcję:
          <select
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
          >
            <option value="">--wybierz--</option>
            {meds?.map(med => (
              <option key={med.id} value={med.id}>
                {med.name}
              </option>
            ))}
          </select>
        </label>

        <Submit type="submit">Wyślij</Submit>
      </form>
      <CancelBtn onCancel={onCancel} />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 40vw;
  border: 3px solid navy;
  border-radius: 0.3rem;
  color: white;
  background: navy;

  form {
    label {
      select {
        margin: 0 1rem;
        border-radius: 1rem;
        color: navy;
        padding: 0.15rem;
      }
    }
  }
`;

const Submit = styled.button`
  /* display: block; */
  margin: 0 0.8rem;
  margin-left: 1rem;
  padding: 0.2rem 0.5rem;
  text-transform: uppercase;
  background: navy;
  color: white;
  border: 1px solid white;
  border-radius: 2rem;
  transition: 0.2s;

  &:hover {
    color: navy;
    background: white;
  }
`;
