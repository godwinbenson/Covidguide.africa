import { Box, Flex, Grid, Stack } from "@chakra-ui/core";
import React from "react";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Definition from "./Definition";
import EmergencyLines from "./EmergencyLines";
import FAQs from "./FAQs";
import JumboTron from "./JumboTron";
import LiveData from "./LiveData";
import MythsAndFacts from "./MythsAndFacts";
import Prevention from "./Prevention";
import QuickActions from "./QuickActions";
import QuickLinks from "./QuickLinks";
import Symptoms from "./Symptoms";

export default function HomePage() {
  return (
    <Box>
      <Header />
      <JumboTron />
      <Flex mt={16} maxW="1680px" mx="auto">
        <QuickLinks />
        <Stack spacing={16} flex={1} mx={[6, 10]} mb={32}>
          <QuickActions />

          <Grid
            templateColumns={["none", "none", "none", "none", "1.5fr 1fr"]}
            columnGap={10}
            rowGap={12}
          >
            <Stack spacing={12}>
              <LiveData />
              <Definition />
              <Symptoms />
              <Prevention />
              <MythsAndFacts />
            </Stack>
            <Stack spacing={16}>
              <EmergencyLines />
              <FAQs />
            </Stack>
          </Grid>
        </Stack>
      </Flex>
      <Footer />
    </Box>
  );
}
