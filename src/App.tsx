import { Routes, Route } from 'react-router-dom';
import { FooterView } from './views/FooterView';
import { HeaderView } from './views/HeaderView';
import { MedView } from './views/MedsView';
import { SingleMedView } from './views/SingleMedView';
import { MedFormView } from './views/MedFormView';

import './App.css';

export function App() {
  return (
    <>
      <HeaderView />
      <Routes>
        <Route path="/medicine" element={<MedView />} />
        <Route path="/medicine/:id" element={<SingleMedView />} />
        <Route path="/medicine/add" element={<MedFormView />} />
      </Routes>
      <FooterView />
    </>
  );
}
