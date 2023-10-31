import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { HTTPError } from 'ky';
import { PrescriptionEntity } from 'types';
import { config } from 'src/utils/config/config';
import { api } from 'src/utils/api';
import { useErrorHandler } from 'src/utils/hooks/useErrorHandler';
import { ErrorPage } from '../common/ErrorPage';
import { FormError } from 'src/components/common/FormError';
import { StyledBtn } from '../styled/StyledBtn';
import { StyledSubmit } from '../styled/StyledSubmit';
import { StyledInput } from '../styled/form/StyledInput';
import { Container } from '../styled/form/Container';
import { StyledLabel } from '../styled/form/StyledLabel';
import { StyledSpan } from '../styled/form/StyledSpan';
import { Slider, Switch } from '../styled/form/Toggle';

export function AddPresc() {
  const [insertedId, setInsertedId] = useState<string | null>(null);
  const { error, clearError, handleError } = useErrorHandler();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrescriptionEntity>();

  const onSubmit: SubmitHandler<PrescriptionEntity> = async (
    data: PrescriptionEntity,
  ): Promise<string | undefined> => {
    try {
      setInsertedId(
        await api
          .post(`${config.apiUrl}/prescription`, {
            json: data,
          })
          .json(),
      );

      return insertedId as string;
    } catch (e) {
      handleError(e as HTTPError);
    }
  };

  const handleClear = () => {
    setInsertedId(null);
    clearError();
    reset();
  };

  if (error)
    return (
      <>
        <ErrorPage error={error}>
          <StyledBtn onClick={handleClear}>Wyczyść</StyledBtn>
        </ErrorPage>
      </>
    );

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <StyledLabel>
            <StyledSpan>Numer recepty:</StyledSpan>
            <StyledInput
              type="number"
              {...register('prescriptionNumber', {
                required: true,
                maxLength: 4,
                minLength: 4,
              })}
            />
            <FormError
              error={errors.prescriptionNumber}
              message={
                errors.prescriptionNumber?.type === 'required'
                  ? 'To pole jest wymagane'
                  : 'Długość recepty musi wynosić dokładnie 4 cyfry'
              }
            />
          </StyledLabel>
        </p>

        <p>
          <StyledLabel>
            <StyledSpan>Data wystawienia:</StyledSpan>
            <StyledInput
              type="Date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              {...register('issueDate', { required: true, valueAsDate: true })}
            />
            <FormError
              error={errors.issueDate}
              message={
                errors.issueDate?.type === 'required'
                  ? 'To pole jest wymagane'
                  : 'Data wystawienia musi być datą'
              }
            />
          </StyledLabel>
        </p>

        <p>
          <label>
            <StyledSpan>Recepta na antybiotyk:</StyledSpan>
            <Switch>
              <input type="checkbox" {...register('isAntibiotic')} />
              <Slider />
            </Switch>
          </label>
        </p>

        <p>
          <label>
            <StyledSpan>Recepta roczna:</StyledSpan>
            <Switch>
              <input type="checkbox" {...register('isYearly')} />
              <Slider />
            </Switch>
          </label>
        </p>

        <p>
          <StyledSubmit type="submit" />
        </p>
      </form>

      {insertedId && (
        <span>
          Dodano receptę z ID: {insertedId}{' '}
          <StyledBtn onClick={handleClear}>Wyczyść</StyledBtn>
        </span>
      )}
    </Container>
  );
}
