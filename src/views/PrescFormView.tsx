import { AddPresc } from 'src/components/Prescription/AddPresc';
import { StyledSectionHeader } from 'src/components/styled/StyledSectionHeader';

export const PrescFormView = () => {
  return (
    <>
      <StyledSectionHeader>Dodaj receptę</StyledSectionHeader>
      <AddPresc />;
    </>
  );
};
