import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{
          backgroundColor: "rebeccapurple",
          width: "100%",
          height: "5rem",
        }}
      >
        <Navbar>
          <Nav>
            <Link to="/">
              <h1 className="text-white">Профессионалы 2026</h1>
            </Link>
          </Nav>
          <Nav>
            <Link to="/pools">POOLS</Link>
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export { Header };
