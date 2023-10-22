import { useEffect } from 'react';
import { AddPresc } from 'src/components/Prescription/AddPresc';
import { StyledSectionHeader } from 'src/components/styled/StyledSectionHeader';
import { useAuth } from 'src/utils/hooks/useAuth';

export const PrescFormView = () => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  });

  return (
    <>
      <StyledSectionHeader>Dodaj receptę</StyledSectionHeader>
      <AddPresc />;
    </>
  );
};
