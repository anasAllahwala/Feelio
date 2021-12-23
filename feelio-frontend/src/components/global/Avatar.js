import React, { useEffect, useState } from "react";
import { API } from "../../constants";

const Avatar = ({ name, image_url, size, className }) => {
  const [image, setImage] = useState();
  const [sizeClass, setSizeClass] = useState();

  useEffect(() => {
    if (image_url) {
      setImage(API.BASE_URL + image_url);
    } else if (name) {
      setImage(
        "https://ui-avatars.com/api/?bold=true&background=0D8ABC&color=fff&name=" +
          name.replace(" ", "+")
      );
    }
  }, [name, image_url]);

  useEffect(() => {
    switch (size) {
      case "small":
        setSizeClass(" h-10 w-10");
        return;
      case "medium":
        setSizeClass(" h-20 w-20");
        return;
      case "large":
        setSizeClass(" h-24 w-24");
        return;
      default:
        setSizeClass(" h-10 w-10");
        return;
    }
  }, [size]);

  if (image)
    return (
      <img
        src={image}
        alt=""
        width={500}
        height={500}
        className={
          "rounded-full shadow-md object-cover " + className + sizeClass
        }
      />
    );

  return null;
};

export default Avatar;
