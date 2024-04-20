import React from "react";
import { Box, Menu, Button, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";

import { LANGUAGE_VERSIONS } from "../constants";


const FileMenu = () => {
  return (
    <Box mb={4} ml={2}>
      <Text mb={2} fontSize="lg">
        Language:{" "}
      </Text>
      <Menu>
        {/* <MenuButton as={Button}>{language}</MenuButton> */}
        <MenuList bg="110c1b">

              <MenuItem 
 
                _hover={{
                  color:"blue.200"
                }}
              >

            </MenuItem>

        </MenuList>
      </Menu>
    </Box>
  );
};

export default FileMenu;
