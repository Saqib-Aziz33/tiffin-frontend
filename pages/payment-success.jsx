import Layout from "@/components/layout/Layout";
import { Container, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Page() {
  const router = useRouter();

  // render effect
  useEffect(() => {
    confetti();
    // after 6s navigate to profile
    const toHome = () => {
      router.push("/profile");
    };

    setTimeout(toHome, 6000);

    return () => {
      clearTimeout(toHome);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Tiffin</title>
      </Head>
      <Layout>
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
      </Layout>
    </>
  );
}
export default Page;
