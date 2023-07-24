import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// bootstrap
import { Col, Row } from "react-bootstrap";

// project import
import ProfileForm from "components/Forms/ProfileForm";
import TransTable from "components/Tables/TransTable";
import { getAllUsers, getAllTrans } from "store/requests/user";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, trans } = useSelector((state) => state.user);
  useEffect(() => {
    getAllUsers(dispatch);
    getAllTrans(dispatch);
  }, [dispatch]);
  const { id } = useParams();
  return (
    <>
      <Row className="justify-content-md-center mt-0">
        <Col xs={12} className="d-sm-block">
          <ProfileForm
            userInfo={userInfo.filter((user) => user._id === id).at(0)}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-0">
        <Col xs={12} lg={12} className="mb-4 d-sm-block">
          <TransTable
            trans={trans.filter((txn) => txn.user === id)}
            userInfo={userInfo.filter((user) => user._id === id).at(0)}
          />
        </Col>
        <Col xs={12} lg={5} className="mb-4 d-sm-block">
          hihi
          {trans.map((user) => (
            <div key={user._id}>
              <p>{user.user}</p>
              <p>{user.wallet}</p>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};
export default Profile;
