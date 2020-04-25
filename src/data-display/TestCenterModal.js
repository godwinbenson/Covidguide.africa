import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/core";
import React, { useContext } from "react";
import { useMedia } from "../SizeDetector";
import TestCenters from "./TestCenters";
import { AppContext } from "../AppProvider";
import useTranslator from "../useTranslator";

export default function TestCenterModal() {
  const { openTestCenters } = useContext(AppContext);
  const { state, isOpen, onClose } = openTestCenters();

  const { t } = useTranslator();

  const isMobile = useMedia("(max-width: 600px)");
  return (
    <React.Fragment>
      {isMobile ? (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          scrollBehavior="inside"
          size="full"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader mr={6}>{t("Emergency.heading")}</DrawerHeader>

            <DrawerBody>
              <TestCenters {...{ state }} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="960px"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent rounded="lg">
            <ModalHeader mr={6}>{t("Emergency.heading")}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TestCenters {...{ state }} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </React.Fragment>
  );
}
