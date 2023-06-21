import AllBranches from "@/components/branches/AllBranches";
import AdminLayout from "@/components/layout/AdminLayout";
import AllowedRole from "@/components/utils/AllowedRole";
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
          <AllBranches />
        </AllowedRole>
      </AdminLayout>
    </>
  );
}
export default Page;
