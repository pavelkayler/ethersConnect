import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Context } from "../../../core/context/Context.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { wallet } = useContext(Context);

  return (
    <>
      <div
        className="d-flex flex-row align-items-center justify-content-evenly w-100"
        style={{
          backgroundColor: "rebeccapurple",
          height: "8vh",
        }}
      >
        <h1 className="text-white fw-semibold text-decoration-none m-2">
          <Link to="/" className="text-white fw-bold text-decoration-none m-2">
            Профессионалы 2026
          </Link>
        </h1>
        {wallet !== null ? (
          <Navbar bg="rebeccapurple">
            <Container>
              <Link
                to="/"
                className="text-white fw-bold text-decoration-none m-2"
              >
                Главная
              </Link>
              <Nav>
                <Link
                  to="/pools"
                  className="text-white fw-bold text-decoration-none m-2"
                >
                  Пулы
                </Link>

                <Link
                  to="/staking"
                  className="text-white fw-bold text-decoration-none m-2"
                >
                  Стакинг
                </Link>
                <Link
                  to="/pool"
                  className="text-white fw-bold text-decoration-none m-2"
                >
                  Роутер
                </Link>
                <Link
                  to="/mainPage"
                  className="text-white fw-bold text-decoration-none m-2"
                >
                  Личный кабинет
                </Link>
              </Nav>
            </Container>
            <Button
              onClick={() => {
                console.log(wallet);
              }}
            >
              account
            </Button>
          </Navbar>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export { Header };
