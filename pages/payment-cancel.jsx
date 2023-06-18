import Layout from "@/components/layout/Layout";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

function Page() {
  return (
    <Layout>
      <Container maxW={600} textAlign="center" py={10} px={6}>
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={"red.500"}
            rounded={"50px"}
            w={"55px"}
            h={"55px"}
            textAlign="center"
          >
            <CloseIcon boxSize={"20px"} color={"white"} />
          </Flex>
        </Box>

        <Heading as="h2" size="xl" mt={6} mb={2}>
          Payment Cancelled
        </Heading>
        <Text color={"gray.500"}>
          We apologize, but it seems that there was an issue processing your
          subscription payment. Please try again later.
        </Text>
      </Container>
    </Layout>
  );
}
export default Page;
