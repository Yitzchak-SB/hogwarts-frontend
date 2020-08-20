import React from "react";
import Avatar from "react-avatar";

const ProfilePic = ({ url, size }) => {
  const src = url;

  return (
    <div>
      <Avatar size={size} round={true} src={src} />
    </div>
  );
};

export default ProfilePic;
