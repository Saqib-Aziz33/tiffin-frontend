import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/store/features/adminSlice";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required").min(6),
    }),
    onSubmit: async (values) => {
      // send request to api to convert address into lat, lng
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE}/admin/sign-in`,
          values
        );
        if (!data.success) {
          return toast.error(data.message);
        }
        toast.success("Welcome Back");
        // dispatch to redux
        dispatch(login(data));
        router.push("/admin");
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          toast.error(e.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Tiffin Admin | Login</title>
      </Head>
      <Stack
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack
              spacing={4}
              as="form"
              onSubmit={formik.handleSubmit}
              minW={300}
            >
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  _focus={{ borderColor: "green", boxShadow: "none" }}
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
                <Input
                  _focus={{ borderColor: "green", boxShadow: "none" }}
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <Text color="red.400" fontSize={12}>
                    {formik.errors.password}
                  </Text>
                ) : null}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox colorScheme="green">Remember me</Checkbox>
                </Stack>
                <Button colorScheme="green" isLoading={loading} type="submit">
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
