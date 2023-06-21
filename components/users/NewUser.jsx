import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FiUserPlus } from "react-icons/fi";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

function NewUser({ branches }) {
  const { token } = useSelector((state) => state.admin);
  const { roles } = useSelector((state) => state.roles);
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      branch: "",
      //   phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required").min(6),
      role: Yup.string().required("Select role"),
      branch: Yup.string().required("Select branch"),
      //   phone: Yup.string(),
    }),
    onSubmit: (values) => {
      createQuery.mutate();
    },
  });

  const createQuery = useMutation(async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/admin`,
        formik.values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("User Created");
        formik.resetForm();
        onClose();
        // refetch latest data
        queryClient.invalidateQueries("admin/get-all");
        queryClient.invalidateQueries("branches/admin-required");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  });

  return (
    <>
      <Button
        leftIcon={<FiUserPlus />}
        mb={4}
        colorScheme="green"
        display={"block"}
        ml={"auto"}
        onClick={onOpen}
      >
        User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={1}>
              <FormControl id="name">
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
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
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
                <InputGroup>
                  <Input
                    _focus={{ borderColor: "green", boxShadow: "none" }}
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
              {/* <FormControl id="phone">
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
              </FormControl> */}
              <FormControl id="branch">
                <FormLabel>Branch</FormLabel>
                <Select
                  placeholder="Select user branch"
                  _focus={{ borderColor: "green", boxShadow: "none" }}
                  {...formik.getFieldProps("branch")}
                >
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </Select>
                {formik.touched.branch && formik.errors.branch ? (
                  <Text color="red.400" fontSize={12}>
                    {formik.errors.branch}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Select user role"
                  _focus={{ borderColor: "green", boxShadow: "none" }}
                  {...formik.getFieldProps("role")}
                >
                  <option value={roles.BranchAdmin}>Branch Admin</option>
                  <option value={roles.DeliveryBoy}>Delivery Boy</option>
                </Select>
                {formik.touched.role && formik.errors.role ? (
                  <Text color="red.400" fontSize={12}>
                    {formik.errors.role}
                  </Text>
                ) : null}
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              isLoading={createQuery.isLoading}
              onClick={formik.handleSubmit}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default NewUser;
