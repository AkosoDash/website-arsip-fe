import Sidebar from "../components/sidebar";
import fotoku from "../img/fotoku.png";

const Profile = () => {
  const data = {
    nama: "Abimanyu Prakoso",
    prodi: "D3-MI PSDKU Kediri",
    nim: "2131730098",
    tanggal: "15 November 2023",
    foto_url: fotoku,
  };

  return (
    <div className="d-flex flex-row ">
      <Sidebar />
      <div className="container p-5">
        <h1>About</h1>
        <div className="d-flex flex-row align-items-center">
          <img src={data.foto_url} alt="gambar oe" style={{ width: "250px" }} />
          <div className="w-100 ms-4">
            <p className="fw-bold fs-3">Aplikasi ini dibuat oleh</p>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <div className="w-25">Nama Lengkap</div>
              <div class="input-group">
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  disabled
                  value={data.nama}
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center mt-3">
              <div className="w-25">Program Studi</div>
              <div class="input-group">
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  disabled
                  value={data.prodi}
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center mt-3">
              <div className="w-25">NIM</div>
              <div class="input-group">
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  disabled
                  value={data.nim}
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center mt-3">
              <div className="w-25">Tanggal</div>
              <div class="input-group">
                <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  disabled
                  value={data.tanggal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
