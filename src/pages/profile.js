import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// bootstrap
import { Col, Row } from "react-bootstrap";

// project import
import ProfileForm from "components/Forms/ProfileForm";
import { getInformationUser } from "store/reducers/userReq";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    getInformationUser(dispatch);
  }, [dispatch]);
  const { id } = useParams();
  return (
    <>
      <Row className="justify-content-md-center mt-0">
        <Col xs={12} className="mb-4 d-sm-block">
          {userInfo
            .filter((user) => user._id === id)
            .map((filteredUser) => (
              <ProfileForm userInfo={filteredUser} />
            ))}
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-0">
        <Col xs={12} lg={7} className="mb-4 d-sm-block">
          haha
        </Col>
        <Col xs={12} lg={5} className="mb-4 d-sm-block">
          hihi
          {userInfo.map((user) => (
            <div key={user._id}>
              <p>{user.username}</p>
              <p>{user.userInfoId}</p>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};
export default Profile;
