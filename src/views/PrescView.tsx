import { PrescList } from 'src/components/Prescription/PrescList';
import { StyledSectionHeader } from 'src/components/styled/StyledSectionHeader';

export const PrescView = () => {
  return (
    <>
      <StyledSectionHeader>Recepty</StyledSectionHeader>
      <PrescList />;
    </>
  );
};
