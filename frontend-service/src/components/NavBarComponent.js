import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand href="#home" style={{ fontFamily: 'fantasy'}}>
          <i>TOP EDUCATION</i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Estudiante" id="basic-nav-dropdown">
              <NavDropdown.Item href="/add-student">Create</NavDropdown.Item>
              <NavDropdown.Item href="/student-list">
                List
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Matrícula" id="basic-nav-dropdown">
              <NavDropdown.Item href="/add-tuition">Create</NavDropdown.Item>
              <NavDropdown.Item href="/tuition-list">
                List
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Test" id="basic-nav-dropdown">
              <NavDropdown.Item href="/process-file">Create</NavDropdown.Item>
              <NavDropdown.Item href="/tests">
                List
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Reporte" id="basic-nav-dropdown">
              <NavDropdown.Item href="/create-report">Create</NavDropdown.Item>
              <NavDropdown.Item href="/reports">
                List
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;