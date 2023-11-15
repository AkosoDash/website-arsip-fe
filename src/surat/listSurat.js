import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

const ListSurat = () => {
  const [surat, setSurat] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSuratId, setSelectedSuratId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:1234/api/surat");
        const data = await response.json();
        setSurat(data.data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  const handleDeleteClick = (suratId) => {
    setSelectedSuratId(suratId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Lakukan aksi penghapusan data di sini
    const deleteData = async (id) => {
      await fetch(`http://localhost:1234/api/surat/${id}`, {
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

    deleteData(selectedSuratId);

    // Sembunyikan modal setelah penghapusan data
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    // Batalkan penghapusan, sembunyikan modal
    setShowDeleteModal(false);
  };
  const filteredSurat = surat.filter((element) =>
    element.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex flex-row ">
      <Sidebar />
      <div className="container p-5">
        <h1>Arsip Surat</h1>
        <p>
          Berikut ini adalah surat-surat yang telah terbit dan diarsipkan <br />
          Klik "Lihat" pada kolom aksi untuk menampilkan surat
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
              <th scope="col">Nomor Surat</th>
              <th scope="col">Kategori</th>
              <th scope="col">Judul</th>
              <th scope="col">Waktu Pengarsipan</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredSurat) &&
              filteredSurat.map((element, index) => (
                <tr key={index}>
                  <td>{element.nomor_surat}</td>
                  <td>{element.nama_kategori}</td>
                  <td>{element.judul}</td>
                  <td>{element.waktu_pengarsipan}</td>
                  <td className="d-flex flex-row">
                    <button
                      onClick={() => handleDeleteClick(element.id_surat)}
                      className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-3 bg-danger me-2 px-2 py-1"
                    >
                      <i className="fa-solid fa-trash"></i>
                      <span className="ms-1">Hapus</span>
                    </button>
                    <a
                      href={`https://drive.google.com/uc?export=download&id=${element.id_pdf}`}
                      className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-3 bg-warning me-2 px-2 py-1"
                    >
                      <i class="fa-solid fa-download"></i>
                      <span className="ms-1">Unduh</span>
                    </a>
                    <a
                      href={`/form-lihat-surat/${element.id_surat}`}
                      className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-3 bg-primary px-2 py-1"
                    >
                      <i class="fa-solid fa-eye"></i>
                      <span className="ms-1">Lihat</span>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showDeleteModal && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Konfirmasi Hapus</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleDeleteCancel}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Apakah Anda yakin ingin menghapus surat ini?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteConfirm}
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDeleteCancel}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <a
          href="/form-tambah-surat"
          className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-1 bg-light border border-3 me-1 px-3 py-2 w-25"
        >
          <i class="fa-solid fa-book"></i>{" "}
          <span className="ms-1">Arsipkan Surat</span>
        </a>
      </div>
    </div>
  );
};

export default ListSurat;
