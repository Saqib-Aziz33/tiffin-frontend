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
  IconButton,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";

function EditPackage({ data }) {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      name: data.name,
      description: data.description,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3),
      description: Yup.string().required("Name is required").min(3),
    }),
    onSubmit: (values) => {
      updateQuery.mutate();
    },
  });

  const updateQuery = useMutation(async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE}/meals/${data._id}`,
        formik.values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Meal Updated");
        formik.resetForm();
        onClose();
        // refetch latest data
        queryClient.invalidateQueries("meals/get-all");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  });

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme="green"
        variant={"ghost"}
        icon={<AiFillEdit />}
        size="sm"
        isLoading={updateQuery.isLoading}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Meal</ModalHeader>
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
              <FormControl id="description...">
                <FormLabel>Description</FormLabel>
                <Input
                  _focus={{ borderColor: "green", boxShadow: "none" }}
                  type="text"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <Text color="red.400" fontSize={12}>
                    {formik.errors.description}
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
              isLoading={updateQuery.isLoading}
              onClick={formik.handleSubmit}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default EditPackage;
