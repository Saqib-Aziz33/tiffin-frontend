import { logout } from "@/store/features/userSlice";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const { user, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Box>
      <Container maxW={2000} py={2}>
        <HStack alignItems={"center"} justify={"space-between"}>
          <Link href="/">
            <HStack>
              <Image height={100} width={50} src="/assets/tiffin.png" />
              <Heading
                fontFamily={"'Kaushan Script', cursive"}
                letterSpacing={3}
                size="lg"
              >
                Tiffin
              </Heading>
            </HStack>
          </Link>

          {/* login and register */}
          {isLogin ? (
            <div>
              <Menu>
                <MenuButton as={"button"}>
                  <Avatar name={user.name} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <HStack gap={8}>
              <Link href="/login">
                <Text as="span" _hover={{ textDecor: "underline" }}>
                  Login
                </Text>
              </Link>
              <Link href="/register">
                <Button colorScheme="green">Register</Button>
              </Link>
            </HStack>
          )}
        </HStack>
      </Container>
    </Box>
  );
}
export default Navbar;
