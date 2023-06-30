import Layout from "@/components/layout/Layout";
import withUserAuth from "@/components/utils/withUserAuth";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE}/packages/menu/${params.package}`
  );
  return { props: { data } };
}

function Page({ data }) {
  const { token } = useSelector((state) => state.user);
  const router = useRouter();

  const purchaseQuery = useMutation(async (t) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/subscription`,
        {
          package: router.query.package,
          token: t.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!data.success) {
        toast.error("Something went wrong");
      }
      router.push("/payment-success");
    } catch (e) {
      toast.error(e.response.data.message);
      throw e.response.data;
    }
  });

  return (
    <>
      <Head>
        <title>Tiffin</title>
      </Head>

      <Layout>
        <Container maxW={2000} my={8}>
          <Stack spacing={3}>
            <Heading size={"4xl"}>{data.package.name}</Heading>
            <Text>{data.package.description}</Text>
            <Stack align={"start"}>
              {data.package.perks.map((perk) => (
                <Badge colorScheme="green" key={perk} rounded="xl" px={2}>
                  {perk}
                </Badge>
              ))}
            </Stack>
            <Heading>
              <Text as="span" fontWeight={400}>
                Rs
              </Text>{" "}
              {data.package.price}/{" "}
              <Text as="span" fontWeight={400} opacity={0.6}>
                month
              </Text>
            </Heading>

            <Heading pt={8} size="lg">
              Weekly Menu
            </Heading>

            <Stack direction={"row"} flexWrap={"wrap"} gap={4}>
              <Box>
                <Text fontWeight={600}>Monday</Text>
                <UnorderedList pl={4}>
                  {data.menu.monday.map((item) => (
                    <ListItem key={item._id}>{item.name}</ListItem>
                  ))}
                </UnorderedList>
              </Box>

              <Box>
                <Text fontWeight={600}>Tuesday</Text>
                <UnorderedList pl={4}>
                  {data.menu.tuesday.map((item) => (
                    <ListItem key={item._id}>{item.name}</ListItem>
                  ))}
                </UnorderedList>
              </Box>

              <Box>
                <Text fontWeight={600}>Wednesday</Text>
                <UnorderedList pl={4}>
                  {data.menu.wednesday.map((item) => (
                    <ListItem key={item._id}>{item.name}</ListItem>
                  ))}
                </UnorderedList>
              </Box>

              <Box>
                <Text fontWeight={600}>Thursday</Text>
                <UnorderedList pl={4}>
                  {data.menu.thursday.map((item) => (
                    <ListItem key={item._id}>{item.name}</ListItem>
                  ))}
                </UnorderedList>
              </Box>

              <Box>
                <Text fontWeight={600}>Friday</Text>
                <UnorderedList pl={4}>
                  {data.menu.friday.map((item) => (
                    <ListItem key={item._id}>{item.name}</ListItem>
                  ))}
                </UnorderedList>
              </Box>

              <Box>
                <Text fontWeight={600}>Saturday</Text>
                <UnorderedList pl={4}>
                  {data.menu.saturday.map((item) => (
                    <ListItem key={item._id}>{item.name}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </Stack>

            <StripeCheckout
              token={(t) => purchaseQuery.mutate(t)}
              stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
              amount={data.package.price * 100}
              currency="PKR"
            >
              <Button
                w="full"
                colorScheme="green"
                variant={"solid"}
                isLoading={purchaseQuery.isLoading}
                size="lg"
              >
                Pay Now
              </Button>
            </StripeCheckout>
          </Stack>
        </Container>
      </Layout>
    </>
  );
}

export default withUserAuth(Page);
