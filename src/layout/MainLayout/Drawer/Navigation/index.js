// bootstrap
import { Nav, Container, Col, Row, Image } from "react-bootstrap";

// project import
import NavGroup from "./NavGroup";
import ProfileWidget from "components/Widgets/ProfileWidget";
import menuItems from "menu";

// assets
import logo from "assets/logo.png";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const navGroups = menuItems.items.map((item) => {
    if (item.type === "group") return <NavGroup key={item.id} item={item} />;
  });

  return (
    <Nav
      className="flex-column"
      activeKey="/"
      // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Container fluid>
        <Row className="d-flex align-items-center">
          <Col className="d-flex align-items-center justify-content-center mt-3">
            <Image src={logo} style={{ width: "60%", height: "auto" }} />
          </Col>
        </Row>
      </Container>
      {navGroups}
      <ProfileWidget />
    </Nav>
  );
};

export default Navigation;
