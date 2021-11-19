import { useEffect, useState } from "react";
import { useAuth } from "./";

const useIsOwner = (user_id) => {
  const [isOwner, setIsOwner] = useState(false);

  let { user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user) setIsOwner(user.user_id === user_id);
  }, [user, user_id]);

  return isOwner;
};

export default useIsOwner;
