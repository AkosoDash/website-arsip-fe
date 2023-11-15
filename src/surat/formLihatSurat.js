import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/sidebar";

const FormLihatSurat = () => {
  const [data, setData] = useState({});
  const { id_surat } = useParams();
  //   const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:1234/api/surat/${id_surat}`
        );
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id_surat]);
  const downloadLink = `https://drive.google.com/uc?export=download&id=${data.id_pdf}`;

  return (
    <div className="d-flex flex-row ">
      <Sidebar />
      <div className="container p-5">
        <h1>Surat &gt;&gt; Lihat</h1>
        <p>
          Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat
          <br />
          Klik "Tambah" pada kolom aksi untuk menambahkan kategori baru
        </p>
        <div className="d-flex flex-row align-items-start justify-content-start">
          <div className="w-25">Nomor Surat</div>
          <div className="w-25">{data.nomor_surat}</div>
        </div>
        <div className="d-flex flex-row align-items-start justify-content-start">
          <div className="w-25">Kategori Surat</div>
          <div className="w-25">{data.nama_kategori}</div>
        </div>
        <div className="d-flex flex-row align-items-start justify-content-start">
          <div className="w-25">Judul Surat</div>
          <div className="w-25">{data.judul}</div>
        </div>
        <div className="d-flex flex-row align-items-start justify-content-start">
          <div className="w-25">Waktu Unggah Surat</div>
          <div className="w-25">{data.waktu_pengarsipan}</div>
        </div>
        <iframe
          className="my-5"
          title="PDF File"
          src={data.pdf_file}
          width="100%"
          height="600px"
        ></iframe>

        <div className=" d-flex flex-row">
          <a
            href="/"
            className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-warning text-white me-3 px-3 py-2 mt-4"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="ms-1">Kembali</span>
          </a>
          <a
            href={downloadLink}
            className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-success text-white me-3 px-3 py-2 mt-4"
          >
            <i className="fa-solid fa-download"></i>
            <span className="ms-1">Unduh</span>
          </a>
          <a
            href={`/form-edit-surat/${data.id_surat}`}
            className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-primary text-white me-3 px-3 py-2 mt-4"
          >
            <i className="fa-solid fa-file"></i>
            <span className="ms-1">Edit / Ganti File</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormLihatSurat;
