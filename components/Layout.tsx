import React from "react";
import styles from "../styles/Home.module.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  Card,
  Dropdown,
} from "react-bootstrap";
import { useUser } from "@auth0/nextjs-auth0";
import { BsCart2, BsPersonCircle, BsSearch } from "react-icons/bs";

const Layout: React.FC = ({ children }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand className="text-secondary" href="/">
              Game Catalogue
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="game name"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-secondary">
                  <BsSearch />
                </Button>
              </Form>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/games">Games</Nav.Link>

                {!isLoading &&
                  (user ? (
                    <>
                      <Nav.Link href="/private">Promotions</Nav.Link>

                      <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-user">
                          <Card.Img
                            className={styles.user}
                            src={!isLoading && user && `${user.picture}`}
                            alt={!isLoading && user && `${user.name}`}
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="/account">
                            Mon compte
                          </Dropdown.Item>
                          <Dropdown.Item href="/api/auth/logout">
                            Déconnexion
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/api/auth/login">
                        <BsPersonCircle className={styles.icone} />
                      </Nav.Link>
                    </>
                  ))}
                <Nav.Link href="/cartList">
                  <div>
                    <BsCart2 className={styles.icone} />{" "}
                    {/* <div className={styles.numberCart}>1</div> */}
                  </div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div> {children}</div>
        <footer className={styles.footer}>
          <p>Made by Miora</p>
        </footer>
      </header>
    </>
  );
};
export default Layout;
