import { Routes, Route } from 'react-router-dom';
import { FooterView } from 'src/views/FooterView';
import { HeaderView } from 'src/views/HeaderView';
import { MedFormView } from 'src/views/MedFormView';
import { MedView } from 'src/views/MedsView';
import { PrescFormView } from 'src/views/PrescFormView';
import { PrescView } from 'src/views/PrescView';
import { SingleMedView } from 'src/views/SingleMedView';
import { SinglePrescView } from 'src/views/SinglePrescView';

export const AppView = () => (
  <>
    <HeaderView />
    <Routes>
      <Route path="/medicine" element={<MedView />} />
      <Route path="/medicine/:id" element={<SingleMedView />} />
      <Route path="/medicine/add" element={<MedFormView />} />
      <Route path="/presc" element={<PrescView />} />
      <Route path="/presc/:id" element={<SinglePrescView />} />
      <Route path="/presc/add" element={<PrescFormView />} />
    </Routes>
    <FooterView />
  </>
);
