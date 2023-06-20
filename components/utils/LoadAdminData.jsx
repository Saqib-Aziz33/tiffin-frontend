/* eslint-disable @next/next/no-img-element */
import { STATUS } from "@/lib/constants";
import { fetchRoles } from "@/store/features/roleSlice";
import { Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// fetch all necessary data for admin
function LoadAdminData({ setLoading }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.roles);

  useEffect(() => {
    if (status === STATUS.idle) {
      dispatch(fetchRoles());
    }
  }, []);

  useEffect(() => {
    if (status === STATUS.success) {
      setLoading(false);
    }
  }, [status]);

  return (
    <Center minH={"100vh"}>
      <img
        src="/assets/tiffin.png"
        className="w-[100px] animate-pulse"
        alt=""
      />
    </Center>
  );
}
export default LoadAdminData;
