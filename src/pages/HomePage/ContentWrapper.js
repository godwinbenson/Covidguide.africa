import { Box, Text } from "@chakra-ui/core";
import React from "react";

export default function ContentWrapper({ heading, children, ...rest }) {
  return (
    <Box borderWidth="2xs" borderRadius="8px 8px 0 0" {...rest}>
      <Box borderBottomWidth="2xs">
        <Text fontWeight="semibold" px={6} py={3}>
          {heading}
        </Text>
      </Box>
      <Box py={3}>{children}</Box>
    </Box>
  );
}
