import Bills from "@/components/bills/Bills";
import AdminLayout from "@/components/layout/AdminLayout";
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
            Bills
          </Heading>
          <Bills />
        </AllowedRole>
      </AdminLayout>
    </>
  );
}
export default Page;
