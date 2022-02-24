import React from "react";
import { useNavigate } from "react-router-dom";

import { Tooltip, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import {FormattedMessage, injectIntl} from "react-intl";

function LandingPage({intl}) {
    
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        navigate('/track/'+e.target.trackingNO.value);
    }

    return(
        <div className="landing-paper">
            <div className="paper">
                <h4><FormattedMessage id="paper.title"></FormattedMessage></h4>
                <h3><FormattedMessage id="paper.describtion"></FormattedMessage></h3>
                <form className="landing-input" onSubmit={handleSubmit}>
                    <input required placeholder={intl.formatMessage({id: 'paper.input.placeholder'})} id="trackingNO"/>
                        <Tooltip title="search">
                            <Button className="search-button" type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined className="search-button-icon"/>}/>
                        </Tooltip>
                </form>
            </div>
        </div>
    )
}

export default injectIntl(LandingPage);