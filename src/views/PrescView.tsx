import { useEffect } from 'react';
import { PrescList } from 'src/components/Prescription/PrescList';
import { StyledSectionHeader } from 'src/components/styled/StyledSectionHeader';
import { useAuth } from 'src/utils/hooks/useAuth';

export const PrescView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return (
    <>
      <StyledSectionHeader>Recepty</StyledSectionHeader>
      <PrescList />;
    </>
  );
};
