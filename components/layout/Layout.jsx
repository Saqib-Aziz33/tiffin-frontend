import { Stack } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <Stack minH={"100vh"} justifyContent={"space-between"}>
      <Navbar />
      {children}
      <Footer />
    </Stack>
  );
}
export default Layout;
