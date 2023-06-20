import { local } from "@/lib/constants";
import { loadUser } from "@/store/features/userSlice";
import { loadUser as adminLoadUser } from "@/store/features/adminSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function LoadUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window != "undefined") {
      // load user
      const user = JSON.parse(localStorage.getItem(local.user));
      if (user) dispatch(loadUser(user));
      // load admin
      const admin = JSON.parse(localStorage.getItem(local.admin));
      if (admin) dispatch(adminLoadUser(admin));
    }
  }, []);
  return null;
}
export default LoadUser;
