// Assets
import Navbar from "react-bootstrap/Navbar";

const MenuBtn = (second) => {
  return (
    <>
      <Navbar.Toggle aria-controls="responsive-navbar-nav">
        <div className="burger-menu">
          <div className="line-menu line-half first-line"></div>
          <div className="line-menu"></div>
          <div className="line-menu line-half last-line"></div>
        </div>
      </Navbar.Toggle>
    </>
  );
};
export default MenuBtn;
