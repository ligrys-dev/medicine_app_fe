import { MedsList } from 'src/components/Med/MedsList';
import { StyledSectionHeader } from 'src/components/styled/StyledSectionHeader';

export const MedView = () => {
  return (
    <>
      <StyledSectionHeader>Leki</StyledSectionHeader> <MedsList />;
    </>
  );
};
