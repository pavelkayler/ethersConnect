import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Header = () => {
  const { wallet, setWallet } = useContext(Context);
  const navigate = useNavigate();

  const handleExit = () => {
    setWallet(null);
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "rebeccapurple",
          width: "100%",
          height: "auto",
        }}
      >
        <div className="d-flex flex-column align-items-center">
          <Navbar>
            <Nav>
              <Link to="/">
                <h1 className="m-0">Профессионалы 2026</h1>
              </Link>
            </Nav>
          </Navbar>
          <Navbar className="d-flex flex-row align-items-center">
            <Nav>
              <Link to="/pools">Пулы</Link>
            </Nav>

            {wallet !== null ? (
              <>
                <Nav>
                  <Link to="/cabinet">Личный кабинет</Link>
                </Nav>
                <Nav>
                  <Link to="/staking">Стэкинг</Link>
                </Nav>
                <Nav>
                  <Button onClick={handleExit} variant="outline-info" className="m-3" size="sm">
                    Выйти
                  </Button>
                </Nav>
              </>
            ) : null}
          </Navbar>
        </div>
      </div>
    </>
  );
};

export { Header };
