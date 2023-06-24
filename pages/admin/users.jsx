import AdminLayout from "@/components/layout/AdminLayout";
import UserRoleMapping from "@/components/users/UserRoleMapping";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Tiffin | Admin</title>
      </Head>
      <AdminLayout>
        <UserRoleMapping />
      </AdminLayout>
    </>
  );
}
export default Page;
