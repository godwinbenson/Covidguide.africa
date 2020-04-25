import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/core";
import React, { useContext } from "react";
import ContentWrapper from "./ContentWrapper";
import useTranslator from "../../useTranslator";
import { AppContext } from "../../AppProvider";

export default function LiveData({ ...rest }) {
  const { liveData } = useContext(AppContext);
  const { t } = useTranslator();
  const dataText = t("LiveData", { returnObjects: true });
  const colorCoding = ["yellow", "green", "red"];
  return (
    <ContentWrapper id="Live Data" heading={t("LiveData.title")} {...rest}>
      <Box p={6}>
        <SimpleGrid columns={[1, 3]} spacing={6}>
          {liveData.map(({ data, value }, index) => (
            <Box
              key={index}
              bg={`${colorCoding[index]}.100`}
              px={4}
              py={2}
              rounded="md"
            >
              <Box
                color={`${colorCoding[index]}.500`}
                textAlign="right"
                fontWeight="extrabold"
              >
                <Text lineHeight="none" fontSize="2xl">
                  &bull;
                </Text>
              </Box>
              <Stack>
                <Text fontSize="2xl" fontWeight="extrabold">
                  {value}
                </Text>
                <Text>{dataText[data]}</Text>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </ContentWrapper>
  );
}
