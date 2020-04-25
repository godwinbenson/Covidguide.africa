import { useDisclosure } from "@chakra-ui/core";
import React, { createContext, useMemo, useState, useEffect } from "react";
import { TESTCENTERS } from "./test-centers";

const sheetyAPI =
  "https://v2-api.sheety.co/1dd096b4e98a89503d4f317493a0e7e5/covid19Stats/liveData";

const initialData = [
  { data: "confirmed", value: 782 },
  { data: "recovered", value: 125 },
  { data: "deaths", value: 25 }
];

function getTestCenters(selectedState) {
  let data = TESTCENTERS;
  let states = Object.keys(data).sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  let stateOptions = [...new Set(["Lagos", "Abuja", ...states])].map(state => ({
    label: state,
    value: state
  }));

  let stateInfo = data[selectedState] || {};
  let selectedZone = stateInfo.zone;

  let centersInZone = Object.entries(data)
    .filter(
      ([key, value]) =>
        key !== selectedState &&
        value.zone === selectedZone &&
        value.centers.length > 0
    )
    .map(([key, value]) => [key, value.centers]);

  return { stateOptions, stateInfo, centersInZone, selectedZone };
}

const shareButtons = [
  {
    button: "Facebook",
    icon: "facebook",
    link: "https://www.facebook.com/sharer/sharer.php?u=www.covidguide.africa",
    action: "share/facebook/share"
  },
  {
    button: "Twitter",
    icon: "twitter",
    link:
      "https://twitter.com/intent/tweet?text=Check%20out%20www.covidguide.africa%20to%20check%20get%20up-to-date%20information%20about%20COVID19%20and%20check%20if%20you're%20at%20risk%20or%20not.",
    action: "share/twitter/share"
  },
  {
    button: "Whatsapp",
    icon: "whatsapp-mono",
    link: "whatsapp://send?text=www.covidguide.africa",
    action: "share/whatsapp/share"
  },
  {
    button: "Linkedin",
    icon: "linkedin",
    link:
      "https://www.linkedin.com/shareArticle?mini=true&url=www.covidguide.africa&title=Let's%20Fight%20Corona%20Virus%20Together&summary=Check%20out%20www.coronaguide.org%20to%20check%20get%20up-to-date%20information%20about%20COVID19%20and%20check%20if%20you're%20at%20risk%20or%20not.&source=",
    action: "share/linkedin/share"
  }
];

export const AppContext = createContext({
  useAuthDisclosure: () => {}
});

export const AppProvider = ({ children }) => {
  const [state, setState] = useState();
  const [liveData, setLiveData] = useState(initialData);
  // const [hasErrors, setErrors] = useState(false);

  async function fetchData() {
    const res = await fetch(sheetyAPI);
    res.json().then(res => setLiveData(res.liveData));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const childContext = useMemo(() => {
    function openTestCenters(stateProp = "") {
      if (stateProp) setState(stateProp);

      return { isOpen, onClose, onOpen, state, setState };
    }

    return {
      openTestCenters,
      getTestCenters,
      shareButtons,
      liveData
    };
  }, [state, isOpen, liveData, onOpen, onClose]);

  return (
    <AppContext.Provider value={childContext}>{children}</AppContext.Provider>
  );
};
