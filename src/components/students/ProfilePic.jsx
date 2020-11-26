import React from "react";
import Avatar from "react-avatar";
import { PROFILE_URL } from "../../data/constants";

const ProfilePic = ({ url, size }) => {
  const src = url ? url : PROFILE_URL;

  return (
    <div>
      <Avatar size={size} round={true} src={src} />
    </div>
  );
};

export default ProfilePic;
