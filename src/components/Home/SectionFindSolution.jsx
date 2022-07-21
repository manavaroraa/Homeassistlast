import React, { useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { theme } from "../../theme";
import { useStore, useActions } from "../../configureStore";
import "../../pages/home.css";
import {Link} from 'react-router-dom'
import airplane from "../../assets/images/services.jpeg";
import LanguageContext from "../../providers/languageProvider";
import { Row, Col, Form, Input, Button, Space, notification } from 'antd';
import 'antd/dist/antd.css';
import App from '../../components/Home/newsletter'
import emailjs from 'emailjs-com';


const SectionFindSolution = (props) => {
  const isAuthenticated = useStore((state) => state.auth.isAuthenticated);
  const { lang } = useContext(LanguageContext);

  const sendEmail=(e)=> {
    e.preventDefault();   

    emailjs.sendForm('service_pw05awf', 'template_bh9ql35', e.target, 'VIcwcVBLRVs6ABEnU')
      .then((result) => {
          // window.location.reload()  
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <>
        <section className="assistant">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 p-0">
              <div className="assist-pic">
                <iframe
                  width="100%"
                  height="450"
                  src="https://www.youtube.com/embed/SsQmwXNMH3I"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="col-md-6">
              <div className="assist-txt">
                <img src={require("../../assets/img/assist-ico.png")} alt="" />
                <h3>
                  Become a Home <br /> Assistant
                </h3>
                <p>
                Are you a trustworthy person who guarantees;
                </p>
                <ul className="become">
                  <li>the quality of your work meets the standards of the customer?</li>
                  <li>
                  your professional and personal integrity?
                  </li>
                  <li>
                  your customers safety and well-being are your top priorities?
Do you want to earn an extra income?
                  </li>
                   <li>Do you want to earn an extra income?</li>
                 {/* <li>
                    Technical skills are not required to be attested by a
                    diploma or a certificate
                  </li> */}
                </ul>
                <p>If you answer YES, we would love to have you join our HOME ASSISTANT
TEAM!!</p>
                <Link className="a-tag" to="/cadastro/wizard/home-assistant">
                  Become a Home Assistant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
       <section className="solution">
       <div className="row">
          <div class="col-md-6">
          <div className="banner-txt section-right">
                <h3>
                FIND THE SOLUTION TO <br/>
SIMPLIFY YOUR LIFE!
                </h3>    
                <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      What Is a Home Assistant?
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      A Home Assistant is someone who prioritizes honesty,
integrity, being trustworthy, respectful and safety in
their professional and personal lives at all times.
Someone who is available to cooperate with neighbors
with easy and helpful tasks while they cannot be home.
Earn renumeration for doing a personalized service for
someone in their local geographical area.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Who Is a Home Assistant?
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      They are the retirees, or the grandparents who have
spare time, or the layoff worker with time to spare, or
the student on holidays, or the professional working
from home, all living in your local geographical area.
The neighborhood watchers who protect the residents
and homes from criminal activities in your local
geographical area.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      When Do You Need a Home Assistant?
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      They are called upon, to receive a worker or a
registered package at your home, while you are
working or away.
To supervise professional workers at your home, while
you are at work or have an unforeseen emergency.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingfour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
      Requirements For Being a Home Assistant?
      </button>
    </h2>
    <div id="collapsefour" class="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      No certifications or diplomas are required.
An honest law-abiding citizen regardless of age.
Responsible and is willing to be held accountable for all
of their actions.
Putting the safety of the homes and families of those

who entrusted them first and foremost.
      </div>
    </div>
  </div>
</div>          
            </div>
          </div>
          <div class="col-md-6">
          <div className="banner-right-img section-right-img">
          <img src={require('../../../src/assets/img/im6.png')}/>
            </div>
          </div>
            
            
            </div>
      </section>

      <section className="hire">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="hire-txt">
                <h3>Hire A Home assistant</h3>
                <ul className="become">
                  <li>You can search for free different professional profiles; analyzing their experience, comparing their skills, as to hire the right professional that
is closest to you.</li>
<li>When browsing through professional profiles, you can read the ratings and the evaluations of previous customers.</li>
<li>You will know the quality of the work done by the professional.</li>
<li>You can contact and negotiate renumerations with different professionals directly via the HomeAssist4U chat.</li>
<li>You rate the services of the professional on the HomeAssist4u platform, Improving the reliability and trusts of the professional profiles.</li>
       <li>You rate the services of the professional on the HomeAssist4u platform, Improving the reliability and trusts of the professional profiles.</li>          
           <li>You can help the best trusted professionals get new clients</li>
           <li>You can help other costumers to find qualified and reliable trusted professionals for their needs.</li>      
                  </ul>
                <Link
                  className="a-tag"
                  to="/profissionais?start=0&categories=&price_min=&price_max=&language=&state=&country=&pageNumber=0&gender=&text=&distance=&home_assistent=true&lat=&lng=&breadcrumb="
                >
                  Hire a Home Assistant
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="hire-bg"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact123">
        <div className="container">
          <div className="row co">
            <div className="col-md-6">
              <div className="contact-pic">
                <img src={require("../../assets/img/contact-pic.png")} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-txt">
                <div className="form-txt">
                  <h3>Get In Touct</h3>
                  <form onSubmit={sendEmail}>
                    <div className="form-group">
                      <label for="email">Name</label>
                      <input
                        type="name"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        name="name"
                      />
                    </div>
                    <div className="form-group">
                      <label for="pwd">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <label for="pwd">Message</label>
                      <input
                        type="message"
                        name="message"
                        className="form-control mess"
                        id="message"
                        placeholder="Type your message here"
                      />
                    </div>
                    <button type="submit" className="btn btn-default">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  

      <section className="news-letter" id="News-letter">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h3 className="white-title">Join Our Newsletter</h3>
              {/* <p className="des how-de">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p> */}
            </div>
            <div className="col-md-6">
              <div className="news-frm">
              <App/>
              </div>
            </div>
          </div>
        </div>
      </section>
    
    
    </>
  );
};

export default withRouter(SectionFindSolution);

