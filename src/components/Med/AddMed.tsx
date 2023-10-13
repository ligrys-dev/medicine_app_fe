import { useForm, SubmitHandler } from 'react-hook-form';
import { MedicineEntity } from 'types';
// import ky from 'ky';
import { config } from 'src/utils/config/config';
import { useState } from 'react';
import { FormError } from 'src/components/common/FormError';
import { api } from 'src/utils/api';

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
    // Zresetuj stan insertedId do null
    setInsertedId(null);
    // Wyczyść formularz za pomocą reset z react-hook-form
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>
            Nazwa:
            <input {...register('name', { required: true })} />
            <FormError error={errors.name} message="To pole jest wymagane" />
          </label>
        </p>

        <p>
          <label>
            Forma
            <input {...register('form', { required: true })} />
            <FormError error={errors.form} message="To pole jest wymagane" />
          </label>
        </p>

        <p>
          <label>
            Jednostka dawkowania:
            <input {...register('dosage.doseUnit', { required: true })} />
            <FormError
              error={errors.dosage?.doseUnit}
              message="To pole jest wymagane"
            />
          </label>
        </p>

        <p>
          <label>
            Ilość dawek dziennych:
            <input {...register('dosage.dailyDoses', { required: true })} />
            <FormError
              error={errors.dosage?.dailyDoses}
              message="To pole jest wymagane"
            />
          </label>
        </p>

        <p>
          <label>
            Dawka dzienna:
            <input {...register('dosage.doseQuantity', { required: true })} />
            <FormError
              error={errors.dosage?.doseQuantity}
              message="To pole jest wymagane"
            />
          </label>
        </p>

        <p>
          <label>
            Data rozpoczęcia:
            <input type="date" {...register('startDate')} />
          </label>
        </p>
        <p>
          <label>
            Data zakończenia:
            <input type="date" {...register('endDate')} />
          </label>
        </p>

        <p>
          <label>
            Notatka:
            <input {...register('note')} />
          </label>
        </p>

        <p>
          <input type="submit" />
        </p>
      </form>

      {insertedId && (
        <span>
          Dodano lek z ID: {insertedId}{' '}
          <button onClick={handleClear}>Wyczyść</button>
        </span>
      )}
    </>
  );
}
