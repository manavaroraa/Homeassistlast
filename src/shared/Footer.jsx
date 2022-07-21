/* eslint-disable react/jsx-no-target-blank */
import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import LanguageContext from "../providers/languageProvider";
import './footer.css'
const Footer = (props) => {
  const { lang } = useContext(LanguageContext);
  return (
    <>
    <section className="footer">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="footer-logo">
                        <img src={require('../../src/assets/img/footer-logo.png')} />
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="footer-link">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/termos-e-condicoes">{lang?.footer?.link1}</Link></li>
                            <li><Link to="/politica-de-seguranca">{lang?.footer?.link2}</Link></li>
                            <li><Link to="/sobre-nos">{lang?.footer?.link3}</Link></li>
                            <li><Link to="/dicas-seguranca">{lang?.footer?.link4}</Link></li>
                            <li><Link to="/home-assistants">{lang?.footer?.link5}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="footer-contact">
                        <h3>Get In Touch</h3>
                        <ul>
                            {/* <h4>Call:</h4>
                            <a href="tel:+917-509-5235">+917-509-5235</a> */}
                            <h4>Email:</h4>
                            <a href="mailto:contato@homeassist4u.com">contato@homeassist4u.com</a>
                        </ul>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="footer-social">
                        <h3>Follow us</h3>
                        <ul>
                            <a href="https://www.instagram.com/homeassist4ureal"><i className="fa fa-instagram ico" aria-hidden="true"></i></a>
                            <a href="https://www.facebook.com/homeassist4ureal"><i className="fa fa-facebook ico" aria-hidden="true"></i></a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="coppy">
        <div className="container-fluid">
            <div className="col-md-12">
                <div className="coppy">
                    <h6>© 2022 contato@homeassist4u.com </h6>
                </div>
            </div>
        </div>
    </section>

    </>
  );
};

export default withRouter(Footer);


