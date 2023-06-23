import { Center, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import AllBranchesMap from "./AllBranchesMap";
import axios from "axios";

function Admin() {
  const { token } = useSelector((state) => state.admin);

  const branchQuery = useQuery("branches/get-all", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/branches`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.branches;
    } catch (e) {
      throw e.response.data;
    }
  });

  if (branchQuery.isLoading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (branchQuery.isError) {
    return <Text textAlign="center">{branchQuery.error.message}</Text>;
  }

  return <AllBranchesMap data={branchQuery.data} />;
}
export default Admin;
