import React, { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Box, Text } from "@chakra-ui/react";
import useWindowSize from "../../hooks/useWIndowSize";
import MenuHome from "../../components/Home/MenuHome";
import ModalOurServicesMobile from "../../components/Home/ModalOurServicesMobile";

import house from "../../assets/img/service-pic1.png";
import family from "../../assets/img/service-pic2.png";
import forYou from "../../assets/img/service-pic3.png";
import { CrossIcon } from "evergreen-ui";
import LanguageContext from "../../providers/languageProvider";

const SectionOurServices = (props) => {
  const { lang } = useContext(LanguageContext);
  const { width } = useWindowSize();
  const [select, setSelect] = useState(null);

  const SectionBackButtons = (props) => {
    return (
      <ContainerBackButtons className={"back-buttons"}>
          {/* {!(props.select === 1) && (
            <img
            className="ImgFlex"
              draggable={false}
              src={house}
              alt="serviço para sua casa"
              onClick={() => {
                props.clickSelect(1);
              }}
            />
          )}
          {!(props.select === 2) && (
            <img
            className="ImgFlex"
              draggable={false}
              src={family}
              alt="serviço para sua familia"
              onClick={() => {
                props.clickSelect(2);
              }}
            />
          )}
          {!(props.select === 3) && (
            <img
            className="ImgFlex"
              draggable={false}
              src={forYou}
              alt="serviço para você"
              onClick={() => {
                props.clickSelect(3);
              }}
            />
          )} */}
        <CrossIcon
          color="disabled"
          onClick={() => {
            props.clickSelect(null);
          }}
        ></CrossIcon>
      </ContainerBackButtons>
    );
  };
  const scrollToTarget = () => {
    // window.scrollTo({
    //     top: document?.getElementById("whatIs")?.offsetTop - 800,
    //     behavior: "smooth",
    // });
  };

  const clickSelect = (s) => {
    setSelect(s);
    scrollToTarget();
  };

  return (
    <>

      <section class="our-service">
      <div class="container-fluid">
        <div class="row"  select={select}>
          <div class="col-md-12">
            <div class="service-txt">
              <h3>Services</h3>
              <p>Select Your Service</p>
            </div>
          </div>
        </div>
        </div>
        <div class="our-service2">
        <div class="container-fluid">
        <div class="row"  select={select}>
          <div class="col-md-4">
            <div class="service">
              <div class="service-img1">
              <Card
            onClick={() => {
              if (select !== 1) {
                setSelect(1);
                scrollToTarget();
              }
            }}
            className={select === 1 && "cardSelected"}
            visible={select === null || select === 1}
            select={select}
          >
            <CardContainer>
            <SectionBackButtons
                select={select}
                clickSelect={clickSelect}
              ></SectionBackButtons>
              <img
                draggable={false}
                width="100%"
                src={house}
                alt="serviço para sua casa"
              />
            </CardContainer>
          </Card>
                  <div class="pic-txt">
                <h3>HOME SERVICES</h3>
                <p>
                Trusted professional services for
your home, property and
vehicles.
                </p>
              </div>
              </div>          
             
            </div>
          </div>
          <div class="col-md-4">
            <div class="service pic2">
            <div class="service-img1">
            <Card
            onClick={() => {
              if (select !== 2) {
                setSelect(2);
                scrollToTarget();
              }
            }}
            className={select === 2 && "cardSelected"}
            visible={select === null || select === 2}
            select={select}
          >
            <CardContainer>
            <SectionBackButtons
                select={select}
                clickSelect={clickSelect}
              ></SectionBackButtons>
              <img
                draggable={false}
                src={family}
                alt="serviço para sua familia"
              />
             
            </CardContainer>
          </Card>
              </div>
              <div class="pic-txt">
                <h3>FAMILY SERVICES</h3>
                <p>
                Trusted professional services for
your family, pets and loved ones.
                </p>
              </div>
              
            </div>
          </div>
          <div class="col-md-4">
            <div class="service">
              <div class="pic-txt">
                <h3>CARE SERVICES</h3>
                <p>
                Trusted professional services for your personal care and well-being.
                </p>
              </div>
              <Card
            onClick={() => {
              if (select !== 3) {
                setSelect(3);
                scrollToTarget();
              }
            }}
            className={select === 3 && "cardSelected"}
            visible={select === null || select === 3}
            select={select}
          >
            <CardContainer>
              <SectionBackButtons
                select={select}
                clickSelect={clickSelect}
              ></SectionBackButtons>
              <img draggable={false} src={forYou} alt="serviço para você" />
            </CardContainer>
          </Card>
            </div>
          </div>
        </div>
        </div>
        </div>
       
      </section>

      <MySection as="section">
        {/* <Title>{lang?.ourServices?.title}</Title> 
      <Description>{lang?.ourServices?.subtitle}</Description>  */}
        {/* <Grid select={select}>
          <Card
            onClick={() => {
              if (select !== 1) {
                setSelect(1);
                scrollToTarget();
              }
            }}
            className={select === 1 && "cardSelected"}
            visible={select === null || select === 1}
            select={select}
          >
            <CardContainer>
              <SectionBackButtons
                select={select}
                clickSelect={clickSelect}
              ></SectionBackButtons>
              <img
                draggable={false}
                width="100%"
                src={house}
                alt="serviço para sua casa"
              />

              <TitleCard>{lang?.ourServices?.homeServices?.title}</TitleCard>
              <DescriptionCard>
                {lang?.ourServices?.homeServices?.text}
              </DescriptionCard>
            </CardContainer>
          </Card>
          <Card
            onClick={() => {
              if (select !== 2) {
                setSelect(2);
                scrollToTarget();
              }
            }}
            className={select === 2 && "cardSelected"}
            visible={select === null || select === 2}
            select={select}
          >
            <CardContainer>
              <SectionBackButtons
                select={select}
                clickSelect={clickSelect}
              ></SectionBackButtons>
              <img
                draggable={false}
                src={family}
                alt="serviço para sua familia"
              />
              <TitleCard>{lang?.ourServices?.familyServices?.title}</TitleCard>
              <DescriptionCard>
                {lang?.ourServices?.familyServices?.text}
              </DescriptionCard>
            </CardContainer>
          </Card>
          <Card
            onClick={() => {
              if (select !== 3) {
                setSelect(3);
                scrollToTarget();
              }
            }}
            className={select === 3 && "cardSelected"}
            visible={select === null || select === 3}
            select={select}
          >
            <CardContainer>
              <SectionBackButtons
                select={select}
                clickSelect={clickSelect}
              ></SectionBackButtons>
              <img draggable={false} src={forYou} alt="serviço para você" />
              <TitleCard>{lang?.ourServices?.servicesForYou?.title}</TitleCard>
              <DescriptionCard>
                {lang?.ourServices?.servicesForYou?.text}
              </DescriptionCard>
            </CardContainer>
          </Card>
        </Grid> */}
         {width > 768 && select !== null && (
        <Box marginTop={"5rem"} height={"100%"} maxWidth="1200px" width="100%">
          {select === 1 ? (
            <MenuHome
              key={1}
              select={select}
              imgHeader={house}
              categories={props?.categories[0]}
            />
          ) : select === 2 ? (
            <MenuHome
              key={2}
              select={select}
              imgHeader={family}
              categories={props?.categories[1]}
            />
          ) : select === 3 ? (
            <MenuHome
              key={3}
              select={select}
              imgHeader={forYou}
              categories={props.categories[2]}
            />
          ) : (
            <Box></Box>
          )}
        </Box>
      )}
      {width <= 768 && select !== null && (
        <ModalOurServicesMobile
          imgHeader={select === 1 ? house : select === 2 ? family : forYou}
          isOpen={select !== null}
          categories={props.categories[select - 1]}
          onClose={() => setSelect(null)}
        />
      )}
       
      </MySection>
    </>
  );
};

