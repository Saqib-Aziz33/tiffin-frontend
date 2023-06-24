import {
  Box,
  Center,
  IconButton,
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
import { useQuery, useQueryClient } from "react-query";
function ListBranchUsers() {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();

  const adminQuery = useQuery("admin/my-branch", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/admin/my-branch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (e) {
      throw e.response.data;
    }
  });

  if (adminQuery.isLoading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (adminQuery.isError) {
    return <Text textAlign="center">{adminQuery.error.message}</Text>;
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
            </Tr>
          </Thead>
          <Tbody>
            {adminQuery.data.users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.deliveryAddress}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListBranchUsers;
