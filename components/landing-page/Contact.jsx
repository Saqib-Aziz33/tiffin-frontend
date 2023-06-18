import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Contact() {
  const messageQuery = useMutation(async (resetForm) => {
    try {
      await axios.post("/api/message", formik.values);
      toast.success("Thank you");
      resetForm();
    } catch (e) {
      toast.error("Something Went Wrong");
      throw e;
    }
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3),
      email: Yup.string().email().required("Email is required"),
      message: Yup.string().required("Message is required").min(6),
    }),
    onSubmit: async (values, { resetForm }) => {
      messageQuery.mutate(resetForm);
    },
  });

  return (
    <Container
      backgroundImage={"url(/assets/contact.jpg)"}
      backgroundSize="cover"
      backgroundAttachment="fixed"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      maxW="full"
      mt={0}
      centerContent
      overflow="hidden"
      id="contact"
    >
      <Flex>
        <Box
          bg="#38A16966"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          style={{ backdropFilter: "blur(5px)" }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <Stack pl={0} spacing={3}>
                      <Button
                        size="md"
                        variant="ghost"
                        leftIcon={<MdPhone color="green" size="20px" />}
                        justifyContent={"flex-start"}
                      >
                        03459084214
                      </Button>
                      <Button
                        size="md"
                        variant="ghost"
                        leftIcon={<MdEmail color="green" size="20px" />}
                        justifyContent={"flex-start"}
                      >
                        saqib.aziz41@gmail.com
                      </Button>
                      <Button
                        size="md"
                        variant="ghost"
                        leftIcon={<MdLocationOn color="green" size="20px" />}
                        justifyContent={"flex-start"}
                      >
                        Rawalpindi, Pakistan
                      </Button>
                    </Stack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack
                      as="form"
                      onSubmit={formik.handleSubmit}
                      spacing={5}
                    >
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input
                            size="md"
                            _focus={{ borderColor: "green", boxShadow: "none" }}
                            type="text"
                            {...formik.getFieldProps("name")}
                          />
                        </InputGroup>
                        {formik.touched.name && formik.errors.name ? (
                          <Text color="red.400" fontSize={12}>
                            {formik.errors.name}
                          </Text>
                        ) : null}
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input
                            size="md"
                            _focus={{ borderColor: "green", boxShadow: "none" }}
                            type="email"
                            {...formik.getFieldProps("email")}
                          />
                        </InputGroup>
                        {formik.touched.email && formik.errors.email ? (
                          <Text color="red.400" fontSize={12}>
                            {formik.errors.email}
                          </Text>
                        ) : null}
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          _focus={{ borderColor: "green", boxShadow: "none" }}
                          {...formik.getFieldProps("message")}
                          placeholder="message"
                        />
                        {formik.touched.message && formik.errors.message ? (
                          <Text color="red.400" fontSize={12}>
                            {formik.errors.message}
                          </Text>
                        ) : null}
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          colorScheme="green"
                          type="submit"
                          isLoading={messageQuery.isLoading}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
