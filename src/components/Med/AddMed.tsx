import { useForm, SubmitHandler } from 'react-hook-form';
import { MedicineEntity } from 'types';
// import ky from 'ky';
import { config } from 'src/utils/config/config';
import { useState } from 'react';
import { FormError } from 'src/components/common/FormError';
import { api } from 'src/utils/api';
import { StyledBtn } from '../styled/StyledBtn';
import { StyledSubmit } from '../styled/StyledSubmit';
import { StyledInput } from '../styled/form/StyledInput';
import { Container } from '../styled/form/Container';
import { StyledSpan } from '../styled/form/StyledSpan';
import { StyledLabel } from '../styled/form/StyledLabel';

export function AddMed() {
  const [insertedId, setInsertedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicineEntity>();

  const onSubmit: SubmitHandler<MedicineEntity> = async (
    data: MedicineEntity,
  ): Promise<string> => {
    setInsertedId(
      await api.post(`${config.apiUrl}/medicine`, { json: data }).json(),
    );
    return insertedId as string;
  };

  const handleClear = () => {
    setInsertedId(null);
    reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <StyledLabel>
            <StyledSpan>Nazwa:</StyledSpan>
            <StyledInput {...register('name', { required: true })} />
            <FormError error={errors.name} message="To pole jest wymagane" />
          </StyledLabel>
        </p>

        <p>
          <StyledLabel>
            <StyledSpan>Forma</StyledSpan>
            <StyledInput {...register('form', { required: true })} />
            <FormError error={errors.form} message="To pole jest wymagane" />
          </StyledLabel>
        </p>

        <p>
          <StyledLabel>
            <StyledSpan>Jednostka dawkowania:</StyledSpan>
            <StyledInput {...register('dosage.doseUnit', { required: true })} />
            <FormError
              error={errors.dosage?.doseUnit}
              message="To pole jest wymagane"
            />
          </StyledLabel>
        </p>

        <p>
          <StyledLabel>
            <StyledSpan>Ilość dawek dziennych:</StyledSpan>
            <StyledInput
              {...register('dosage.dailyDoses', { required: true })}
            />
            <FormError
              error={errors.dosage?.dailyDoses}
              message="To pole jest wymagane"
            />
          </StyledLabel>
        </p>

        <p>
          <StyledLabel>
            <StyledSpan>Dawka dzienna:</StyledSpan>
            <StyledInput
              {...register('dosage.doseQuantity', { required: true })}
            />
            <FormError
              error={errors.dosage?.doseQuantity}
              message="To pole jest wymagane"
            />
          </StyledLabel>
        </p>

        <p>
          <StyledLabel>
            <StyledSpan>Data rozpoczęcia:</StyledSpan>
            <StyledInput type="date" {...register('startDate')} />
          </StyledLabel>
        </p>
        <p>
          <StyledLabel>
            <StyledSpan>Data zakończenia:</StyledSpan>
            <StyledInput type="date" {...register('endDate')} />
          </StyledLabel>
        </p>

        <p>
          <StyledLabel>
            <StyledSpan>Notatka:</StyledSpan>
            <StyledInput {...register('note')} />
          </StyledLabel>
        </p>

        <p>
          <StyledSubmit type="submit" />
        </p>
      </form>

      {insertedId && (
        <span>
          Dodano lek z ID: {insertedId}{' '}
          <StyledBtn onClick={handleClear}>Wyczyść</StyledBtn>
        </span>
      )}
    </Container>
  );
}
