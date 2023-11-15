import useWindowDimensions from "../utils/useWindowScreen";
const Sidebar = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div
      className="d-flex w-25 bg-white border border-right-5 flex flex-column align-items-start p-4"
      style={{ width: width, height: height }}
    >
      <h3 className="align-self-center">MENU</h3>
      <h3 className="align-self-center">--------</h3>
      <a
        href="/"
        className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-3 p-3 mb-2 border border-2 w-100"
      >
        <i class="fa-solid fa-star"></i> <span className="ms-3">Arsip</span>
      </a>
      <a
        href="/kategori-surat"
        className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-3 p-3 mb-2 border border-2 w-100"
      >
        <i class="fa-solid fa-clipboard"></i>
        <span className="ms-3">Kategori Surat</span>
      </a>
      <a
        href="/profile"
        className="d-flex flex-row align-items-center text-decoration-none text-dark justify-content-start rounded-3 p-3 mb-2 border border-2 w-100"
      >
        <i class="fa-solid fa-info"></i> <span className="ms-4">About</span>
      </a>
    </div>
  );
};

export default Sidebar;
