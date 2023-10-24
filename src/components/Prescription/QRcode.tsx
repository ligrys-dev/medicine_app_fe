import { useEffect, useState } from 'react';
import { api } from 'src/utils/api';
import { config } from 'src/utils/config/config';
import styled from 'styled-components';
import { StyledBtn } from '../styled/StyledBtn';
import { Spinner } from '../common/Spinner';
import { useErrorHandler } from 'src/utils/hooks/useErrorHandler';
import { ErrorPage } from '../common/ErrorPage';
import { HTTPError } from 'ky';

interface Props {
  id: string;
  onCloseQr: () => void;
  prescNum: string;
}

export const QRcode = ({ id, onCloseQr, prescNum }: Props) => {
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [pesel, setPesel] = useState<string | null>(null);
  const { error, clearError, handleError } = useErrorHandler();

  useEffect(() => {
    try {
      (async () => {
        const res: { qr: string; pesel: string } = await api
          .get(`${config.apiUrl}/prescription/qr/${id}`)
          .json();

        setQrcode(res.qr);
        setPesel(res.pesel);
      })();
    } catch (e) {
      handleError(e as HTTPError);
    }
  }, [id, handleError]);

  if (error)
    return (
      <>
        <ErrorPage error={error}>
          <StyledBtn onClick={clearError}>Wyczyść</StyledBtn>
        </ErrorPage>
      </>
    );

  return (
    <QR>
      <h2>
        Numer recepty: <span>{prescNum}</span>
      </h2>
      <h3>
        PESEL: <span>{pesel ?? <Spinner color="white" />}</span>
      </h3>
      <div>
        {qrcode && (
          <img
            src={`${qrcode}`} // Utwórz URL danych dla obrazu base64
            alt="Kod QR"
          />
        )}
      </div>
      <StyledBtn onClick={onCloseQr}>Powrót</StyledBtn>
    </QR>
  );
};

const QR = styled.div`
  position: absolute;
  top: 20%;
  bottom: 10%;
  left: 10vw;
  right: 10vw;
  background: navy;
  color: white;
  border: 2px solid;
  text-align: center;
  border: 2px solid navy;
  border-radius: 0.3rem;

  img {
    border-radius: 0.3rem;
  }
`;
