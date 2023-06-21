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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import NewBranch from "./NewBranch";

function AllBranches() {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();

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

  const deleteQuery = useMutation(async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE}/branches/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      queryClient.invalidateQueries("branches/get-all");
    } catch (e) {
      toast.error(e.response.data.message);
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

  return (
    <>
      <NewBranch />
      <Box>
        <TableContainer>
          <Table size="sm" variant="striped" colorScheme="blackAlpha">
            {/* <TableCaption>Clients</TableCaption> */}
            <Thead bg={"green.200"}>
              <Tr>
                <Th>Name</Th>
                <Th>address</Th>
                <Th>admin</Th>
                <Th>delivery boy</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {branchQuery.data.map((branch) => (
                <Tr key={branch._id}>
                  <Td>{branch.name}</Td>
                  <Td>{branch.address}</Td>
                  <Td>{branch.admin?.name || "N/A"}</Td>
                  <Td>{branch.deliveryBoy?.name || "N/A"}</Td>
                  <Td>
                    <IconButton
                      onClick={() => {
                        const del = window.confirm(
                          `Sure you want to delete ${branch.name}`
                        );
                        if (del) deleteQuery.mutate(branch._id);
                      }}
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
    </>
  );
}

export default AllBranches;
