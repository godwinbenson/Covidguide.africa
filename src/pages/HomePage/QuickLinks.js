import { Box, PseudoBox, Stack } from "@chakra-ui/core";
import React from "react";
import useTranslator from "../../useTranslator";

export default function QuickLinks({ ...rest }) {
  const { t } = useTranslator();

  const handleClick = section_id => {
    let jobSection = document.getElementById(section_id);
    jobSection.scrollIntoView({
      block: "start",
      inline: "start",
      behavior: "smooth"
    });
  };
  return (
    <Box
      position="sticky"
      id="Quick Links"
      top={20}
      d={["none", "none", "none", "block"]}
      height="fit-content"
      maxW="280px"
      mb={16}
      {...rest}
    >
      <Stack>
        {t("Homepage.quickLinks", { returnObjects: true }).map(
          ({ link, id }) => (
            <PseudoBox
              key={id}
              pl={10}
              py={2}
              pr={6}
              onClick={() => handleClick(id)}
              borderRadius="0 16px 16px 0"
              fontWeight="medium"
              color="green.500"
              _hover={{
                bg: "green.100",
                cursor: "pointer",
                color: "gray.700"
              }}
            >
              {link}
            </PseudoBox>
          )
        )}
      </Stack>
    </Box>
  );
}
