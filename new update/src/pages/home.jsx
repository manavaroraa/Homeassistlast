import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import { useStore, useActions } from "../configureStore";

import SectionWhatsIsHomeAssist from "../components/Home/SectionWhatIsHomeAssist";
import SectionFindSolution from "../components/Home/SectionFindSolution";
import SectionBeAssistant from "../components/Home/SectionBeAssistant";
import SectionOurServices from "../components/Home/SectionOurServices";
import LanguageContext from "../providers/languageProvider";
import HomeModal from "../components/UI/HomeModal";

const Home = () => {
  const categoriesList = useStore((state) => state.categories.categoriesList);
  const listCategories = useActions((action) => action.categories.list);
  const { lang, setLanguage, isModalOpen, setIsModalOpen } =
    useContext(LanguageContext);

  useEffect(() => {
    listCategories(lang?.code);
  }, [lang]);

  return (
    <Container>
      
      <SectionWhatsIsHomeAssist />
      {/* <SectionBenefits /> */}
      <SectionBeAssistant />
      <Box backgroundColor={"white"}>
        <SectionOurServices categories={categoriesList} />
      </Box>
      <SectionFindSolution />
      <HomeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setLanguage={setLanguage}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: ${(props) => props.theme.color.lightGray};
  /* position: relative; */
`;
