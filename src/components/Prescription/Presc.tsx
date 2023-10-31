import { PrescriptionEntity } from 'types';
import { useState } from 'react';
import { QRcode } from './QRcode';
import { DeleteBtn } from '../common/DeleteBtn';
import { StyledLink } from '../styled/StyledLink';
import { StyledBtn } from '../styled/StyledBtn';

interface Props {
  presc: PrescriptionEntity;
  onPrescDelete: (id: string) => void;
}

export const Presc = ({ presc, onPrescDelete }: Props) => {
  const [showQr, setShowQr] = useState(false);

  return (
    <>
      <li>
        <div>{presc.prescriptionNumber}</div>{' '}
        <StyledBtn onClick={() => setShowQr(true)}>QR</StyledBtn>
        <StyledLink to={presc.id ?? ''} state={presc}>
          Szczegóły
        </StyledLink>
        <DeleteBtn onClick={() => onPrescDelete(presc.id ?? '')}>
          Usuń
        </DeleteBtn>
      </li>
      {showQr ? (
        <QRcode
          onCloseQr={() => setShowQr(false)}
          id={presc.id ?? ''}
          prescNum={presc.prescriptionNumber}
        />
      ) : null}
    </>
  );
};
