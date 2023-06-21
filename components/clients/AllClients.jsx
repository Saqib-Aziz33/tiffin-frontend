import {
  Box,
  Center,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

function AllClients() {
  const { token } = useSelector((state) => state.admin);

  const clientQuery = useQuery("admin/clients", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.users;
    } catch (e) {
      throw e.response.data;
    }
  });

  if (clientQuery.isLoading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (clientQuery.isError) {
    return <Text textAlign="center">{clientQuery.error.message}</Text>;
  }

  return (
    <Box>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="blackAlpha">
          {/* <TableCaption>Clients</TableCaption> */}
          <Thead bg={"green.200"}>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Location</Th>
              <Th>Branch</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientQuery.data.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.deliveryAddress}</Td>
                <Td>{user.branch?.name || "N/A"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AllClients;
