import { Center } from "@chakra-ui/react";
import Image from "next/image";
import { useSelector } from "react-redux";

// only allow a single role to visit the page
/**
 *
 * @param {ObjectID} roles, permissions
 * @returns
 */
function AllowedRole({ role, children }) {
  const { user } = useSelector((state) => state.admin);

  if (role === user.role) return children;

  return (
    <Center minH={"90vh"}>
      <Image src="/assets/401.png" alt="" height={100} width={250} />
    </Center>
  );
}
export default AllowedRole;
