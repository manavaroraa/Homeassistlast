import { Box } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Card from "./Card";
import Stars from "./Stars";
import LanguageContext from "../../providers/languageProvider";

const List = (props) => {
  const { stars, data, isMy } = props;
  const { lang } = useContext(LanguageContext);

  return (
    <div>
      <Container>
        <Stars
          data={stars.stars}
          title={lang?.rating?.generalRating?.title}
          descriptions={[
            lang?.rating?.generalRating?.description1,
            lang?.rating?.generalRating?.description2,
            lang?.rating?.generalRating?.description3,
            lang?.rating?.generalRating?.description4,
            lang?.rating?.generalRating?.description5,
          ]}
        />
        <Stars
          data={stars.stars_personality}
          title={lang?.rating?.personality?.title}
          descriptions={[
            lang?.rating?.personality?.description1,
            lang?.rating?.personality?.description2,
            lang?.rating?.personality?.description3,
            lang?.rating?.personality?.description4,
            lang?.rating?.personality?.description5,
          ]}
        />
        <Stars
          data={stars.stars_ethic}
          title={lang?.rating?.workEthic?.title}
          descriptions={[
            lang?.rating?.workEthic?.description1,
            lang?.rating?.workEthic?.description2,
            lang?.rating?.workEthic?.description3,
            lang?.rating?.workEthic?.description4,
            lang?.rating?.workEthic?.description5,
          ]}
        />
        <Stars
          data={stars.stars_follow_instructions}
          title={lang?.rating?.followInstruction?.title}
          descriptions={[
            lang?.rating?.followInstruction?.description1,
            lang?.rating?.followInstruction?.description2,
            lang?.rating?.followInstruction?.description3,
            lang?.rating?.followInstruction?.description4,
            lang?.rating?.followInstruction?.description5,
          ]}
        />
        <Stars
          data={stars.stars_deadlines}
          title={lang?.rating?.time?.title}
          descriptions={[
            lang?.rating?.time?.description1,
            lang?.rating?.time?.description2,
            lang?.rating?.time?.description3,
            lang?.rating?.time?.description4,
            lang?.rating?.time?.description5,
          ]}
        />
        <Stars
          data={stars.stars_quality}
          title={lang?.rating?.quality?.title}
          descriptions={[
            lang?.rating?.quality?.description1,
            lang?.rating?.quality?.description2,
            lang?.rating?.quality?.description3,
            lang?.rating?.quality?.description4,
            lang?.rating?.quality?.description5,
          ]}
        />
        <Stars
          data={stars.stars_punctuality}
          title={lang?.rating?.punctuality?.title}
          descriptions={[
            lang?.rating?.punctuality?.description1,
            lang?.rating?.punctuality?.description2,
            lang?.rating?.punctuality?.description3,
            lang?.rating?.punctuality?.description4,
            lang?.rating?.punctuality?.description5,
          ]}
        />
      </Container>

      {data?.map((value, index) => {
        return (
          <Card
            key={index}
            data={value}
            profile={props.isMy ? value.work : value.user}
          />
        );
      })}
    </div>
  );
};

export default withRouter(List);

const Container = styled(Box)`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
`;
