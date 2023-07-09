import React, { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// bootstrap
import { Nav, Container, Col, Row } from "react-bootstrap";

// project import
import { activeItem } from "store/reducers/menu";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { drawerOpen, openItem } = useSelector((state) => state.menu);

  const itemHandler = (id) => {
    dispatch(activeItem({ openItem: [id] }));
  };

  const itemIcon = item.icon ? <FontAwesomeIcon icon={item.icon} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;
  // active menu item on page load
  useEffect(() => {
    if (pathname.includes(item.url)) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const IconStyle = !drawerOpen ? { fontSize: "18px" } : null;

  return (
    <Nav.Item className="sidebar-item">
      <Nav.Link
        disabled={item.disabled}
        href={item.url}
        onClick={() => itemHandler(item.id)}
        active={isSelected}
        className="d-flex justify-content-center align-items-center"
      >
        <Container>
          <Row className="align-items-start">
            <Col xs={2} className="text-end" style={IconStyle}>
              {itemIcon}
            </Col>
            {drawerOpen && (
              <Col xs={8} className="text-start">
                {item.title}
              </Col>
            )}
          </Row>
        </Container>
      </Nav.Link>
    </Nav.Item>
  );
};

NavItem.propTypes = { item: PropTypes.object };

export default NavItem;
