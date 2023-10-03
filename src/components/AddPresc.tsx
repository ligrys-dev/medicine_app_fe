import { useForm, SubmitHandler } from 'react-hook-form';
import ky from 'ky';
import { config } from '../utils/config/config';
import { useState } from 'react';
import { FormError } from './common/FormError';
import { PrescriptionEntity } from 'types';

export function AddPresc() {
  const [insertedId, setInsertedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrescriptionEntity>();

  const onSubmit: SubmitHandler<PrescriptionEntity> = async (
    data: PrescriptionEntity,
  ): Promise<string> => {
    console.log(data);
    setInsertedId(
      await ky.post(`${config.apiUrl}/prescription`, { json: data }).json(),
    );
    return insertedId as string;
  };

  const handleClear = () => {
    setInsertedId(null);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>
            Numer recepty:
            <input
              type="number"
              {...register('prescriptionNumber', { required: true })}
            />
            <FormError
              error={errors.prescriptionNumber}
              message="To pole jest wymagane"
            />
          </label>
        </p>

        <p>
          <label>
            Data wystawienia:
            <input type="Date" {...register('issueDate', { required: true })} />
            <FormError
              error={errors.issueDate}
              message="To pole jest wymagane"
            />
          </label>
        </p>

        <p>
          <label>
            Recepta na antybiotyk:
            <input type="checkbox" {...register('isAntibiotic')} />
          </label>
        </p>

        <p>
          <label>
            Receta roczna:
            <input type="checkbox" {...register('isYearly')} />
          </label>
        </p>

        <p>
          <input type="submit" />
        </p>
      </form>

      {insertedId && (
        <span>
          Dodano receptę z ID: {insertedId}{' '}
          <button onClick={handleClear}>Wyczyść</button>
        </span>
      )}
    </>
  );
}
