import { Box } from "@chakra-ui/react";
import React from "react";
// import { Rating, RatingView } from 'react-simple-star-rating'
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { InfoSignIcon, StarEmptyIcon, StarIcon, Tooltip } from "evergreen-ui";

const StarInput = (props) => {
  const { label, value, err, onChange } = props;

  return (
    <Box>
      {label && (
        <ContainerInput>
          <Label>{label}</Label>
          {props.infoMessage && (
            <Tooltip content={props.infoMessage}>
              <IconInfo />
            </Tooltip>
          )}
        </ContainerInput>
      )}
      <ReactStars
        value={value}
        count={5}
        onChange={onChange}
        size={32}
        fullIcon={<StarIcon />}
        emptyIcon={<StarEmptyIcon />}
        activeColor="#ffd700"
      />
      {err && <MessageError>{err}</MessageError>}
    </Box>
  );
};

export default StarInput;

const Label = styled.label`
  color: ${(props) => props.theme.color.green};
  font-weight: bold;
`;
const ContainerInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  margin-left: 5px;
  color: ${(props) => props.theme.color.red};
  font-size: 1em;
`;
const IconInfo = styled(InfoSignIcon)`
  margin-left: 10px;
`;
