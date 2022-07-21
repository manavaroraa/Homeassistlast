import { Box } from "@chakra-ui/react";
import { Icon, StarEmptyIcon, StarIcon } from "evergreen-ui";
import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import LanguageContext from "../../providers/languageProvider";

const Icons = (props) => {
  const loop = () => {
    let stars = [];
    for (let i = 1; i < 6; i++) {
      if (props.star >= i)
        stars.push(<StarIcon marginRight={"1rem"} color="warning" />);
      else stars.push(<StarIcon marginRight={"1rem"} color="disabled" />);
    }
    return stars;
  };

  return (
    <Line>
      {loop().map((star) => {
        return star;
      })}
      <span>{props.qtd || 0}</span>
    </Line>
  );
};

const Stars = (props) => {
  const avground = Math.round(props.data?.avg);

  const { lang } = useContext(LanguageContext);

  return (
    <Container>
      <h3>{props.title}</h3>
      <AVG>
        <span>{lang?.rating?.generalRating?.subtitle}</span>
        <Icons star={avground} qtd={avground} />
      </AVG>
      <Details>
        <div>
          <span>
            {props.descriptions?.length > 0 ? props.descriptions[0] : ""}
          </span>
          <Icons star={1} qtd={props.data?.one} />
        </div>
        <div>
          <span>
            {props.descriptions?.length > 1 ? props.descriptions[1] : ""}
          </span>
          <Icons star={2} qtd={props.data?.two} />
        </div>
        <div>
          <span>
            {props.descriptions?.length > 2 ? props.descriptions[2] : ""}
          </span>
          <Icons star={3} qtd={props.data?.three} />
        </div>
        <div>
          <span>
            {props.descriptions?.length > 3 ? props.descriptions[3] : ""}
          </span>
          <Icons star={4} qtd={props.data?.four} />
        </div>
        <div>
          <span>
            {props.descriptions?.length > 4 ? props.descriptions[4] : ""}
          </span>
          <Icons star={5} qtd={props.data?.five} />
        </div>
      </Details>
    </Container>
  );
};

export default withRouter(Stars);

const Container = styled(Box)`
  border-radius: 0.3rem;
  padding: 1.2rem 0;
  h3 {
    margin: 0.5rem 0;
  }
`;

const Line = styled(Box)`
  display: flex;
  > svg {
    margin-right: 2px;
  }
  > span {
    margin-left: 0.75rem;
  }
`;

const AVG = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e7eb;
  svg {
    height: 20px;
    width: 20px;
  }
`;

const Details = styled(Box)`
  padding-left: 1rem;
  > div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e4e7eb;
    span {
      font-size: 0.85rem;
    }
  }
  svg {
    height: 14px;
    width: 14px;
  }
`;
