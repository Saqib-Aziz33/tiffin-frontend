import Layout from "@/components/layout/Layout";
import { decremented, incremented } from "@/store/features/counterSlice";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Tiffin</title>
      </Head>

      <Layout></Layout>
    </>
  );
}
