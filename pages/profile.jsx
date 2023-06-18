import Layout from "@/components/layout/Layout";
import Head from "next/head";

export default function Page({ packages, stats }) {
  return (
    <>
      <Head>
        <title>Tiffin</title>
      </Head>

      <Layout></Layout>
    </>
  );
}
