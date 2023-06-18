import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import Navigate from "next/link";
import axios from "axios";
import SelLocation from "@/components/user-register/SelLocation";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      deliveryAddress: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required").min(6),
      deliveryAddress: Yup.string().required("Address is required").min(10),
      phone: Yup.string().required("Phone is required").min(10, "Invalid"),
    }),
    onSubmit: async (values) => {
      // send request to api to convert address into lat, lng
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/services/geocode?address=${values.deliveryAddress}`
        );
        if (data.success) {
          setCoordinates({
            lat: data.location[0].latitude,
            lng: data.location[0].longitude,
          });
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const register = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/register`,
        {
          ...formik.values,
          ...coordinates,
        }
      );
      if (!data.success) {
        return toast.error(e.message);
      }
      toast.success("Registered successfully, login now");
      router.push("/login");
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Tiffin | Sign up</title>
      </Head>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        {!coordinates ? (
          <Stack
            as={"form"}
            onSubmit={formik.handleSubmit}
            spacing={8}
            mx={"auto"}
            maxW={"lg"}
            py={12}
            px={6}
          >
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool features 🍜
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName">
                      <FormLabel>Name</FormLabel>
                      <Input
                        _focus={{ borderColor: "green" }}
                        type="text"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <Text color="red.400" fontSize={12}>
                          {formik.errors.name}
                        </Text>
                      ) : null}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Phone</FormLabel>
                      <Input
                        _focus={{ borderColor: "green" }}
                        type="text"
                        {...formik.getFieldProps("phone")}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <Text color="red.400" fontSize={12}>
                          {formik.errors.phone}
                        </Text>
                      ) : null}
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    _focus={{ borderColor: "green" }}
                    type="email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Text color="red.400" fontSize={12}>
                      {formik.errors.email}
                    </Text>
                  ) : null}
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      _focus={{ borderColor: "green" }}
                      type={showPassword ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password ? (
                    <Text color="red.400" fontSize={12}>
                      {formik.errors.password}
                    </Text>
                  ) : null}
                </FormControl>

                <FormControl id="deliveryAddress">
                  <FormLabel>Delivery Address</FormLabel>
                  <Input
                    _focus={{ borderColor: "green" }}
                    type="tetxt"
                    {...formik.getFieldProps("deliveryAddress")}
                  />
                  {formik.touched.deliveryAddress &&
                  formik.errors.deliveryAddress ? (
                    <Text color="red.400" fontSize={12}>
                      {formik.errors.deliveryAddress}
                    </Text>
                  ) : null}
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    colorScheme="green"
                    type="submit"
                    isLoading={loading}
                  >
                    Next
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Text as="span" color={"green.400"}>
                      <Navigate href="/login">Login</Navigate>
                    </Text>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <Stack maxW={600} direction="column" gap={4} py={12} px={6}>
            <Heading size="lg" fontWeight={400}>
              Pick your Exact Delivery Location
            </Heading>
            <SelLocation
              coordinates={coordinates}
              setCoordinates={setCoordinates}
            />
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                colorScheme="green"
                type="button"
                onClick={register}
                isLoading={loading}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        )}
      </Flex>
    </>
  );
}
