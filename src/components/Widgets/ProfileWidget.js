import React from "react";
import { Card } from "react-bootstrap";

import Profile3 from "assets/team/profile-picture-3.jpg";
import ProfileCover from "assets/profile-cover.jpg";

const ProfileWidget = () => {
  return (
    <Card className="text-center mx-auto mt-3" style={{ width: "230px" }}>
      <div
        style={{ backgroundImage: `url(${ProfileCover})` }}
        className="profile-cover rounded-top"
      />
      <Card.Body>
        <Card.Img
          src={Profile3}
          alt="Night Owl"
          className="user-avatar large-avatar mx-auto mt-n6 mb-2"
        />
        <Card.Title>Night Owl</Card.Title>
        <Card.Subtitle className="fw-normal">Admin</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default ProfileWidget;
