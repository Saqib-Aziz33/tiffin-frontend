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
function TodayMenu() {
  const { token } = useSelector((state) => state.admin);

  const adminQuery = useQuery("admin/today-menu", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/admin/today-menu`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.selections;
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
              <Th>item</Th>
              <Th>Location</Th>
            </Tr>
          </Thead>
          <Tbody>
            {adminQuery.data.map((sel) => (
              <Tr key={sel._id}>
                <Td>{sel.user.name}</Td>
                <Td>{sel.meal.name}</Td>
                <Td>{sel.user.deliveryAddress}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TodayMenu;
