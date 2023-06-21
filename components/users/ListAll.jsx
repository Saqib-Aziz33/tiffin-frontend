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
import { useMutation, useQuery } from "react-query";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

function ListAll() {
  const { token } = useSelector((state) => state.admin);

  const adminQuery = useQuery("admin/clients", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/admin`,
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

  const deleteQuery = useMutation(async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE}/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      adminQuery.refetch();
    } catch (e) {
      toast.error(e.response.data.messasge);
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
              <Th>Role</Th>
              <Th>Branch</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {adminQuery.data.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role.name}</Td>
                <Td>{user.branch?.name || "N/A"}</Td>
                <Td>
                  <IconButton
                    onClick={() => deleteQuery.mutate(user._id)}
                    colorScheme="red"
                    variant={"ghost"}
                    icon={<AiFillDelete />}
                    size="sm"
                    isLoading={deleteQuery.isLoading}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListAll;
