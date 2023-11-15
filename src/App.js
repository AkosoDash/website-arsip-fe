import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListSurat from "./surat/listSurat";
import FormTambahSurat from "./surat/formTambahSurat";
import FormEditSurat from "./surat/formEditSurat";
import FormLihatSurat from "./surat/formLihatSurat";
import ListKategori from "./kategori-surat/listKategori";
import FormTambahKategori from "./kategori-surat/formTambahKategori";
import FormEditKategori from "./kategori-surat/formEditKategori";
import Profile from "./about/profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListSurat />} />
        <Route path="form-tambah-surat" element={<FormTambahSurat />} />
        <Route path="form-lihat-surat/:id_surat" element={<FormLihatSurat />} />
        <Route path="form-edit-surat/:id_surat" element={<FormEditSurat />} />
        <Route path="form-tambah-surat" element={<FormTambahSurat />} />
        {/* <Route path="*" element={<NoPage />} /> */}
        <Route path="kategori-surat" element={<ListKategori />} />
        <Route path="form-tambah-kategori" element={<FormTambahKategori />} />
        <Route
          path="form-edit-kategori/:id_kategori"
          element={<FormEditKategori />}
        />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
