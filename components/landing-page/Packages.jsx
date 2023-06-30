import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
      maxW={320}
    >
      {children}
    </Box>
  );
}

export default function Packages({ packages }) {
  const { token, isLogin } = useSelector((state) => state.user);
  const router = useRouter();

  const handleGetStarted = (id) => {
    if (!isLogin) return router.push("/login");
    router.push(`/checkout/${id}`);
  };

  return (
    <Box py={12} id="packages">
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with any offer that suites your need.
        </Text>
      </VStack>

      <Stack
        direction={{ base: "column", md: "row" }}
        flexWrap={"wrap"}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        {packages.map((item) => (
          <PriceWrapper key={item._id}>
            <Box position="relative">
              {item.popular ? (
                <Box
                  position="absolute"
                  top="-16px"
                  left="50%"
                  style={{ transform: "translate(-50%)" }}
                >
                  <Text
                    textTransform="uppercase"
                    bg={useColorModeValue("green.300", "green.700")}
                    px={3}
                    py={1}
                    color={useColorModeValue("gray.900", "gray.300")}
                    fontSize="sm"
                    fontWeight="600"
                    rounded="xl"
                  >
                    Most Popular
                  </Text>
                </Box>
              ) : null}

              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  {item.name}
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    Rs
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    {item.price}
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /month
                  </Text>
                </HStack>
              </Box>
              <Text fontSize="sm" fontWeight="400" px={2}>
                {item.description}
              </Text>
              <VStack
                bg={useColorModeValue("gray.50", "gray.700")}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  {item.perks.map((perk, i) => (
                    <ListItem key={i}>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      {perk}
                    </ListItem>
                  ))}
                </List>
                <Box w="80%" pt={7}>
                  <Button
                    w="full"
                    colorScheme="green"
                    variant={item.popular ? "solid" : "outline"}
                    onClick={() => handleGetStarted(item._id)}
                  >
                    Get started
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
        ))}
      </Stack>
    </Box>
  );
}
