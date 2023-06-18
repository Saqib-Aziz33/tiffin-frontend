import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import DeleteProfile from "./DeleteProfile";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProfile } from "@/store/features/userSlice";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

function ProfileUpdate() {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const updateQuery = useMutation(async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/${user._id}`,
        formik.values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(updateProfile(data.user));
      toast.success("Profile updated");
    } catch (e) {
      toast.error(e.response.data.message);
      throw e;
    }
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      phone: user.phone,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3),
      phone: Yup.string().required("Phone is required").min(10, "Invalid"),
    }),
    onSubmit: (values) => {
      updateQuery.mutate();
    },
  });

  if (user)
    return (
      <Box>
        <Stack id="user-information">
          <HStack>
            <AiOutlineUser /> <Text>{user.name}</Text>
          </HStack>
          <HStack>
            <AiOutlineMail /> <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <AiOutlinePhone /> <Text>{user.phone}</Text>
          </HStack>
          <HStack>
            <BiCurrentLocation /> <Text>{user.deliveryAddress}</Text>
          </HStack>
        </Stack>

        <Stack as="form" my={8} onSubmit={formik.handleSubmit}>
          <FormControl id="firstName">
            <FormLabel>Name</FormLabel>
            <Input
              _focus={{ borderColor: "green", boxShadow: "none" }}
              type="text"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <Text color="red.400" fontSize={12}>
                {formik.errors.name}
              </Text>
            ) : null}
          </FormControl>

          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input
              _focus={{ borderColor: "green", boxShadow: "none" }}
              type="text"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <Text color="red.400" fontSize={12}>
                {formik.errors.phone}
              </Text>
            ) : null}
          </FormControl>
          <Button
            colorScheme="green"
            type="submit"
            isLoading={updateQuery.isLoading}
          >
            Update
          </Button>
        </Stack>

        <DeleteProfile />
      </Box>
    );
}
export default ProfileUpdate;
