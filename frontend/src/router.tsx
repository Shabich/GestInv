import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import Home from "./page/Home";
import NosProduits from "./page/NosProduits";
import NousConnaitre from "./page/NousConnaitre";
import EspacePresse from "./page/EspacePresse";
import AdminPanel from "./page/AdminPanel";
import Login from "./page/Login";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="NosProduits" element={<NosProduits />} />
          <Route path="NousConnaitre" element={<NousConnaitre/>} />
          <Route path="EspacePresse" element={<EspacePresse/>} />
          <Route path="AdminPanel" element={<AdminPanel/>} />
          </Route>
        </Routes>

    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

