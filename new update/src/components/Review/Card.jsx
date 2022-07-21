import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, StarIcon } from "evergreen-ui";
import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { useActions, useStore } from "../../configureStore";
import MyButton from "../RegisterWizard/MyButton";
import history from "../../utils/history";

const IconsStars = (props) => {
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
    <LineStar>
      {loop().map((star) => {
        return star;
      })}
    </LineStar>
  );
};

const Card = (props) => {
  console.log("props.data", props.data);
  const { profile, data } = props;
  const { title, description, star, updated_at } = data;
  const auth = JSON.parse(localStorage.getItem("4you_auth"));
  const isAuth = useStore((state) => state.auth.isAuthenticated);
  const deleteReview = useActions((action) => action.review.delete);

  return (
    <Content>
      <AvatarSide>
        <CustomAvatar
          name={profile?.name}
          src={
            profile?.image?.length > 0
              ? `${process.env.REACT_APP_ASSETS_BUCKET}/users/${profile?.image}`
              : null
          }
        />
        <span>{profile?.name}</span>
      </AvatarSide>
      <ContentText>
        <StarsArea>
          <div>
            <h5>Avaliação geral</h5>
            <IconsStars star={star} />
          </div>
          <span>
            Publicado em {format(new Date(updated_at), "dd/MM/yyyy kk:mm")}
          </span>
        </StarsArea>
        <TitleArea>
          <span>{title}</span>
        </TitleArea>
        <DescriptionArea>
          <span>{description}</span>
        </DescriptionArea>
      </ContentText>
      {isAuth && auth.user.id === data.user.id && (
        <ActionArea>
          <Tooltip label="Alterar" bg="gray.300" color="black" fontSize="md">
            <MyButton
              type="button"
              className="edit"
              description={""}
              iconBefore={<EditIcon />}
              click={() => {
                history.push(`/ratings?rid=${data.id}&wid=${data.work_id}`);
              }}
            />
          </Tooltip>
          <Tooltip label="Remover" bg="gray.300" color="black" fontSize="md">
            <MyButton
              type="button"
              className="delete"
              description={""}
              iconBefore={<DeleteIcon />}
              click={() => {
                deleteReview(data.id);
              }}
            />
          </Tooltip>
        </ActionArea>
      )}
    </Content>
  );
};

export default withRouter(Card);

const Content = styled(Box)`
  display: flex;
  column-gap: 1rem;
  padding: 0.5rem 0;
  margin: 1rem 0;
  @media (max-width: ${(props) => props.theme.queries.sm}) {
    flex-direction: column;
  }
`;

const CustomAvatar = styled(Avatar)`
  height: 56px;
  width: 56px;
  background-color: ${(props) => props.theme.color.green} !important;
`;

const LineStar = styled(Box)`
  display: flex;
  > svg {
    margin-right: 2px;
  }
`;

const AvatarSide = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${(props) => props.theme.queries.sm}) {
    border-right: 1px solid #e4e7eb;
  }
  @media (max-width: ${(props) => props.theme.queries.sm}) {
    border-bottom: 1px solid #e4e7eb;
  }

  grid-area: avatar;
  padding: 0 0.5rem;
  @media (min-width: ${(props) => props.theme.queries.md}) {
    min-width: 125px;
  }
  > span {
    font-weight: lighter;
    font-size: 0.75rem;
  }
`;

const ContentText = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: ${(props) => props.theme.queries.sm}) {
    margin-top: 0.5rem;
  }
`;

const StarsArea = styled(Box)`
  display: flex;
  flex-direction: column;
  h5 {
    margin: 0.25rem 0;
  }
  > span {
    font-weight: lighter;
    font-size: 0.75rem;
    text-align: end;
  }
`;
const TitleArea = styled(Box)`
  padding: 0.5rem 0;
  > span {
    font-weight: 600;
    font-size: 1.25rem;
  }
`;
const DescriptionArea = styled(Box)``;

const ActionArea = styled(Box)`
  display: flex;
  margin-left: auto;
  button {
    margin-right: 0.5rem;
    border-radius: 28px;
    background-color: ${(props) => props.theme.color.lightGray};
  }
  .edit {
    color: ${(props) => props.theme.color.blue};
    :focus {
      background-color: ${(props) => props.theme.color.blue};
      color: ${(props) => props.theme.color.lightGray};
      opacity: 0.8;
    }
    :hover {
      background-color: ${(props) => props.theme.color.blue};
      color: ${(props) => props.theme.color.lightGray};
      opacity: 0.8;
    }
  }
  .delete {
    color: ${(props) => props.theme.color.red};
    :focus {
      background-color: ${(props) => props.theme.color.red};
      color: ${(props) => props.theme.color.lightGray};
      opacity: 0.8;
    }
    :hover {
      background-color: ${(props) => props.theme.color.red};
      color: ${(props) => props.theme.color.lightGray};
      opacity: 0.8;
    }
  }
`;
