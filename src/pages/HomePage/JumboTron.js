import { Box, Heading, Select, Stack } from "@chakra-ui/core";
import React from "react";
import useTranslator from "../../useTranslator";

export default function JumboTron({ ...rest }) {
  const { t, changeLang, lang, supportedLang } = useTranslator();
  return (
    <Box bg="green.500" pt={24} pb={20} px={6} {...rest}>
      <Stack spacing={6} textAlign="center">
        <Heading color="white" fontWeight="extrabold" fontSize="5xl">
          {t("Jumbotron.title")}
        </Heading>
        <Select
          size="lg"
          value={lang}
          onChange={({ target }) => changeLang(target.value)}
          placeholder="Select language"
          rootProps={{ maxW: "280px", mx: "auto" }}
        >
          {supportedLang.map((lg, index) => (
            <option key={index} value={lg.value}>
              {lg.label}
            </option>
          ))}
        </Select>
      </Stack>
    </Box>
  );
}
