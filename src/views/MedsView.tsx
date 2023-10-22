import { useEffect } from 'react';
import { MedsList } from 'src/components/Med/MedsList';
import { StyledSectionHeader } from 'src/components/styled/StyledSectionHeader';
import { useAuth } from 'src/utils/hooks/useAuth';

export const MedView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return (
    <>
      <StyledSectionHeader>Leki</StyledSectionHeader> <MedsList />;
    </>
  );
};
