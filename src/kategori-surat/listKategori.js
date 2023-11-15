import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

const ListKategori = () => {
  const [surat, setSurat] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");

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

  const deleteData = async (id) => {
    await fetch(`http://localhost:1234/api/kategori-surat/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
        alert("Data berhasil dihapus");
      } else {
        return;
      }
    });
  };

  // Filter data based on search query
  const filteredSurat = surat.filter((element) =>
    element.judul_kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex flex-row ">
      <Sidebar />
      <div className="container p-5">
        <h1>Kategori Surat</h1>
        <p>
          Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat{" "}
          <br />
          Klik "Tambah" pada kolom aksi untuk menambahkan kategori baru
        </p>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <span>Cari Surat : </span>
          <div className="input-group mb-3 ms-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => {
                setSearchQuery(search);
              }}
            >
              Cari
            </button>
          </div>
        </div>
        <table className="table">
          <thead className="table-secondary">
            <tr>
              <th scope="col">ID Kategori</th>
              <th scope="col">Nama Kategori</th>
              <th scope="col">Judul Kategori</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredSurat) &&
              filteredSurat.map((element, index) => (
                <tr key={index}>
                  <td>{element.id_kategori}</td>
                  <td>{element.nama_kategori}</td>
                  <td>{element.judul_kategori}</td>
                  <td className="d-flex flex-row">
                    <button
                      onClick={() => {
                        deleteData(element.id_kategori);
                      }}
                      className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-3 bg-danger me-2 px-2 py-1"
                    >
                      <i className="fa-solid fa-trash"></i>
                      <span className="ms-1">Hapus</span>
                    </button>
                    <a
                      href={`/form-edit-kategori/${element.id_kategori}`}
                      className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-3 bg-primary px-2 py-1"
                    >
                      <i className="fa-solid fa-edit"></i>
                      <span className="ms-1">Edit</span>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <a
          href="/form-tambah-kategori"
          className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-center rounded-1 bg-success text-white me-1 px-3 py-2 w-25"
        >
          <i className="fa-solid fa-plus"></i>{" "}
          <span className="ms-1">Tambah Kategori Baru</span>
        </a>
      </div>
    </div>
  );
};

export default ListKategori;
