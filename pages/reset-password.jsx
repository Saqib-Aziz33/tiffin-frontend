import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      sendRequestQuery.mutate();
    },
  });

  const sendRequestQuery = useMutation(async () => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/password/reset/${router.query.token}`,
        { password: formik.values.password }
      );
      toast.success(data.message);
      router.push("/login");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  });

  return (
    <>
      <Head>
        <title>Tiffin</title>
      </Head>

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          as="form"
          onSubmit={formik.handleSubmit}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Reset your password
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Enter your new password
          </Text>
          <FormControl id="password">
            <Input
              placeholder="New password"
              _placeholder={{ color: "gray.500" }}
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

          <FormControl id="cpass">
            <Input
              placeholder="Confirm password"
              _placeholder={{ color: "gray.500" }}
              _focus={{ borderColor: "green", boxShadow: "none" }}
              type="password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Text color="red.400" fontSize={12}>
                {formik.errors.confirmPassword}
              </Text>
            ) : null}
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme="green"
              type="submit"
              onClick={formik.handleSubmit}
              isLoading={sendRequestQuery.isLoading}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
