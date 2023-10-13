import { Routes, Route } from 'react-router-dom';
import { FooterView } from './FooterView';
import { HeaderView } from './HeaderView';
import { MedFormView } from './MedFormView';
import { MedView } from './MedsView';
import { PrescFormView } from './PrescFormView';
import { PrescView } from './PrescView';
import { SingleMedView } from './SingleMedView';
import { SinglePrescView } from './SinglePrescView';

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
