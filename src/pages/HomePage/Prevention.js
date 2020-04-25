import { Icon, Stack, Text } from "@chakra-ui/core";
import React from "react";
import useTranslator from "../../useTranslator";
import ContentWrapper from "./ContentWrapper";

export default function Prevention({ ...rest }) {
  const { t } = useTranslator();
  return (
    <ContentWrapper
      id="Prevention"
      mt={12}
      heading={t("Prevention.heading")}
      {...rest}
    >
      <Stack spacing={[8, 6]} p={6}>
        {t("Prevention.content", { returnObjects: true }).map(item => (
          <Stack key={item.title} spacing={4} flexDirection={["column", "row"]}>
            <Icon color="green.500" name={item.icon} size="56px" />
            <Stack ml={[0, 6]}>
              <Text fontWeight="semibold">{item.title}</Text>
              <Text opacity={0.8}>{item.description}</Text>
            </Stack>
          </Stack>
        ))}
        <Text fontSize="xs" fontWeight="bold">
          {t("Prevention.source")}
        </Text>
      </Stack>
    </ContentWrapper>
  );
}
