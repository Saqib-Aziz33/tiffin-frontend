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
import moment from "moment";

function Bills() {
  const { token } = useSelector((state) => state.admin);

  const billQuery = useQuery("meals/get-all", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/bills`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.bills;
    } catch (e) {
      throw e.response.data;
    }
  });

  if (billQuery.isLoading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (billQuery.isError) {
    return <Text textAlign="center">{billQuery.error.message}</Text>;
  }

  return (
    <>
      <Box>
        <TableContainer>
          <Table size="sm" variant="striped" colorScheme="blackAlpha">
            {/* <TableCaption>Clients</TableCaption> */}
            <Thead bg={"green.200"}>
              <Tr>
                <Th>ID</Th>
                <Th>User</Th>
                <Th>Gateway</Th>
                <Th>Date</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {billQuery.data.map((bill) => (
                <Tr key={bill._id}>
                  <Td>{bill._id}</Td>
                  <Td>{bill.user.name}</Td>
                  <Td>{bill.bill.paymentMethod}</Td>
                  <Td>{moment(bill.bill.date).format("DD/MM/YY")}</Td>
                  <Td isNumeric>{bill.bill.amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Bills;
