import { Box, Text, Grid, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import axios from "axios";

const NotesCard = ({ el, id, handleDelete }) => {
  const deleteNote = async () => {
    try {
      await axios.delete(
        `https://indoreactor-backend.vercel.app/api/v1/notes/delete-notes/${id}`
      );
      handleDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      key={id}
      bgColor="blue"
      borderRadius="10px"
      padding="40px"
      width={"20%"}
      boxShadow="md"
      mb="10px"
      position="relative"
      color="white">
      <Text fontWeight="bold" fontSize="md">
        {el.title}
      </Text>
      <Text mt="10px" fontSize="sm">
        {el.description}
      </Text>
      <IconButton
        onClick={deleteNote}
        position="absolute"
        top="10px"
        right="10px"
        colorScheme="red"
        aria-label="Delete Note"
        icon={<DeleteIcon />}
        size="sm"
        cursor="pointer"
        _hover={{ color: "red.600" }}
      />
    </Box>
  );
};

export default NotesCard;
