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
import NewPackage from "./NewPackage";
import { booleanConvertor } from "@/lib/helper";
import EditPackage from "./EditPackage";

function Packages() {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();

  const packageQuery = useQuery("packages/get-all", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.packages;
    } catch (e) {
      throw e.response.data;
    }
  });

  const deleteQuery = useMutation(async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE}/packages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Package deleted");
      queryClient.invalidateQueries("packages/get-all");
    } catch (e) {
      toast.error(e.response.data.messasge);
      throw e.response.data;
    }
  });

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

  if (packageQuery.isLoading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (packageQuery.isError) {
    return <Text textAlign="center">{packageQuery.error.message}</Text>;
  }

  return (
    <>
      {menuQuery.isSuccess ? <NewPackage menus={menuQuery.data} /> : null}
      <Box>
        <TableContainer>
          <Table size="sm" variant="striped" colorScheme="blackAlpha">
            {/* <TableCaption>Clients</TableCaption> */}
            <Thead bg={"green.200"}>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Perks</Th>
                <Th>Popular</Th>
                <Th>Menu</Th>
                <Th isNumeric>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {packageQuery.data.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <UnorderedList>
                      {item.perks.map((perk) => (
                        <ListItem key={perk}>{perk}</ListItem>
                      ))}
                    </UnorderedList>
                  </Td>
                  <Td>{booleanConvertor(item.popular)}</Td>
                  <Td>{item.menu}</Td>
                  <Td isNumeric>{item.price}</Td>
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
                    <EditPackage data={item} />
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

export default Packages;
