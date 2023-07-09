import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faSignOutAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Row,
  Col,
  Nav,
  Image,
  Dropdown,
  ListGroup,
  Badge,
} from "react-bootstrap";

import NOTIFICATIONS_DATA from "data/notifications";
import Profile3 from "assets/team/profile-picture-3.jpg";

const HeaderContent = (props) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const areNotificationsRead = notifications.reduce(
    (acc, notif) => acc && notif.read,
    true
  );

  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }, 300);
  };

  const Notification = (props) => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? "" : "text-danger";

    return (
      <ListGroup.Item action href={link} className="border-bottom">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image
              src={image}
              className="user-avatar lg-avatar rounded-circle"
            />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Nav className="align-items-center">
      <Dropdown as={Nav.Item} onToggle={markNotificationsAsRead}>
        <Dropdown.Toggle
          as={Nav.Link}
          className="text-dark icon-notifications me-lg-3"
        >
          <span className="icon icon-sm">
            <FontAwesomeIcon icon={faBell} className="bell-shake" />
          </span>
          {areNotificationsRead ? null : (
            <h6 className="text-center">
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-20 p-1 ps-2 unread-notifications"
              >
                99+
              </Badge>
            </h6>
            // <span className="icon-badge rounded-circle unread-notifications" />
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dashboard-dropdown notifications-dropdown shadow rounded-3 dropdown-menu-lg  mt-2 py-0 ">
          <ListGroup className="list-group-flush">
            <Nav.Link
              // href="#"
              className="text-center text-primary fw-bold border-bottom py-3"
            >
              Notifications
            </Nav.Link>

            {notifications.map((n) => (
              <Notification key={`notification-${n.id}`} {...n} />
            ))}

            <Dropdown.Item className="text-center text-primary fw-bold py-3">
              View all
            </Dropdown.Item>
          </ListGroup>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown as={Nav.Item}>
        <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
          <div className="media d-flex align-items-center">
            <Image
              src={Profile3}
              className="user-avatar md-avatar rounded-circle shadow"
            />
            <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
              <span className="mb-0 font-small fw-bold">Bonnie Green</span>
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="user-dropdown dropdown-menu-end mt-2 shadow">
          <Dropdown.Item className="fw-bold">
            <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
          </Dropdown.Item>
          <Dropdown.Item className="fw-bold">
            <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
          </Dropdown.Item>
          <Dropdown.Item className="fw-bold">
            <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item className="fw-bold">
            <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />{" "}
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};
export default HeaderContent;
