import Contact from "@/components/landing-page/Contact";
import Hero from "@/components/landing-page/Hero";
import Packages from "@/components/landing-page/Packages";
import Stats from "@/components/landing-page/Stats";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps() {
  const { data: packData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE}/packages`
  );
  const { data: infoData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE}/services/info`
  );
  return { props: { packages: packData.packages, stats: infoData } };
}

export default function Home({ packages, stats }) {
  return (
    <>
      <Head>
        <title>Tiffin</title>
      </Head>

      <Layout>
        <Hero />
        <Stats stats={stats} />
        <Packages packages={packages} />
        <Contact />
      </Layout>
    </>
  );
}
