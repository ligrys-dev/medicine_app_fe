import { Routes, Route } from 'react-router-dom';
import { FooterView } from './views/FooterView';
import { HeaderView } from './views/HeaderView';
import { MedView } from './views/MedsView';
import { SingleMedView } from './views/SingleMedView';
import { MedFormView } from './views/MedFormView';
import { PrescView } from './views/PrescView';
import { SinglePrescView } from './views/SinglePrescView';
import { PrescFormView } from './views/PrescFormView';

import './App.css';

export function App() {
  return (
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
}
