import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <Box bg={"gray.50"} py={2}>
      <Container maxW={2000}>
        <HStack alignItems={"center"} justify={"space-between"}>
          <Link href="/">
            <Image height={50} width={30} src="/assets/tiffin.png" />
          </Link>

          <Text>&copy;Tiffin 2023 all rights reserved.</Text>

          {/* login and register */}
          <HStack gap={8}>
            <Link href="/#contact">
              <Text as="span" _hover={{ textDecor: "underline" }}>
                Contact
              </Text>
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
export default Footer;
