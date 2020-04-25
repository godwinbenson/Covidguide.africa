import { Icon, PseudoBox, SimpleGrid, Stack, Text } from "@chakra-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import useTranslator from "../../useTranslator";
import { AppContext } from "../../AppProvider";

export default function QuickActions({ ...rest }) {
  const { t } = useTranslator();
  const { openTestCenters } = useContext(AppContext);
  const { onOpen } = openTestCenters();
  const history = useHistory();

  function handleClick(destination) {
    if (destination === "openModal") onOpen();
    if (destination === "/checker") history.push(destination);
  }

  return (
    <SimpleGrid columns={[2, 4]} spacing={12} {...rest}>
      {t("Homepage.quickActions", { returnObjects: true }).map(
        ({ icon, title, destination }) => (
          <PseudoBox
            p={3}
            key={title}
            as={destination === "openChat" && "a"}
            href={destination === "openChat" && "https://bit.ly/3bqNpPr"}
            onClick={() => handleClick(destination)}
            rounded="lg"
            _hover={{
              cursor: "pointer",
              color: "gray.800",
              bg: "gray.100"
            }}
          >
            <Stack spacing={3} align="center">
              <Icon name={icon} color="green.500" size="64px" />
              <Text textAlign="center">{title}</Text>
            </Stack>
          </PseudoBox>
        )
      )}
    </SimpleGrid>
  );
}
