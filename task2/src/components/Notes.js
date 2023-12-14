import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Grid,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./Navbar";
import NotesCard from "./NotesCard";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreate = async () => {
    const dataToSubmit = {
      title,
      description,
    };

    try {
      setLoading(true);
      await axios.post(
        "https://indoreactor-backend.vercel.app/api/v1/notes/create-notes",
        dataToSubmit
      );

      setLoading(false);
      setTitle("");
      setDescription("");
      getData();
      onClose();
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://indoreactor-backend.vercel.app/api/v1/notes/get-notes"
      );
      setData(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://indoreactor-backend.vercel.app/api/v1/notes/delete-notes/${id}`
      );

      getData(); // Refresh data after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Navbar />
      <Button
        onClick={onOpen}
        mt="40px"
        bgColor="black"
        color="white"
        _hover={{ bgColor: "black", color: "white" }}>
        Add Note
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={20}>
          <ModalHeader>Create Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center" mt="20px" mb="30px">
              <Input
                placeholder="Enter a title"
                w="80%"
                border="1px solid black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Enter a description"
                w="80%"
                border="1px solid black"
                mt="30px"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleCreate} colorScheme="blue">
              {loading ? "Add" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex margin="auto" flexWrap="wrap" gap={5} padding="20px 40px" mt="40px">
        {data.map((el) => (
          <NotesCard
            el={el}
            id={el._id}
            key={el._id}
            handleDelete={handleDelete}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Notes;
