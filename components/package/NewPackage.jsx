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
  Select,
  Checkbox,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";

function NewPackage({ menus }) {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [perks, setPerks] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      menu: "",
      popular: false,
      // perks: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3),
      description: Yup.string().required("Description is required").min(10),
      price: Yup.number().required("Price is required").min(3),
      menu: Yup.string().required("Menu is required").min(3),
      popular: Yup.boolean().required(),
      // perks: Yup.array().min(1).required("Perks are required"),
    }),
    onSubmit: (values) => {
      createQuery.mutate();
    },
  });

  const createQuery = useMutation(async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/packages`,
        { ...formik.values, perks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Package Created");
        formik.resetForm();
        setPerks([]);
        onClose();
        // refetch latest data
        queryClient.invalidateQueries("packages/get-all");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  });

  return (
    <>
      <Button
        leftIcon={<AiOutlinePlus />}
        mb={4}
        colorScheme="green"
        display={"block"}
        ml={"auto"}
        onClick={onOpen}
      >
        Package
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Package</ModalHeader>
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
              <FormControl id="description">
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
              <FormControl id="menu">
                <FormLabel>Menu</FormLabel>
                <Select
                  placeholder="Select Weekly Menu"
                  _focus={{ borderColor: "green", boxShadow: "none" }}
                  {...formik.getFieldProps("menu")}
                >
                  {menus.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item._id}
                    </option>
                  ))}
                </Select>
                {formik.touched.menu && formik.errors.menu ? (
                  <Text color="red.400" fontSize={12}>
                    {formik.errors.menu}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input
                  _focus={{ borderColor: "green", boxShadow: "none" }}
                  type="number"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price ? (
                  <Text color="red.400" fontSize={12}>
                    {formik.errors.name}
                  </Text>
                ) : null}
              </FormControl>
              <Stack>
                <Text>Perks</Text>
                <TagsInput
                  value={perks}
                  onChange={setPerks}
                  name="perks"
                  placeHolder="Press enter to add new"
                />
              </Stack>
              <Checkbox
                colorScheme="green"
                mt={2}
                {...formik.getFieldProps("popular")}
              >
                Popular
              </Checkbox>
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
export default NewPackage;
