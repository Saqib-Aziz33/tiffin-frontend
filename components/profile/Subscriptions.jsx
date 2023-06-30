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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { booleanConvertor } from "@/lib/helper";
import { FiExternalLink } from "react-icons/fi";

function Subscriptions() {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/subscription`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data.subscriptions);
    } catch (e) {
      setError(e.response.data.message);
      throw e.response.data;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // User Interface

  if (loading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Text textAlign="center">{error}</Text>;
  }

  return (
    <Box>
      <TableContainer fontSize={{ base: "12px", md: "16px" }}>
        <Table variant="simple">
          <TableCaption>Offers history you have subscribed.</TableCaption>
          <Thead>
            <Tr>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Active</Th>
              <Th>Receipt</Th>
              <Th isNumeric>Amout</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>{moment(item.from).format("D MMMM, YYYY")}</Td>
                <Td>{moment(item.to).format("D MMMM, YYYY")}</Td>
                <Td>
                  {booleanConvertor(
                    moment(item.to).isAfter(moment(new Date()))
                  )}
                </Td>
                <Td>
                  <a href={item.bill.receipt} target="_blank">
                    <FiExternalLink />
                  </a>
                </Td>
                <Td isNumeric>{item.bill.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default Subscriptions;
