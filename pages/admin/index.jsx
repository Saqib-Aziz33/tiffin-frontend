import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Tiffin | Admin</title>
      </Head>
      <AdminLayout>
        <h2 className="text-4xl">Admin Panel</h2>
      </AdminLayout>
    </>
  );
}
export default Page;
