import { logout } from "@/store/features/userSlice";
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
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

function Navbar() {
  const { user, isLogin } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <Box>
      <Container maxW={2000} py={2}>
        <HStack alignItems={"center"} justify={"space-between"}>
          <Link href="/">
            <HStack gap={{ base: 0, md: 2 }}>
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

          <HStack>
            <SwitchTheme />
            {isLogin ? (
              <div>
                <Menu>
                  <MenuButton as={"button"}>
                    <Avatar name={user.name} />
                  </MenuButton>
                  <MenuList>
                    <Link href="/profile">
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            ) : (
              <HStack gap={{ base: 4, md: 8 }}>
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
        </HStack>
      </Container>
    </Box>
  );
}
export default Navbar;

function SwitchTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} variant={"ghost"} mx={2}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
