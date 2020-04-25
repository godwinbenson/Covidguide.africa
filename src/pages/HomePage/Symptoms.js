import { Box, Button, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import useTranslator from "../../useTranslator";
import ContentWrapper from "./ContentWrapper";
import { AppContext } from "../../AppProvider";

export default function Symptoms({ ...rest }) {
  const { t } = useTranslator();
  const { openTestCenters } = useContext(AppContext);
  const { onOpen } = openTestCenters();
  const history = useHistory();

  function handleClick(destination) {
    if (destination === "openModal") onOpen();
    if (destination === "/checker") history.push(destination);
  }

  return (
    <Stack spacing={8} id="Symptoms">
      <ContentWrapper heading={t("Symptoms.heading")} {...rest}>
        <Box px={6} py={3}>
          <SimpleGrid columns={[2, 3]} spacing={6}>
            {t("Symptoms.content", { returnObjects: true }).map(symptom => (
              <Stack
                key={symptom.name}
                p={5}
                spacing={3}
                borderWidth="2xs"
                rounded="md"
              >
                <Icon name={symptom.icon} size="32px" />
                <Text>{symptom.name}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Box>
      </ContentWrapper>

      <Stack spacing={6} bg="green.200" px={6} py={10} rounded="lg">
        <Text fontSize="xl" fontWeight="semibold">
          {t("Symptoms.actionText")}
        </Text>

        <SimpleGrid columns={[1, 3]} spacing={[5, 3]}>
          {t("Symptoms.actionContent", { returnObjects: true }).map(
            ({ name, icon, destination, buttonText }) => (
              <Stack
                key={name}
                justifyItems="space-between"
                spacing={6}
                py={8}
                px={6}
                bg="white"
                rounded="lg"
              >
                <Icon name={icon} size="36px" />
                <Text>{name}</Text>

                <Button
                  variant="outline"
                  variantColor="green"
                  as={destination === "openChat" && "a"}
                  href={destination === "openChat" && "https://bit.ly/3bqNpPr"}
                  onClick={() => handleClick(destination)}
                >
                  {buttonText}
                </Button>
              </Stack>
            )
          )}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
