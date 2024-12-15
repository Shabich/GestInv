import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import NosProduits from "./page/NosProduits";
import NousConnaitre from "./page/NousConnaitre";
import EspacePresse from "./page/EspacePresse";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<NosProduits />} />
          <Route path="NousCo" element={<NousConnaitre/>} />
          <Route path="EspacePresse" element={<EspacePresse/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

