import Admin from "@/components/admin/Admin";
import AdminLayout from "@/components/layout/AdminLayout";
import { Text } from "@chakra-ui/react";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Tiffin | Admin</title>
      </Head>
      <AdminLayout>
        <Admin />
        <Text textAlign={"center"} mt={4}>
          All Branches
        </Text>
      </AdminLayout>
    </>
  );
}
export default Page;
