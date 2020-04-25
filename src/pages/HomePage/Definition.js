import { Box, Divider, Stack, Text } from "@chakra-ui/core";
import React from "react";
import ContentWrapper from "./ContentWrapper";
import useTranslator from "../../useTranslator";

export default function Definition({ ...rest }) {
  const { t } = useTranslator();
  return (
    <ContentWrapper
      id="What is Corona Virus"
      heading={t("Definition.heading")}
      {...rest}
    >
      <Box>
        <Text px={6} py={2}>
          {t("Definition.description")}
        </Text>
        <Divider />
        <Stack px={6} py={2}>
          <Text fontWeight="semibold">{t("Definition.subHeading")}</Text>
          <Text>{t("Definition.howItSpreads")}</Text>
        </Stack>
      </Box>
    </ContentWrapper>
  );
}
