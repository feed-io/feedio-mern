import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";

const Avatar = ({ user }) => {
  const seed = user._id;
  const options = {
    // You can customize the avatar with specific options if needed.
  };
  const svg = createAvatar(style, { seed, ...options });

  return (
    <MuiAvatar
      sx={{
        width: 64,
        height: 64,
        borderRadius: "50%",
      }}
      src={`data:image/svg+xml,${encodeURIComponent(svg)}`}
      alt={user.username}
    />
  );
};

export default Avatar;
