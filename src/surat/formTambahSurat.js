import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

const FormTambahSurat = () => {
  const [surat, setSurat] = useState([]);
  const [nomorSurat, setNomorSurat] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [judulSurat, setJudulSurat] = useState("");
  const [pdfFile, setPdfFile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1234/api/kategori-surat/"
        );
        const data = await response.json();
        setSurat(data.data);
        // console.log(surat);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const postData = async (nomorSurat, idKategori, judulSurat, pdfFile) => {
    const formData = new FormData();
    formData.append("nomor_surat", nomorSurat);
    formData.append("id_kategori", idKategori);
    formData.append("judul", judulSurat);
    formData.append("file_pdf", pdfFile);

    try {
      const response = await fetch("http://localhost:1234/api/surat", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle success
        const responseData = await response.json();
        console.log(responseData);
      } else {
        // Handle error
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (nomorSurat, idKategori, judulSurat, pdfFile) => {
    postData(nomorSurat, idKategori, judulSurat, pdfFile);
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
              {Array.isArray(surat) &&
                surat.map((data, index) => (
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
            href="/"
            onClick={() => {
              handleSubmit(nomorSurat, idKategori, judulSurat, pdfFile);
            }}
            className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-success text-white px-3 py-2 mt-4"
          >
            <i class="fa-solid fa-check"></i>
            <span className="ms-1">Simpan Data</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormTambahSurat;
