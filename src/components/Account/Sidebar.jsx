import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import { Icon } from "evergreen-ui";
import queryString from "query-string";
import { withRouter, useHistory } from "react-router-dom";
import { useActions, useStore } from "../../configureStore";
import AccountIndex from "./AccountIndex";

//components
import Profile from "../../pages/profile";
import Payment from "../../pages/payments";
import GridChat from "./Chat/GridChat";
import ReviewsAccount from "../../pages/reviews";
import LanguageContext from "../../providers/languageProvider";

const Sidebar = (props) => {
  const history = useHistory();
  const query = queryString.parse(props.location.search);
  const queryTab = parseInt(query.tab);

  const getProfile = useActions((action) => action.user.getProfile);
  const loading = useStore((state) => state.user.isLoading);

  const [link, setLink] = useState(queryTab || 1);

  useEffect(() => {
    getProfile();
  }, []);

  const changeComponent = (link) => {
    switch (link) {
      case 1:
        return <AccountIndex />;
      case 2:
        return <Profile />;
      case 3:
        return <GridChat />;
      case 4:
        return <Payment tab={link} />;
      case 5:
        return <ReviewsAccount tab={link} />;
    }
  };

  const handleLink = (id) => {
    setLink(id);
    history.replace({
      pathname: "/conta",
      search: `?tab=${id}`,
      state: { some: "state" },
    });
  };

  const { lang } = useContext(LanguageContext);

  return (
    <Container>
      <CustomGrid>
        <BoxLinks>
          <MyLink
            onClick={() => handleLink(1)}
            className={link === 1 ? "active" : "not-active"}
          >
            <Icon marginRight={"1rem"} icon="home" />
            <span>{lang?.sidebar?.item1}</span>
          </MyLink>
          <MyLink
            onClick={() => handleLink(2)}
            className={link === 2 ? "active" : "not-active"}
          >
            <Icon marginRight={"1rem"} icon="person" />
            <span>{lang?.sidebar?.item2}</span>
          </MyLink>
          <MyLink
            onClick={() => handleLink(3)}
            className={link === 3 ? "active" : "not-active"}
          >
            <Icon marginRight={"1rem"} icon="chat" />
            <span>{lang?.sidebar?.item3}</span>
          </MyLink>
          <MyLink
            onClick={() => handleLink(4)}
            className={link === 4 ? "active" : "not-active"}
          >
            <Icon marginRight={"1rem"} icon="dollar" />
            <span>{lang?.sidebar?.item4}</span>
          </MyLink>
          <MyLink
            onClick={() => handleLink(5)}
            className={link === 5 ? "active" : "not-active"}
          >
            <Icon marginRight={"1rem"} icon="star" />
            <span>{lang?.sidebar?.item5}</span>
          </MyLink>
        </BoxLinks>
        {!loading && <Box>{changeComponent(link)}</Box>}
      </CustomGrid>
    </Container>
  );
};

export default withRouter(Sidebar);

const Container = styled(Box)`
  margin-top: 3rem;
`;

const CustomGrid = styled(Box)`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  grid-gap: 20px;
  @media (max-width: ${(props) => props.theme.queries.md}) {
    grid-template-columns: 1fr;
  }
`;

const BoxLinks = styled(Box)`
  border: 1px solid #e4e7eb;
  padding: 0.5rem 0.8rem;
  border-radius: 0.3rem;
  height: 290px;

  .active {
    background-color: #f4f5f7;
  }
`;

const MyLink = styled(Box)`
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: 600;
  padding: 0 1rem;
  margin: 0.5rem 0;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: 0.3s;

  :hover,
  :focus {
    background-color: #f4f5f7;
  }
`;