export default SectionOurServices;

const MySection = styled(Box)`
  max-width: ${(props) => props.theme.queries.xl};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${(props) => props.theme.queries.lg}) {
    padding: 50px 0rem;
  }
  @media (max-width: ${(props) => props.theme.queries.md}) {
    padding: 50px 1rem;
  }
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 1.75rem;
  line-height: 2.125rem;
  @media (max-width: ${(props) => props.theme.queries.xl}) {
    margin: 0 0 18px 0;
  }
`;

const Description = styled(Text)`
  margin: 0;
  max-width: 720px;
  text-align: center;
  font-size: 1.125rem;
  line-height: 1 0.5625rem;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Grid = styled(Box)`
  margin-top: 76px;
  display: grid;
  width: 100%;
  transition: 0.5;
  grid-template-columns: ${(props) =>
    props.select === null ? "repeat(auto-fill, minmax(305px, 1fr))" : "1fr"};
  grid-auto-rows: max-content;
  .cardSelected {
    background: ${(props) =>
      props.select === null ? "#fafafa" : "transparent"};
    
    }
  }
`;

const Card = styled(Box)`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  width: calc(100% - 0.5rem);
  cursor: pointer;
  min-height: 315px;
 
  p {
    max-width: 300px;
    text-align: center;
    box-shadow: ${(props) =>
      props.select === null ? "0px 0px 20px rgba(0, 0, 0, 0.26)" : "none"};
  }
  animation: 0.5s ${fadeIn} ease-in;
  div.back-buttons {
    visibility: ${(props) => (props.select !== null ? "visible" : "hidden")};
    height: ${(props) => (props.select !== null ? "auto" : "0")};
    width: calc(100% - 15px);
  }
  >
`;

const ContainerBackButtons = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 10;
  > img {
    margin: 2.5px;
    padding: 5px;
    width: 55px;
    height: auto;
   
    background: transparent;
  
  }
  svg {
    margin-left: auto;
    margin-right: 15px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px 30px 0px;
  transition: 0.75s;
  width: 100%;
  min-height: 315px;
`;

const TitleCard = styled(Text)`
  font-size: 1.5rem;
  line-height: 1.8125rem;
  text-align: center;
  color: ${(props) => props.theme.color.darkBlue};
`;

const DescriptionCard = styled(Text)`
  font-size: 1.125rem;
  line-height: 1.5625rem;
  text-align: center;
  color: #333333;
  width: 220px;
`;
