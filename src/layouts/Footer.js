import {
  Box,
  Button,
  Icon,
  SimpleGrid,
  Stack,
  Link,
  Text,
} from "@chakra-ui/core";
import React, { useContext } from "react";
import useTranslator from "../useTranslator";
import { AppContext } from "../AppProvider";

export default function Footer() {
  const { t } = useTranslator();
  const { shareButtons } = useContext(AppContext);

  return (
    <Box bg="green.100" minH={360} px={6}>
      <Box maxW="1680px" mx="auto" pb={10}>
        <Stack spacing={[8, 12]} mx="auto" maxW="720px" align="center">
          <Box rounded="full" p={10} bg="white" mt={-20} textAlign="center">
            <Icon name="corona" size="96px" />
          </Box>
          <Text fontSize="xl" fontWeight="medium">
            {t("Footer.share")}
          </Text>
          <SimpleGrid columns={[1, 2, 4]} spacing={6} w="100%">
            {shareButtons.map(({ button, icon, link, action }) => (
              <Button
                key={button}
                isFullWidth
                as="a"
                href={link}
                dataAction={action}
                size="lg"
                variantColor={button.toLowerCase()}
                leftIcon={icon}
              >
                {button}
              </Button>
            ))}
          </SimpleGrid>

          <Text fontSize="sm" mt={3}>
            Yoruba translations by{" "}
            <Link
              textDecoration="underline"
              target="_blank"
              color="green.500"
              href="https://www.twitter.com/iyayoruba"
            >
              Iya Yoruba
            </Link>
            , Igbo translations by{" "}
            <Link
              color="green.500"
              target="_blank"
              textDecoration="underline"
              href="https://www.twitter.com/ogbonnaya_mark"
            >
              Maazi Ogbonnaya
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
