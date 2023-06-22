import {
  Box,
  Center,
  IconButton,
  ListItem,
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
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import NewMenu from "./NewMenu";

function Menus() {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();

  const menuQuery = useQuery("weekly-menu/get-all", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/weekly-menu`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.menus;
    } catch (e) {
      throw e.response.data;
    }
  });

  //   const deleteQuery = useMutation(async (id) => {
  //     try {
  //       const { data } = await axios.delete(
  //         `${process.env.NEXT_PUBLIC_API_BASE}/meals/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       toast.success("Meal deleted");
  //       queryClient.invalidateQueries("meals/get-all");
  //     } catch (e) {
  //       toast.error(e.response.data.messasge);
  //       throw e.response.data;
  //     }
  //   });

  if (menuQuery.isLoading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (menuQuery.isError) {
    return <Text textAlign="center">{menuQuery.error.message}</Text>;
  }

  return (
    <>
      <NewMenu />
      <Box>
        <TableContainer>
          <Table size="sm" variant="striped" colorScheme="blackAlpha">
            {/* <TableCaption>Clients</TableCaption> */}
            <Thead bg={"green.200"}>
              <Tr>
                <Th>ID</Th>
                <Th>Monday</Th>
                <Th>Tuesday</Th>
                <Th>Wednesday</Th>
                <Th>Thursday</Th>
                <Th>Friday</Th>
                <Th>Saturday</Th>
                {/* <Th>Actions</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {menuQuery.data.map((item) => (
                <Tr key={item._id}>
                  <Td title={item._id}>{item._id.slice(0, 4)}</Td>
                  <Td>
                    <UnorderedList>
                      {item.monday.map((i) => (
                        <ListItem key={i._id}>{i.name}</ListItem>
                      ))}
                    </UnorderedList>
                  </Td>
                  <Td>
                    <UnorderedList>
                      {item.tuesday.map((i) => (
                        <ListItem key={i._id}>{i.name}</ListItem>
                      ))}
                    </UnorderedList>
                  </Td>
                  <Td>
                    <UnorderedList>
                      {item.wednesday.map((i) => (
                        <ListItem key={i._id}>{i.name}</ListItem>
                      ))}
                    </UnorderedList>
                  </Td>
                  <Td>
                    <UnorderedList>
                      {item.thursday.map((i) => (
                        <ListItem key={i._id}>{i.name}</ListItem>
                      ))}
                    </UnorderedList>
                  </Td>
                  <Td>
                    <UnorderedList>
                      {item.friday.map((i) => (
                        <ListItem key={i._id}>{i.name}</ListItem>
                      ))}
                    </UnorderedList>
                  </Td>
                  <Td>
                    <UnorderedList>
                      {item.saturday.map((i) => (
                        <ListItem key={i._id}>{i.name}</ListItem>
                      ))}
                    </UnorderedList>
                  </Td>
                  {/* <Td>
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
                  </Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Menus;
