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
import NewMeal from "./NewMeal";
import EditMeal from "./EditMeal";

function Meals() {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();

  const mealQuery = useQuery("meals/get-all", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/meals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.meals;
    } catch (e) {
      throw e.response.data;
    }
  });

  const deleteQuery = useMutation(async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE}/meals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Meal deleted");
      queryClient.invalidateQueries("meals/get-all");
    } catch (e) {
      toast.error(e.response.data.messasge);
      throw e.response.data;
    }
  });

  if (mealQuery.isLoading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (mealQuery.isError) {
    return <Text textAlign="center">{mealQuery.error.message}</Text>;
  }

  return (
    <>
      <NewMeal />
      <Box>
        <TableContainer>
          <Table size="sm" variant="striped" colorScheme="blackAlpha">
            {/* <TableCaption>Clients</TableCaption> */}
            <Thead bg={"green.200"}>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mealQuery.data.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <IconButton
                      onClick={() => {
                        const del = window.confirm(
                          `Sure you want to delete ${item.name}`
                        );
                        if (del) deleteQuery.mutate(item._id);
                      }}
                      colorScheme="red"
                      variant={"ghost"}
                      icon={<AiFillDelete />}
                      size="sm"
                      isLoading={deleteQuery.isLoading}
                    />
                    <EditMeal meal={item} />
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

export default Meals;
