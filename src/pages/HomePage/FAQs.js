import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Text
} from "@chakra-ui/core";
import React from "react";
import useTranslator from "../../useTranslator";

export default function FAQs({ ...rest }) {
  const { t } = useTranslator();
  return (
    <Stack id="FAQs" spacing={6} {...rest}>
      <Text fontSize="lg" textAlign="center" fontWeight="extrabold">
        {t("FAQ.heading")}
      </Text>

      <Accordion allowToggle>
        {t("FAQ.content", { returnObjects: true }).map(item => (
          <AccordionItem defaultIsOpen={false} key={item.question} mb={2}>
            <AccordionHeader bg="gray.200">
              <Box flex="1" textAlign="left" fontSize="sm">
                {item.question}
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>{item.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Text fontSize="xs" fontWeight="bold">
        {t("FAQ.source")}
      </Text>
    </Stack>
  );
}
