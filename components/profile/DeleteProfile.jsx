import { logout } from "@/store/features/userSlice";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteProfile() {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const deleteQuery = useMutation(async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE}/users/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Will miss you");
      onClose();
      dispatch(logout());
      router.push("/");
    } catch (e) {
      toast.error(e.response.data.message);
      throw e;
    }
  });

  return (
    <>
      <Button
        colorScheme="red"
        mt={12}
        onClick={onOpen}
        leftIcon={<AiFillDelete />}
      >
        Profile
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Account</AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={deleteQuery.mutate}
                isLoading={deleteQuery.isLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
