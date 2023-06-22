import AdminLayout from "@/components/layout/AdminLayout";
import Meals from "@/components/meal/Meals";
import AllowedRole from "@/components/utils/AllowedRole";
import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useSelector } from "react-redux";

function Page() {
  const { roles } = useSelector((state) => state.roles);

  return (
    <>
      <Head>
        <title>Tiffin | Admin</title>
      </Head>
      <AdminLayout>
        <AllowedRole role={roles?.Admin}>
          <Heading size="md" mb={4}>
            Packages
          </Heading>
          <Meals />
        </AllowedRole>
      </AdminLayout>
    </>
  );
}
export default Page;
