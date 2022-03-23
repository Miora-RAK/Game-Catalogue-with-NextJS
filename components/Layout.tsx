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

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#action1">Logo</Nav.Link>
                <Nav.Link href="#action2">Connexion</Nav.Link>
                <NavDropdown title="Platforms" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Platform1</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Platform2</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Platform3</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                  Mon compte
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
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
