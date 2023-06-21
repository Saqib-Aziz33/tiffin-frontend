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
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import SelLocation from "../utils/SelLocation";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function NewBranch() {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coordinates, setCoordinates] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Branch name is required").min(3),
      address: Yup.string().required("Branch address is required").min(15),
    }),
    onSubmit: (values) => {
      // send request to geocoding endpoint
      if (!coordinates) {
        geocodeQuery.mutate(values.address);
        return;
      }

      // create new branch
      newBranchQuery.mutate();
    },
  });

  const geocodeQuery = useMutation(async (address) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/services/geocode?address=${address}`
      );
      if (data.success) {
        setCoordinates({
          lat: data.location[0].latitude,
          lng: data.location[0].longitude,
        });
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  });

  const newBranchQuery = useMutation(async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/branches`,
        {
          ...formik.values,
          coordinates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Branch Created");
        formik.resetForm();
        setCoordinates(null);
        onClose();
        // refetch latest data
        queryClient.invalidateQueries("branches/get-all");
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
        Branch
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Branch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              <FormControl id="name">
                <FormLabel>Branch Name</FormLabel>
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
              <FormControl id="address">
                <FormLabel>Branch Address</FormLabel>
                <Input
                  _focus={{ borderColor: "green", boxShadow: "none" }}
                  type="text"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <Text color="red.400" fontSize={12}>
                    {formik.errors.address}
                  </Text>
                ) : null}
              </FormControl>
              {coordinates ? (
                <>
                  <Text>Pick the exact location</Text>
                  <SelLocation
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                  />
                </>
              ) : null}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              isLoading={geocodeQuery.isLoading || newBranchQuery.isLoading}
              onClick={formik.handleSubmit}
            >
              {coordinates ? "Create" : "Next"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default NewBranch;
