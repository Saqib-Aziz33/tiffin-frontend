import Layout from "@/components/layout/Layout";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { MdOutlinePayments } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GiMeal } from "react-icons/gi";
import withUserAuth from "@/components/utils/withUserAuth";
import Subscriptions from "@/components/profile/Subscriptions";
import ProfileUpdate from "@/components/profile/ProfileUpdate";
import { useSelector } from "react-redux";

function Page() {
  const { token, user } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>Tiffin</title>
      </Head>

      <Layout>
        <Container maxW={2000} minH={"80vh"}>
          <Tabs colorScheme="green">
            <TabList border="none">
              <Tab gap={4}>
                <GiMeal />
                <Text display={{ base: "none", md: "inline" }} as="span">
                  Select meal
                </Text>
              </Tab>
              <Tab gap={4}>
                <CgProfile />
                <Text display={{ base: "none", md: "inline" }} as="span">
                  Update
                </Text>
              </Tab>
              <Tab gap={4}>
                <MdOutlinePayments />
                <Text display={{ base: "none", md: "inline" }} as="span">
                  Subscriptions
                </Text>
              </Tab>
            </TabList>

            {user ? (
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <ProfileUpdate />
                </TabPanel>
                <TabPanel>
                  <Subscriptions />
                </TabPanel>
              </TabPanels>
            ) : null}
          </Tabs>
        </Container>
      </Layout>
    </>
  );
}

export default withUserAuth(Page);
