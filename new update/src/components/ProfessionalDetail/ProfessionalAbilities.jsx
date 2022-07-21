import React, { useContext } from "react";
import styled from "styled-components";
import { Box, Text, Button, ModalCloseButton } from "@chakra-ui/react";
import { Icon as EverIcon } from "evergreen-ui";
import LanguageContext from "../../providers/languageProvider";

//assets
import pet from "../../assets/icons/professionalDetail/pet.svg";
import smoking from "../../assets/icons/professionalDetail/smoking.svg";
import carPermission from "../../assets/icons/professionalDetail/car_permission.svg";

const AbilityRow = (props) => {
  return (
    <>
      {props.modal ? (
        <RowModal key={props.key}>
          <Text>{props.label}</Text>
        </RowModal>
      ) : (
        <Row key={props.key}>
          {props.img ? (
            <img height="24px" width="24px" src={props.img} />
          ) : (
            <EverIcon size="24px" icon={props.icon} />
          )}
          <Text>{props.label}</Text>
        </Row>
      )}
    </>
  );
};

const ProfessionalAbilities = (props) => {
  const { lang } = useContext(LanguageContext);
  return (
    <Container>
      <Title as="h3" id="seeAll">
        Sobre o profissional
      </Title>
      <Grid>
        {props?.data?.schooling && (
          <AbilityRow
            key={Math.random()}
            icon="learning"
            label={props?.data?.schooling}
          />
        )}
        {props?.languages?.length > 0 && (
          <AbilityRow
            key={Math.random()}
            icon="translate"
            label={
              props?.languages?.length > 1
                ? props?.languages?.map((item) => item?.language)?.join(", ")
                : props?.languages?.map((item) => item?.language)
            }
          />
        )}
        {props?.data?.animal_coexistence && (
          <AbilityRow
            key={Math.random()}
            img={pet}
            label={"Convive com animais de estimação"}
          />
        )}
        {props?.data?.smoking > 0 && (
          <AbilityRow
            key={Math.random()}
            img={smoking}
            label={lang?.accountProfile?.aditionalInfo?.smoker}
          />
        )}
        {props?.data?.car_permission > 0 && (
          <AbilityRow
            key={Math.random()}
            img={carPermission}
            label={"Habilitado"}
          />
        )}
      </Grid>
    </Container>
  );
};

export default ProfessionalAbilities;

const Container = styled(Box)`
  padding: 2rem 0;
`;

const Title = styled(Box)`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
`;

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${(props) => props.theme.queries.sm}) {
    grid-template-columns: 1fr;
  }
`;

//ability row

const Row = styled(Box)`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  p {
    margin: 0 0 0 1rem;
  }

  @media (max-width: ${(props) => props.theme.queries.sm}) {
    flex-direction: row-reverse;
    justify-content: space-between;

    p {
      margin: 0 0 0 0rem;
    }
  }
`;

const RowModal = styled(Box)`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  p {
    margin: 0 0 1.5rem 0rem;
  }

  border-bottom: 1px solid #ddd;
`;
