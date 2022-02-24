import React from "react";
import { useNavigate } from "react-router-dom";

import { Tooltip, message, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import {FormattedMessage, injectIntl} from "react-intl";
import axios from 'axios';

function LandingPage({intl}) {
    
    const navigate = useNavigate();

    const error = () => {
        message.error(intl.formatMessage({id: 'paper.input.error'}));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await axios
            .get("https://tracking.bosta.co/shipments/track/"+e.target.trackingNO.value)
            .then((res)=>{
                navigate('/info', { state: {data: res.data} });
            })
            .catch(err=>{
                error()
            })
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