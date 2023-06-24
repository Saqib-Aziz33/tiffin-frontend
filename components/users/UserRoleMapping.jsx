import { useSelector } from "react-redux";
import AllowedRole from "../utils/AllowedRole";
import { Heading } from "@chakra-ui/react";
import ListAll from "./ListAll";
import ListBranchUsers from "./ListBranchUsers";

function UserRoleMapping() {
  const { user } = useSelector((state) => state.admin);
  const { roles } = useSelector((state) => state.roles);

  if (user.role === roles.Admin)
    return (
      <AllowedRole role={roles?.Admin}>
        <Heading size="md" mb={4}>
          All Users
        </Heading>
        <ListAll />
      </AllowedRole>
    );

  return (
    <>
      <Heading size="md" mb={4}>
        All Users
      </Heading>
      <ListBranchUsers />
    </>
  );
}
export default UserRoleMapping;
