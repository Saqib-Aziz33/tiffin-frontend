import AdminLayout from "@/components/layout/AdminLayout";
import MenuRoleMapping from "@/components/menu/MenuRoleMapping";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Tiffin | Admin</title>
      </Head>
      <AdminLayout>
        <MenuRoleMapping />
      </AdminLayout>
    </>
  );
}
export default Page;
