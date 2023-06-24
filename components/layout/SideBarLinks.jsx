import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome, FiUsers } from "react-icons/fi";
import { GiFireplace, GiMeal, GiOpenedFoodCan } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { GrUserAdmin } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { CiMoneyBill } from "react-icons/ci";

function SideBarLinks() {
  const { user } = useSelector((state) => state.admin);
  const { roles } = useSelector((state) => state.roles);

  return (
    <>
      <NavItem to="/admin" icon={FiHome}>
        Home
      </NavItem>

      {user.role !== roles.DeliveryBoy && (
        <NavItem to="/admin/users" icon={GrUserAdmin}>
          Users
        </NavItem>
      )}

      <NavItem to="/admin/menu" icon={GiOpenedFoodCan}>
        Menu
      </NavItem>

      {user.role === roles.Admin ? (
        <>
          <NavItem to="/admin/meal" icon={GiMeal}>
            Meal
          </NavItem>

          <NavItem to="/admin/branches" icon={GiFireplace}>
            Branches
          </NavItem>

          <NavItem to="/admin/packages" icon={GoPackage}>
            Packages
          </NavItem>

          <NavItem to="/admin/bills" icon={CiMoneyBill}>
            Bills
          </NavItem>

          <NavItem to="/admin/clients" icon={FiUsers}>
            Clients
          </NavItem>
        </>
      ) : null}
    </>
  );
}
export default SideBarLinks;

const NavItem = ({ icon, to, children, ...rest }) => {
  const router = useRouter();

  return (
    <Link href={to}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "green.400",
          color: "white",
        }}
        color={
          router.asPath == to ? "white" : useColorModeValue("black", "white")
        }
        bg={router.asPath == to ? "green.400" : ""}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
