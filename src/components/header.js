import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { injectIntl } from "react-intl";

import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { Context } from "./Wrapper";

import LogoEN from "../assets/images/bosta_logo_en.svg";
import LogoAR from "../assets/images/bosta_logo_ar.svg";

function Header({ intl, ...props }) {
  const navigate = useNavigate();
  const context = useContext(Context);
  const [image, setImage] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const redirect = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    context.locale === "en" ? setImage(LogoEN) : setImage(LogoAR);
  }, [context.locale]);

  return (
    <header>
      <nav>
        <ul className="ul-desktop">
          <li className="logo-position">
            <img className="nav-logo" src={image} onClick={redirect} alt="" />
          </li>
        </ul>
        <ul className="ul-desktop">
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.home" })}
            </button>
          </li>
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.pricing" })}
            </button>
          </li>
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.contact_sales" })}
            </button>
          </li>
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.careers" })}
            </button>
          </li>
        </ul>
        <ul className="ul-desktop">
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.sign_in" })}
            </button>
          </li>
          <li>
            <button
              onClick={context.switchLanguage}
              className="nav-language-button"
            >
              {intl.formatMessage({ id: "nav.language" })}
            </button>
          </li>
        </ul>
        <ul className="ul-mobile">
          <li className="logo-position">
            <img className="nav-logo" src={image} onClick={redirect} alt="" />
          </li>
        </ul>
        <ul className="ul-mobile">
          <li className="ant-icon-color">
            <Button
              onClick={handleMobileMenu}
              type="link"
              icon={<MenuOutlined />}
            />
          </li>
        </ul>
      </nav>
      <div
        className={
          mobileMenuOpen
            ? "mobile-menu mobile-menu-visible"
            : "mobile-menu mobile-menu-hidden"
        }
      >
        <ul>
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.home" })}
            </button>
          </li>
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.pricing" })}
            </button>
          </li>
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.contact_sales" })}
            </button>
          </li>
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.careers" })}
            </button>
          </li>
          <li>
            <button onClick={redirect}>
              {intl.formatMessage({ id: "nav.sign_in" })}
            </button>
          </li>
          <li>
            <button
              onClick={context.switchLanguage}
              className="nav-language-button"
            >
              {intl.formatMessage({ id: "nav.language" })}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default injectIntl(Header);
