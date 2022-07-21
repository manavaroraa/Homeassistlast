import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import { Button } from "@chakra-ui/react";

export default function HomeModal({
  isModalOpen,
  setIsModalOpen,
  setLanguage,
}) {
  function handleChangeLanguage() {
    const langValue = document.querySelector("#modalLang").value;
    setLanguage(langValue);
    setIsModalOpen(false);
  }

  if (!isModalOpen) {
    return null;
  }

  return (
    <ModalContainer className={isModalOpen && "active popup_model"}>
      <ModalOverlay>
        <ModalContent>
          <span>Selecione o Idioma / Select the language</span>

          <LanguageSelector id="modalLang">
            <option value="pt">Português</option>
            <option value="pt-br">Português (Brasil)</option>
            <option value="en">English</option>
          </LanguageSelector>
          <Button
            height="48px"
            cursor="pointer"
            style={{
              backgroundColor: theme.color.green,
              border: `2px solid ${theme.color.green}`,
              color: theme.color.white,
              fontSize: "1rem",
              margin: "1rem auto",
            }}
            onClick={handleChangeLanguage}
          >
            Seleet
          </Button>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.2s;
  opacity: 1;

  .active {
    display: hidden;
    opacity: 0;
  }
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 30rem;
  /* height: 30rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 4rem 0;

  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.45);
  margin: 4rem auto;

  span {
    width: 90%;
    margin: 0 auto;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const LanguageSelector = styled.select`
  background: ${(props) => props.theme.color.green};
  color: #fff;
  font-size: 1rem;
  height: 2.5rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;

  option {
    border: none;
  }
`;
