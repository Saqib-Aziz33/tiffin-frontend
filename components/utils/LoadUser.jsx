import { loadUser } from "@/store/features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function LoadUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window != "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) dispatch(loadUser(user));
    }
  }, []);
  return null;
}
export default LoadUser;
