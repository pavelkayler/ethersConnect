import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Header = () => {
  const { wallet } = useContext(Context);
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
              <h1>Профессионалы 2026</h1>
            </Link>
          </Nav>
          <Nav>
            <Link to="/pools">POOLS</Link>
          </Nav>
          {wallet !== null ? (
            <>
              <Nav>
                <Link to="/pools">POOLS</Link>
              </Nav>
              <Nav>
                <Link to="/pools">POOLS</Link>
              </Nav>
              <Nav>
                <Link to="/pools">POOLS</Link>
              </Nav>
            </>
          ) : null}
        </Navbar>
      </div>
    </>
  );
};

export { Header };
