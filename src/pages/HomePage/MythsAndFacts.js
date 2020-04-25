import { Badge, Box, SimpleGrid, Stack, Text } from "@chakra-ui/core";
import React from "react";
import useTranslator from "../../useTranslator";

export default function MythsAndFacts({ ...rest }) {
  const { t } = useTranslator();
  return (
    <Stack
      id="Debunking Myths"
      px={6}
      py={10}
      bg="blue.50"
      rounded="lg"
      {...rest}
    >
      <Text fontSize="lg" fontWeight="semibold">
        {t("MythAndFacts.heading")}
      </Text>
      <SimpleGrid columns={[1, 2]} spacing={3} mt={3}>
        {t("MythAndFacts.content", { returnObjects: true }).map(
          (item, index) => (
            <Stack key={index} mt={3} spacing={6} p={5} bg="white" rounded="lg">
              <Stack>
                <Box>
                  <Badge
                    py={1}
                    px={2}
                    variantColor="red"
                    textTransform="uppercase"
                  >
                    {item.false}
                  </Badge>
                </Box>
                <Text fontSize="sm" fontWeight="bold">
                  {item.myth}
                </Text>
              </Stack>
              <Stack>
                <Box>
                  <Badge
                    py={1}
                    px={2}
                    variantColor="green"
                    textTransform="uppercase"
                  >
                    {item.true}
                  </Badge>
                </Box>
                <Text fontSize="sm">{item.fact}</Text>
              </Stack>
            </Stack>
          )
        )}
      </SimpleGrid>
    </Stack>
  );
}
