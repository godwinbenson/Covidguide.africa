import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  List,
  ListItem,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text
} from "@chakra-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { Logo } from "../layouts/Header";
import useTranslator from "../useTranslator";
import { EmergencyAction } from "./HomePage/EmergencyLines";
import { AppContext } from "../AppProvider";

export default function SymptomChecker() {
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});
  const { t } = useTranslator();
  const quiz = t("Checker.Quiz", { returnObjects: true });

  return (
    <Stack maxW="480px" mx="auto" my={8} px={6} align="center">
      <Logo />
      {showResult ? (
        <Result {...{ t, quiz, answers }} />
      ) : (
        <TakeQuiz {...{ t, quiz, setShowResult, answers, setAnswers }} />
      )}
    </Stack>
  );
}

function TakeQuiz({ t, quiz, setShowResult, answers, setAnswers, ...rest }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(answers[currentIndex]);
  }, [currentIndex]);

  function handleClick(_, destination) {
    if (destination === "Next") {
      setAnswers({ ...answers, [currentIndex]: value });
      if (currentIndex + 1 === quiz.length) {
        setShowResult(true);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
    if (destination === "Back") {
      setCurrentIndex(currentIndex - 1);
    }
  }

  let progressValue = ((currentIndex + 1) / quiz.length) * 100;

  return (
    <Stack spacing={16} {...rest} width="100%">
      <Stack spacing={6}>
        <Text textAlign="center" fontSize="lg">
          {t("Checker.heading")}
        </Text>

        <Flex
          py={8}
          px={[6, 8]}
          direction="column"
          justify="space-between"
          rounded="lg"
          minH="320px"
          borderWidth="2xs"
        >
          <Stack spacing={6}>
            <Text fontWeight="extrabold">{quiz[currentIndex].question}</Text>

            <RadioGroup
              spacing={3}
              onChange={e => setValue(e.target.value)}
              value={value}
            >
              {quiz[currentIndex].options.map(option => (
                <Radio
                  key={option.answer}
                  variantColor="green"
                  value={option.answer}
                >
                  {option.answer}
                </Radio>
              ))}
            </RadioGroup>
          </Stack>

          <Flex justify="space-between" mt={8} justifySelf="flex-end">
            {currentIndex > 0 ? (
              <Button
                variant="link"
                leftIcon="chevron-left"
                variantColor="gray"
                onClick={e => handleClick(e, "Back")}
              >
                {t("Checker.backButton")}
              </Button>
            ) : (
              <Stack />
            )}

            <Button
              w={["50%", "40%"]}
              isDisabled={!value}
              variantColor="green"
              onClick={e => handleClick(e, "Next")}
            >
              {t("Checker.nextButton")}
            </Button>
          </Flex>
        </Flex>
      </Stack>
      )}
      <Stack spacing={3} textAlign="center">
        <Progress color="green" rounded="full" value={progressValue} />
        <Text fontSize="xs" fontWeight="extrabold">
          {`${currentIndex + 1}/${quiz.length}`}
        </Text>
      </Stack>
    </Stack>
  );
}

function Result({ t, answers, quiz, ...rest }) {
  let result = getResult(answers, quiz);
  let highRiskContent = t("Checker.HighRisk", { returnObjects: true });
  let lowRiskContent = t("Checker.LowRisk", { returnObjects: true });
  let { headline, description, prescription } =
    result === "high" ? highRiskContent : lowRiskContent;
  const { shareButtons } = useContext(AppContext);

  return (
    <Stack spacing={8}>
      <Stack px={6} pb={8} borderWidth="2xs" rounded="md" {...rest}>
        <Stack align="center">
          <Icon name="high-risk" size="180px" />

          <Text
            fontSize="lg"
            color={result === "high" ? "red.500" : "green.500"}
            fontWeight="extrabold"
          >
            {headline}
          </Text>
          {description && (
            <Text py={6} textAlign="center">
              {description}
            </Text>
          )}
        </Stack>

        {prescription.hasOwnProperty("title") && (
          <Stack py={6} spacing={5}>
            <Text fontWeight="bold">{prescription.title}</Text>
            <List fontSize="sm" opacity={0.8} spacing={3} styleType="disc">
              {prescription.content.map(item => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </List>
          </Stack>
        )}

        <Stack spacing={12} mt={6} align="center">
          <Stack spacing={5}>
            <EmergencyAction />
          </Stack>

          <Button
            variant="outline"
            as="a"
            href="https://bit.ly/3bqNpPr"
            variantColor="green"
          >
            {t("Checker.DoctorChat")}
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={4} align="center" textAlign="center">
        <Text fontSize="xs">{t("Checker.FamilyAndFriends")}</Text>
        <Stack spacing={6} isInline align="center">
          {shareButtons.map(({ icon, link }) => (
            <IconButton
              as="a"
              href={link}
              key={icon}
              bg="transparent"
              icon={icon}
              size="lg"
            />
          ))}
        </Stack>
      </Stack>

      <Box p={6} bg="gray.100" textAlign="center" fontSize="xs" rounded="lg">
        {t("Checker.Disclaimer")}
      </Box>
    </Stack>
  );
}

function getResult(answers = {}, quiz = []) {
  let result = Object.entries(answers).map(([key, value]) => {
    let { options } = quiz[key];
    let selectedOption = options.find(({ answer }) => answer === value);
    return selectedOption.risk;
  });

  let highResults = result.filter(item => item === "high");
  let isHighRisk =
    result.slice(0, 3).includes("high") || highResults.length > quiz.length / 2;

  return isHighRisk ? "high" : "low";
}
