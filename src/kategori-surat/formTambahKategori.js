import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

const FormTambahKategori = () => {
  const [surat, setSurat] = useState([]);
  const [namaKategori, setNamaKategori] = useState("");
  const [judulKategori, setJudulKategori] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1234/api/kategori-surat"
        );
        const data = await response.json();
        setSurat(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const postData = async (namaKategori, judulKategori) => {
    await fetch("http://localhost:1234/api/kategori-surat", {
      method: "POST",
      body: JSON.stringify({
        id_kategori: surat.length + 1,
        nama_kategori: namaKategori,
        judul_kategori: judulKategori,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = (namaKategori, judulKategori) => {
    postData(namaKategori, judulKategori);
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
          <div className="w-25">ID (Auto Increment)</div>
          <div class="input-group">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              disabled
              value={surat.length + 1}
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="w-25">Nama Kategori</div>
          <div class="input-group">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={(data) => {
                setNamaKategori(data.target.value);
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="w-25">Judul Kategori</div>
          <div class="input-group">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={(data) => {
                setJudulKategori(data.target.value);
              }}
            />
          </div>
        </div>

        <div className=" d-flex flex-row">
          <a
            href="kategori-surat"
            className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-warning text-white me-3 px-3 py-2 mt-4"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span className="ms-1">Kembali</span>
          </a>
          <a
            href="kategori-surat"
            onClick={() => {
              handleSubmit(namaKategori, judulKategori);
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

export default FormTambahKategori;
