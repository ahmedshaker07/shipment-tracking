import React, { useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import {FormattedMessage} from "react-intl";
import { Context } from "./wrapper";
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export default function Header({Intl,...props}) {

    const navigate = useNavigate();
    const context = useContext(Context)
    const mobileMenu = useRef();
    
    const handleMobileMenu = () =>{
        if(mobileMenu.current.style.visibility==="hidden"||mobileMenu.current.style.visibility===""){
            mobileMenu.current.style.visibility="visible"
            mobileMenu.current.style.opacity=1
        }
        else{
            mobileMenu.current.style.visibility="hidden"
            mobileMenu.current.style.opacity=0
        }
    }

    const redirect = ()=>{
        navigate('/')
        mobileMenu.current.style.visibility="hidden"
        mobileMenu.current.style.opacity=0
    }

    return(
        <header>
            <nav>
                <ul className="ul-desktop">
                    <li style={{display:"flex",alignItems:"center"}}>
                        <img className="nav-logo"  src={context.image} onClick={redirect} alt=""/>
                    </li>
                </ul>
                <ul className="ul-desktop">
                    <li><button onClick={redirect}><FormattedMessage id="nav.home"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.pricing"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.contact_sales"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.careers"/></button></li>
                </ul>
                <ul className="ul-desktop">
                    <li>
                        <button onClick={redirect}>
                            <FormattedMessage id="nav.sign_in"/>
                        </button>
                    </li>
                    <li>
                        <button onClick={context.selectLang} className="nav-language-button">
                            <FormattedMessage id="nav.language"/>
                        </button>
                    </li>
                </ul>
                <ul className="ul-mobile">
                    <li className="logo-position" >
                        <img className="nav-logo" src={context.image} onClick={redirect} alt=""/>
                    </li>
                </ul>
                <ul className="ul-mobile">
                    <li className="ant-icon-color">
                        <Button onClick={handleMobileMenu} type="link" icon={<MenuOutlined />} />
                    </li>
                </ul>
            </nav>
            <div ref={mobileMenu} className="mobile-menu">
                <ul>
                    <li><button onClick={redirect}><FormattedMessage id="nav.home"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.pricing"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.contact_sales"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.careers"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.sign_in"/></button></li>
                    <li><button onClick={context.selectLang} className="nav-language-button"><FormattedMessage id="nav.language"/></button></li>
                </ul>
            </div>
        </header>
    )
}