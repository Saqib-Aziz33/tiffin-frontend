import {
  Center,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";

function SelectMeal() {
  const { token } = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const mealQuery = useQuery("getTodayMeal", async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/select-meal`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return data.menu;
    } catch (e) {
      throw e.response.data;
    }
  });

  const selectMealQuery = useMutation(async (meal) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/select-meal`,
        { meal: meal },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success("Thank you");
        queryClient.invalidateQueries("getTodayMeal");
      }
    } catch (e) {
      toast.error(e.response.data);
      throw e.response.data;
    }
  });

  if (mealQuery.isLoading || selectMealQuery.isLoading) {
    return (
      <Center>
        <Spinner color="green" size="xl" />
      </Center>
    );
  }

  if (mealQuery.isError)
    return (
      <Text textTransform={"uppercase"} textAlign={"center"}>
        {mealQuery.error.message}
      </Text>
    );

  if (mealQuery.isError)
    return <Text textAlign={"center"}>{mealQuery.error.message}</Text>;

  return (
    <Stack spacing={8}>
      <Heading size={"md"}>Select your today meal.</Heading>

      <HStack gap={{ base: 4, md: 8 }} flexWrap={"wrap"}>
        {mealQuery.data.map((item) => (
          <Stack
            key={item._id}
            rounded={"md"}
            boxShadow={"md"}
            p={4}
            _hover={{ boxShadow: "lg" }}
            cursor={"pointer"}
            onClick={() => selectMealQuery.mutate(item._id)}
          >
            <Heading size={"sm"}>{item.name}</Heading>
            <Text pl={2}>{item.description}</Text>
          </Stack>
        ))}
      </HStack>
    </Stack>
  );
}
export default SelectMeal;
