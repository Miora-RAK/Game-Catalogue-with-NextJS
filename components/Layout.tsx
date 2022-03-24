import React from "react";
import styles from "../styles/Home.module.css";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useUser } from "@auth0/nextjs-auth0";

const Layout: React.FC = ({ children }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-secondary">Search</Button>
              </Form>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/games">Games</Nav.Link>
                <NavDropdown title="Platforms" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Platform1</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Platform2</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Platform3</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/cart">Panier</Nav.Link>
                {!isLoading &&
                  (user ? (
                    <>
                      <Nav.Link href="/account">Mon compte</Nav.Link>
                      <Nav.Link href="/private">Promotions</Nav.Link>
                      <Nav.Link href="/api/auth/logout">Déconnexion</Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/api/auth/login">Connexion</Nav.Link>
                      <Nav.Link href="/account" disabled>
                        Mon compte
                      </Nav.Link>
                    </>
                  ))}
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
