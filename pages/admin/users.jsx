import AdminLayout from "@/components/layout/AdminLayout";
import ListAll from "@/components/users/ListAll";
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
            All Users
          </Heading>
          <ListAll />
        </AllowedRole>
      </AdminLayout>
    </>
  );
}
export default Page;
