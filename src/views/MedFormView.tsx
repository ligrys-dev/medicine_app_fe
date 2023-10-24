import { AddMed } from 'src/components/Med/AddMed';
import { StyledSectionHeader } from 'src/components/styled/StyledSectionHeader';

export const MedFormView = () => {
  return (
    <>
      <StyledSectionHeader>Dodaj lek</StyledSectionHeader>
      <AddMed />;
    </>
  );
};
