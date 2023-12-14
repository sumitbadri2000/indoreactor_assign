import { Box, Text, Flex } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="black" p={4}>
      <Flex alignItems="center">
        <Text fontSize="4xl" fontWeight="bold" color="white" ml={4}>
          Notes
        </Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
