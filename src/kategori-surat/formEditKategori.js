import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

const FormEditKategori = () => {
  const [kategori, setKategori] = useState({
    id_kategori: "",
    nama_kategori: "",
    judul_kategori: "",
  });
  const { id_kategori } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:1234/api/kategori-surat/${id_kategori}`
        );
        const data = await response.json();
        setKategori((prevKategori) => ({
          ...prevKategori,
          ...data.data,
        }));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id_kategori]);

  const updateData = async () => {
    try {
      const response = await fetch(
        `http://localhost:1234/api/kategori-surat/${id_kategori}`,
        {
          method: "PUT",
          body: JSON.stringify({
            nama_kategori: kategori.nama_kategori,
            judul_kategori: kategori.judul_kategori,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKategori((prevKategori) => ({
      ...prevKategori,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await updateData();
    navigate("/kategori-surat");
  };

  return (
    <div className="d-flex flex-row ">
      <Sidebar />
      <div className="container p-5">
        <h1>Kategori Surat &gt;&gt; EDIT</h1>
        <p>
          Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat
          <br />
          Klik "Tambah" pada kolom aksi untuk menambahkan kategori baru
        </p>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <div className="w-25">ID (Auto Increment)</div>
          <div class="input-group"></div>
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            defaultValue={kategori.id_kategori}
            disabled
          />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="w-25">Nama Kategori</div>
          <div className="input-group">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={kategori.nama_kategori}
              onChange={handleChange}
              name="nama_kategori"
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="w-25">Judul Kategori</div>
          <div className="input-group">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={kategori.judul_kategori}
              onChange={handleChange}
              name="judul_kategori"
            />
          </div>
        </div>
        <div className=" d-flex flex-row">
          <a
            href="/kategori-surat"
            className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-warning text-white me-3 px-3 py-2 mt-4"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="ms-1">Kembali</span>
          </a>
          <a
            href="/kategori-surat"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
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

export default FormEditKategori;
