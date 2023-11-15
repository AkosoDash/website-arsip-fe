import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

const FormEditSurat = () => {
  const [surat, setSurat] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [nomorSurat, setNomorSurat] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [judulSurat, setJudulSurat] = useState("");
  const [pdfFile, setPdfFile] = useState({});
  const { id_surat } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:1234/api/surat/${id_surat}`
        );
        const data = await response.json();
        setSurat(data.data);
        setNomorSurat(data.data.nomor_surat);
        setIdKategori(data.data.id_kategori);
        setJudulSurat(data.data.judul);

        console.log(surat);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchDataKategori = async () => {
      try {
        const response = await fetch(
          `http://localhost:1234/api/kategori-surat`
        );
        const data = await response.json();
        setKategori(data.data);
        // console.log(surat);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    fetchDataKategori();
  }, [id_surat, surat]);

  const updateData = async (nomorSurat, idKategori, judulSurat, pdfFile) => {
    const formData = new FormData();
    formData.append("nomor_surat", nomorSurat);
    formData.append("id_kategori", idKategori);
    formData.append("judul", judulSurat);
    formData.append("file_pdf", pdfFile);

    try {
      const response = await fetch(
        `http://localhost:1234/api/surat/${id_surat}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        // Handle success
        const responseData = await response.json();
        console.log(responseData);
        navigation(`/form-lihat-surat/${id_surat}`);
      } else {
        // Handle error
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (nomorSurat, idKategori, judulSurat, pdfFile) => {
    updateData(nomorSurat, idKategori, judulSurat, pdfFile);
  };

  return (
    <div className="d-flex flex-row ">
      <Sidebar />
      <div className="container p-5">
        <h1>Kategori Surat &gt;&gt; Tambah</h1>
        <p>
          Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat{" "}
          <br />
          Klik "Tambah" pada kolom aksi untuk menambahkan kategori baru
        </p>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <div className="w-25">Nomor Surat</div>
          <div class="input-group">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={nomorSurat}
              onChange={(data) => {
                setNomorSurat(data.target.value);
              }}
            />
          </div>
        </div>

        <div className="d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="w-25">Kategori</div>
          <div class="input-group">
            <select
              class="form-select"
              id="inputGroupSelect02"
              onChange={(e) => setIdKategori(e.target.value)}
              value={idKategori}
            >
              {Array.isArray(kategori) &&
                kategori.map((data, index) => (
                  <option value={data.id_kategori}>{data.nama_kategori}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="w-25">Judul</div>
          <div class="input-group">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={judulSurat}
              onChange={(data) => {
                setJudulSurat(data.target.value);
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="w-25">Judul Kategori</div>
          <div class="input-group">
            <div class="input-group mb-3">
              <input
                type="file"
                class="form-control"
                id="upload_pdf"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setPdfFile(e.target.files[0]);
                  }
                }}
              />
              <label class="input-group-text" for="upload_pdf">
                Upload
              </label>
            </div>
          </div>
        </div>

        <div className=" d-flex flex-row">
          <a
            href="/"
            className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-warning text-white me-3 px-3 py-2 mt-4"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span className="ms-1">Kembali</span>
          </a>
          <a
            href={`/form-lihat-surat/${id_surat}`}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(nomorSurat, idKategori, judulSurat, pdfFile);
            }}
            className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-success text-white px-3 py-2 mt-4"
          >
            <i className="fa-solid fa-check"></i>
            <span className="ms-1">Simpan Data</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormEditSurat;
