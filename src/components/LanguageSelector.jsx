import React from "react";
import { Box, Menu, Button, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";

import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({language, onSelect}) => {
  return (
    <Box mb={4} ml={2}>
      <Text mb={2} fontSize="lg">
        Language:{" "}
      </Text>
      <Menu isLazy>
        <MenuButton as={Button}>{language}</MenuButton>
        <MenuList bg="110c1b">
          {languages.map(([lang, version]) => {
            return (
              <MenuItem 
                key={lang} 
                onClick={()=> onSelect(lang)}
                color={lang === language ? "blue.400" : "gray.500"}
                bg={lang === language ? "gray.600" : "gray.900"}
                _hover={{
                  color:"blue.200"
                }}
              >
              {lang} 
              <Text as="span" color="gray.600" fontSize="sm">
               ({version})
              </Text>
            </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
