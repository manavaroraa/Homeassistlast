import React, { useContext } from "react";
import styled from "styled-components";
import { withRouter, Link, useHistory } from "react-router-dom";
import { Box, Image, Button, Text, List, ListItem } from "@chakra-ui/react";
import { theme } from "../../theme";
import { useStore } from "../../configureStore";
import "../../pages/home.css";
import SectionOurServices from "../Home/SectionOurServices";
import man from "../../assets/images/home-assistent.jpeg";
import LanguageContext from "../../providers/languageProvider";
import HomeFormSearch from "./HomeFormSearch";

const SectionBeAssistant = (props) => {
  //   const history = useHistory();
  //   const isAuthenticated = useStore((state) => state.auth.isAuthenticated);

  //   const { lang } = useContext(LanguageContext);

  return (
    <>
      <section className="banner">
        <div className="row">
          <div class="col-md-6">
          <div className="banner-txt section-right">
              <h1>
              TRUSTED SERVICES FOR YOUR HOME AND FAMILY{" "}
                <span className="head-txt">home</span> and
                <span className="head-txt">family</span>
              </h1>
              <p>
              Before Going Further Please Read Our Safety Tips!!<br/>
Your Safety and Peace of Mind Is Our Priority!!
              </p>
              <a href="" className="a-tag">
                SAFETY TIPS
              </a>
            </div>
          </div>
          <div class="col-md-6">
          <div className="banner-right-img section-right-img">
          <img src={require('../../../src/assets/img/im1.jpg')}/>
            </div>
          </div>
            
            
            </div>
      </section>
      <section className="what">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="head">
                <h3 className="head-txt">
                  {/* What is
                  <br /> */}
                 HOMEASSIST4U
                </h3>
              </div>
            </div>
            <div className="col-md-8">
              <div className="prof">
                <p className="p-txt">
                Our goal is to provide safe reliable professionals for all of your family and home needs.
Find professionals in your location for all of your family and home services. It&#39;s easy, fast and
efficient:
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row dots">
            <div className="col-lg-4 prof-be">
              <div className="box">
                <img src={require("../../assets/img/search-ico.png")} />
                <p>Search the service you need, browse and read reviews on different profiles.</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="box box2">
                {/* picture missing */}
                <img src={require("../../assets/img/user-ico.png")} />
                <p>
                Contact and negotiate directly with the professionals.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="box box3">
                <img src={require("../../assets/img/setting-ico.png")} />
                <p>
                  Pay directly the hired professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeFormSearch />
      {/* 
<section className="our-service">
    <div className="row">
        <div className="col-md-4">
            <div className="service">
                <div className="pic-txt">
                    <h3>HOME SERVICES</h3>
                    <p>Various solutions for your home and your property. Diverses solutions pour votre maison et
                        votre propriété.</p>
                </div>
                <img src={require('../../assets/img/.png')} alt=""/>
            </div>
        </div>
        <div className="col-md-4">
            <div className="service-txt">
                <h3>Our Services
                </h3>
                <p>Select a service to learn more.
                </p>
            </div>
            <div className="pic2">
                <div className="pic2-txt">
                    <h3>FAMILY SERVICES</h3>
                    <p>Various solutions for every member of your family and your pets. Diverses solutions pour
                        chaque membre de votre famille et vos animaux de compagnie.</p>
                </div>
                <img src={require('../../assets/img/service-pic2.png')} alt=""/>
            </div>
        </div>
        <div className="col-md-4">
            <div className="service">
                <div className="pic-txt">
                    <h3>WELLNESS SERVICES</h3>
                    <p>Various solutions for your personal care and well-being. Diverses Solutions pour vos soins
                        personnels et bien-être.</p>
                </div>
                <img src={require('../../assets/img/service-pic3.png')} alt=""/>
            </div>
        </div>
    </div>
</section> */}

   
    </>
  );
};

export default withRouter(SectionBeAssistant);

// // -----
// // const Container = styled(Box)`
// //   background-color: ${(props) => props.theme.color.white};
// //   padding: 50px 0;
// //   @media (max-width: ${(props) => props.theme.queries.lg}) {
// //     padding: 50px 0rem;
// //   }
// // `;

// // const Content = styled(Box)`
// //   max-width: ${(props) => props.theme.queries.xl};
// //   margin: 0 auto;
// //   display: flex;
// //   align-items: center;
// //   @media (max-width: ${(props) => props.theme.queries.xl}) {
// //     padding: 0 2em;
// //   }
// //   @media (max-width: ${(props) => props.theme.queries.md}) {
// //     flex-direction: column;
// //     padding: 0 2em;
// //   }
// //   @media (max-width: ${(props) => props.theme.queries.sm}) {
// //     padding: 0 1em;
// //   }
// // `;

// // const Title = styled.h2`
// //   margin: 0 0 8px 0;
// //   font-size: 1.75rem;
// //   line-height: 2.125rem;
// //   @media (max-width: ${(props) => props.theme.queries.xl}) {
// //     margin: 0 0 18px 0;
// //   }
// // `;

// // const Description = styled(Text)`
// //   font-size: 1.125rem;
// //   line-height: 1.5625rem;
// //   margin-top: 0.3rem;
// //   color: #333333;
// // `;

// // const CustomList = styled(List)`
// //   li {
// //     font-size: 1.125rem;
// //     line-height: 1.5625rem;
// //     margin-top: 0.3rem;
// //     color: #333333;
// //     margin-bottom: 1rem;
// //   }
// // `;

// // const CustomImage = styled(Image)`
// //   max-width: 363px;
// //   max-height: 420px;
// //   margin-right: 50px;
// //   @media (max-width: ${(props) => props.theme.queries.md}) {
// //     margin: 1rem 0 3rem 0;
// //   }
// //   @media (max-width: ${(props) => props.theme.queries.sm}) {
// //     width: 100%;
// //     height: 100%;
// //   }
// // `;

// // const ContainerGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: 1fr 1fr;
// //   grid-template-rows: auto;
// //   column-gap: 30px;

// //   @media (max-width: 1024px) {
// //     grid-template-columns: 1fr;
// //   }
// // `;

// // const BoxVideo = styled.div``;

// // const BoxBeAssistant = styled(Box)`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: flex-start;
// //   width: 100%;
// //   @media (max-width: ${(props) => props.theme.queries.sm}) {
// //     align-items: center;
// //   }
// // `;

// // const ContainerButton = styled.div`
// //   display: grid;
// //   grid-template-columns: auto auto;
// //   grid-gap: 20px;
// //   width: 100%;

// //   @media (max-width: 1024px) {
// //     grid-template-columns: auto;
// //     grid-template-rows: auto auto;
// //     row-gap: 10px;
// //   }
// // `;
