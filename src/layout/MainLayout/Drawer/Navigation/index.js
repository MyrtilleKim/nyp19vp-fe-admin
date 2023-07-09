// bootstrap
import { Nav, Container, Col, Row } from "react-bootstrap";

// project import
import NavGroup from "./NavGroup";
import menuItems from "menu";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const navGroups = menuItems.items.map((item) => {
    if (item.type === "group") return <NavGroup key={item.id} item={item} />;
  });

  return (
    <Nav className="flex-column">
      <Container fluid>
        <Row className="align-items-center pt-3">
          <Col className="d-flex align-items-center justify-content-center">
            <h3>Megoo</h3>
          </Col>
        </Row>
      </Container>
      {navGroups}
    </Nav>
  );
};

export default Navigation;
