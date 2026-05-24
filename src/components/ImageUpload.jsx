import React from "react";
import emptybox from "../assets/emptybox.png";

export const ImageUpload = ({ file }) => {
  return (
    <>
        <img
          src={file || emptybox}
          width={300}
          alt="bird"
          className="img-fluid rounded-3"
        />
    </>
  );
};
