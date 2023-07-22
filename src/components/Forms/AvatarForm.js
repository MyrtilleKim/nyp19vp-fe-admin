import React, { useRef, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import ProfileCover from "assets/profile-cover.jpg";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";

// project import
import { uploadFile, updateAvatarUser } from "store/requests/user";

const AvatarForm = ({ user, handleAlert, currentUser, dispatch, axiosJWT }) => {
  const { _id, name, role } = user;
  const [avatar, setAvatar] = useState(user.avatar);
  const showRole = role === "admin" ? "Admin" : "User";
  const inputRef = useRef(null);

  useEffect(() => {
    setAvatar(user.avatar);
  }, [user]);

  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;

    console.log("fileObj is", fileObj);

    const form = new FormData();
    form.append("file", fileObj);
    const res = await uploadFile(currentUser?.accessToken, form);

    const formAvatar = new FormData();
    formAvatar.append("avatar", res.data);
    const resImg = await updateAvatarUser(
      _id,
      currentUser?.accessToken,
      formAvatar,
      dispatch,
      axiosJWT
    );

    if (resImg.statusCode === 200) {
      setAvatar(URL.createObjectURL(fileObj));
      handleAlert("Thành công", "Cập nhập thành công ảnh đại diện", "success");
    } else {
      handleAlert("Thất bại", "Cập nhập ảnh đại diện thất bại", "danger");
    }

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4 text-center">
      <div
        style={{ backgroundImage: `url(${ProfileCover})` }}
        className="profile-cover rounded-top"
      />
      <Card.Body className="pb-4">
        <div className="position-relative mx-auto" style={{ width: "12rem" }}>
          <Card.Img
            src={avatar}
            alt={name}
            className="mt-n7 mx-auto mb-3 user-avatar profile-avatar rounded-circle"
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleFileChange}
          />
          <Button
            className="position-absolute bottom-10 end-10 rounded-circle text-center"
            onClick={handleClick}
            variant="light"
            style={{
              height: "30px",
              width: "30px",
              padding: "0 1px 0 1px",
            }}
          >
            <FontAwesomeIcon icon={faCameraAlt} />
          </Button>
        </div>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="fw-normal">{showRole}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default AvatarForm;
