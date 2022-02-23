import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import { Tooltip, message, Button,Spin } from 'antd';
import { SearchOutlined ,AliwangwangOutlined} from '@ant-design/icons';

import {FormattedMessage, injectIntl} from "react-intl";
import axios from 'axios';

function LandingPage({intl}) {
    
    const [hidden, setHidden] = useState("hidden");
    const navigate = useNavigate();

    const antIcon = <AliwangwangOutlined style={{ fontSize: 24,color:"red" }} spin />;

    const error = () => {
        message.error(intl.formatMessage({id: 'paper.input.error'}));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setHidden("visible")
        await axios
            .get("https://tracking.bosta.co/shipments/track/"+e.target.trackingNO.value)
            .then((res)=>{
                setHidden("hidden")
                navigate('/info', { state: {data: res.data} });
            })
            .catch(err=>{
                setHidden("hidden")
                error()
            })
    }

    return(
        <div className="landing-paper">
            <div className="paper">
                <h4><FormattedMessage id="paper.title"></FormattedMessage></h4>
                <h3><FormattedMessage id="paper.describtion"></FormattedMessage></h3>
                <form className="input" onSubmit={handleSubmit}>
                    <input required placeholder={intl.formatMessage({id: 'paper.input.placeholder'})} id="trackingNO"></input>
                        <Tooltip title="search">
                            <Button type="primary" htmlType="submit" shape="circle" style={{ background: "red", border: "none" ,margin:"0 1rem"}} 
                                    icon={<SearchOutlined style={{ color: 'white' }}/>}
                            />
                        </Tooltip>
                </form>
            </div>
            <Spin tip="Loading..." indicator={antIcon} style={{marginTop: "2rem",visibility:hidden,color:"red"}}/>
        </div>
    )
}

export default injectIntl(LandingPage);