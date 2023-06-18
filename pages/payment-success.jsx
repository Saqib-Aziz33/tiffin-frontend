import Layout from "@/components/layout/Layout";
import { Container, HStack, Heading, Spinner, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";

function Page() {
  const router = useRouter();
  const { token } = useSelector((state) => state.user);

  const paymentQuery = useQuery("payment/success", async () => {
    try {
      if (router.isReady) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE}/users/subscription`,
          {
            package: router.query.package,
            bill: router.query.bill,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        confetti();
      }
    } catch (e) {
      throw e.response.data;
    }
  });

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.package || !router.query.bill) {
        toast.error("invalid request");
        return router.push("/");
      }
      paymentQuery.refetch();
    }
  }, [router.isReady]);

  return (
    <Layout>
      {paymentQuery.isLoading && (
        <HStack justify={"center"}>
          <Spinner colorScheme="green" size="xl" />
        </HStack>
      )}
      {paymentQuery.isSuccess && (
        <Container maxW={600} textAlign="center" py={10} px={6}>
          <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Payment Successfull
          </Heading>
          <Text color={"gray.500"}>
            Thank you for subscribing and successfully completing your payment!
            We're thrilled to have you on board. Reach out if you need any
            assistance.
          </Text>
        </Container>
      )}
      {paymentQuery.isError && (
        <Text color={"red.500"} textAlign={"center"}>
          {paymentQuery.error.message}
        </Text>
      )}
    </Layout>
  );
}
export default Page;
