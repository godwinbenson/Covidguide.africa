import { Box, Select, Stack, Text } from "@chakra-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../../AppProvider";
import useTranslator from "../../useTranslator";

export default function EmergencyLines({ ...rest }) {
  return (
    <Box id="Emergency Lines" borderWidth="2xs" p={6} {...rest}>
      <EmergencyAction />
    </Box>
  );
}

export function EmergencyAction() {
  const { openTestCenters, getTestCenters } = useContext(AppContext);
  const { t } = useTranslator();

  const { onOpen, state, setState } = openTestCenters();
  let { stateOptions } = getTestCenters();
  return (
    <Stack spacing={6}>
      <Text fontSize="lg" fontWeight="bold">
        {t("Emergency.heading")}
      </Text>
      <Select
        size="lg"
        value={state}
        placeholder={t("Emergency.placeholder")}
        onChange={({ target }) => {
          setState(target.value);
          onOpen();
        }}
      >
        {stateOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Stack>
  );
}
