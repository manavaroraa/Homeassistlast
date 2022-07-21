import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { useStore, useActions } from "../configureStore";
import LanguageContext from "../providers/languageProvider";

const TermsOfUse = () => {
  const item = useStore((store) => store.staticPages.item);
  const getList = useActions((action) => action.staticPages.getList);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    getList();
  }, []);

  return (
    <Container>
      <Title>
        <FormattedMessage
          id="app.footerTermosDeUso"
          defaultMessage={lang?.navbar?.termsConditions}
        />
      </Title>
      <div
        dangerouslySetInnerHTML={{
          __html: item && item[0] ? item[0].terms : "",
        }}
      />
    </Container>
  );
};

export default TermsOfUse;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: auto !important;
  padding: 2rem 1em;
  min-height: 500px;
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;
