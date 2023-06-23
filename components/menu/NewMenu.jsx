import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

function NewMenu({ menus }) {
  const { token } = useSelector((state) => state.admin);
  const queryClient = useQueryClient();
  // create options format
  const options = menus.map((item) => ({ value: item._id, label: item.name }));

  // selected menu
  const initialState = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };
  const [menu, setMenu] = useState(initialState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const createQuery = useMutation(async (menuData) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/weekly-menu`,
        menuData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Menu Created");
        onClose();
        // refetch latest data
        setMenu(initialState);
        queryClient.invalidateQueries("weekly-menu/get-all");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  });

  return (
    <>
      <Button
        leftIcon={<AiOutlinePlus />}
        mb={4}
        colorScheme="green"
        display={"block"}
        ml={"auto"}
        onClick={onOpen}
      >
        Menu
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Weekly menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={1}>
              <Stack id="menu-monday">
                <Text>Monday</Text>
                <Select
                  defaultValue={menu.monday}
                  isMulti
                  name="monday"
                  onChange={(value) => setMenu({ ...menu, monday: value })}
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="monday"
                />
              </Stack>
              <Stack id="menu-tuesday">
                <Text>Tuesday</Text>
                <Select
                  defaultValue={menu.tuesday}
                  isMulti
                  name="monday"
                  onChange={(value) => setMenu({ ...menu, tuesday: value })}
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="monday"
                />
              </Stack>
              <Stack id="menu-wednesday">
                <Text>Wednesday</Text>
                <Select
                  defaultValue={menu.wednesday}
                  isMulti
                  name="monday"
                  onChange={(value) => setMenu({ ...menu, wednesday: value })}
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="monday"
                />
              </Stack>
              <Stack id="menu-thursday">
                <Text>Thursday</Text>
                <Select
                  defaultValue={menu.thursday}
                  isMulti
                  name="monday"
                  onChange={(value) => setMenu({ ...menu, thursday: value })}
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="monday"
                />
              </Stack>
              <Stack id="menu-friday">
                <Text>Friday</Text>
                <Select
                  defaultValue={menu.friday}
                  isMulti
                  name="friday"
                  onChange={(value) => setMenu({ ...menu, friday: value })}
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="monday"
                />
              </Stack>
              <Stack id="menu-saturday">
                <Text>Saturday</Text>
                <Select
                  defaultValue={menu.saturday}
                  isMulti
                  name="saturday"
                  onChange={(value) => setMenu({ ...menu, saturday: value })}
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="monday"
                />
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              isLoading={createQuery.isLoading}
              onClick={() => {
                const convertedData = {};
                for (const key in menu) {
                  if (menu.hasOwnProperty(key)) {
                    convertedData[key] = menu[key].map((item) => item.value);
                  }
                }
                createQuery.mutate(convertedData);
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default NewMenu;
