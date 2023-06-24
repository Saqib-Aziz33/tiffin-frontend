import { useSelector } from "react-redux";
import AllowedRole from "../utils/AllowedRole";
import { Heading } from "@chakra-ui/react";
import Menus from "./WeeklyMenu";
import TodayMenu from "./TodayMenu";

function MenuRoleMapping() {
  const { user } = useSelector((state) => state.admin);
  const { roles } = useSelector((state) => state.roles);

  if (user.role === roles.Admin)
    return (
      <AllowedRole role={roles?.Admin}>
        <Heading size="md" mb={4}>
          Weekly Menu
        </Heading>
        <Menus />
      </AllowedRole>
    );

  return (
    <>
      <Heading size="md" mb={4}>
        Today Menu
      </Heading>
      <TodayMenu />
    </>
  );
}
export default MenuRoleMapping;
