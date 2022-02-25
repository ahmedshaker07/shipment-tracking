import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { injectIntl } from "react-intl";

function LandingPage({ intl }) {
  const navigate = useNavigate();

  const handleSearchClick = async (e) => {
    e.preventDefault();
    navigate("/track/" + e.target.trackingNO.value);
  };

  return (
    <div className="landing-paper">
      <div className="paper">
        <h4>{intl.formatMessage({ id: "paper.title" })}</h4>
        <h3>{intl.formatMessage({ id: "paper.describtion" })}</h3>
        <form className="landing-input" onSubmit={handleSearchClick}>
          <input
            className="search-input"
            required
            placeholder={intl.formatMessage({ id: "paper.input.placeholder" })}
            id="trackingNO"
          />
          <Button
            className="search-button"
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined className="search-button-icon" />}
          />
        </form>
      </div>
    </div>
  );
}

export default injectIntl(LandingPage);
