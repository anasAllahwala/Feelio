import { useEffect, useState } from "react";
import {useAuth} from "./";

const useIsOwner = (user_id) => {
  const [isOwner, setIsOwner] = useState(true);

  let { user } = useAuth();

  useEffect(() => {
    if(user)
    setIsOwner(user.user_id === user_id);

  }, [user, user_id]);

  return isOwner;
};

export default useIsOwner;
