import React, { useContext } from "react";
import {
  Box,
  Flex,
  Stack,
  Select,
  Text,
  Divider,
  SimpleGrid,
  PseudoBox,
  Icon
} from "@chakra-ui/core";
import { AppContext } from "../AppProvider";
import useTranslator from "../useTranslator";

export default function TestCenters() {
  const { getTestCenters, openTestCenters } = useContext(AppContext);
  const { state, setState } = openTestCenters();
  const { t } = useTranslator();

  let { stateOptions, stateInfo, centersInZone, selectedZone } = getTestCenters(
    state
  );

  const regionText = t("Regions", { returnObjects: true });
  const displayZone = selectedZone ? regionText[selectedZone] : "";

  return (
    <Box>
      <Flex direction={["column", "column", "row"]}>
        <Stack
          top={0}
          flex={2}
          spacing={[8, 12]}
          position={["inherit", "inherit", "sticky"]}
          height="fit-content"
          pb={6}
        >
          <Select
            size="lg"
            placeholder={t("Emergency.placeholder")}
            value={state}
            onChange={({ target }) => setState(target.value)}
          >
            {stateOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          {stateInfo.hasOwnProperty("zone") && (
            <Stack spacing={5}>
              <Text fontSize="lg" fontWeight="semibold">
                {state} Emergency Lines
              </Text>

              <SimpleGrid columns={[2, 1]} spacing={[3, 5]}>
                {stateInfo["phones"].map((phone, index) => (
                  <PseudoBox
                    key={index}
                    p={[2, 3]}
                    as="a"
                    href={`tel:${phone}`}
                    bg="gray.100"
                    rounded="lg"
                    _hover={{
                      bg: "green.100",
                      color: "green.700",
                      cursor: "pointer"
                    }}
                  >
                    <Stack spacing={[2, 6]} isInline align="center">
                      <Icon name="phone" />
                      <Text fontSize={["sm", "lg"]} key={index}>
                        {phone}
                      </Text>
                    </Stack>
                  </PseudoBox>
                ))}
              </SimpleGrid>
            </Stack>
          )}
        </Stack>
        <Divider
          orientation="vertical"
          mx={10}
          borderColor="gray.400"
          borderStyle="dashed"
          minH="100%"
        />
        <Stack mt={[10, 0]} spacing={[8, 16]} flex={5}>
          {stateInfo.hasOwnProperty("zone") && stateInfo["centers"].length > 0 && (
            <Stack spacing={8}>
              <Box
                bg="green.100"
                py={2}
                px={4}
                rounded="lg"
                width="fit-content"
              >
                <Text fontSize="lg">
                  {t("TestingCentersIn")} {state}
                </Text>
              </Box>
              {stateInfo["centers"].map(({ name, address }, index) => (
                <React.Fragment key={index}>
                  <Stack spacing={[5, 6]} isInline>
                    <Icon name="hospital" size="32px" />
                    <Stack>
                      <Text fontSize="lg" fontWeight="semibold">
                        {name}
                      </Text>
                      <Text opacity={0.8}>{address}</Text>
                    </Stack>
                  </Stack>

                  {index + 1 !== stateInfo["centers"].length && (
                    <Divider my={6} />
                  )}
                </React.Fragment>
              ))}
            </Stack>
          )}

          {centersInZone.length > 0 && (
            <Stack spacing={8} pb={8}>
              <Box
                bg="green.100"
                py={2}
                px={4}
                rounded="lg"
                width="fit-content"
              >
                <Text fontSize="lg">
                  {t("TestingCentersIn")} {displayZone}
                </Text>
              </Box>
              {centersInZone.map(([state, centers], index) => {
                return (
                  <React.Fragment key={index}>
                    {centers.map((center, centerIndex) => (
                      <React.Fragment key={centerIndex}>
                        <Stack spacing={[5, 6]} isInline>
                          <Icon name="hospital" size="32px" />
                          <Stack>
                            <Text fontSize="lg" fontWeight="semibold">
                              {center.name}
                            </Text>
                            <Text opacity={0.8}>
                              {center.address}, {state}
                            </Text>
                          </Stack>
                        </Stack>
                        {centerIndex + 1 !== centers.length && (
                          <Divider my={6} />
                        )}
                      </React.Fragment>
                    ))}
                    {index + 1 !== centersInZone.length && <Divider my={6} />}
                  </React.Fragment>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
