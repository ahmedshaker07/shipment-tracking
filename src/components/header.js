import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {FormattedMessage} from "react-intl";
import { Context } from "./wrapper";
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export default function Header({Intl,...props}) {
    const context = useContext(Context)
    const mobileMenu = useRef();
    const navigate = useNavigate();
    
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
        window.location.replace('/')
    }

    return(
        <header>
            <nav>
                <ul className="ul-desktop">
                    <li style={{display:"flex",alignItems:"center"}}>
                        <img  onClick={redirect} src={context.image} alt="logo" style={{height: "35px", display: "block", marginBottom: "5px", cursor:"pointer"}}/>
                    </li>
                </ul>
                <ul className="ul-desktop">
                    <li><button onClick={redirect}><FormattedMessage id="nav.home"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.pricing"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.contact_sales"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.careers"/></button></li>
                </ul>
                <ul className="ul-desktop">
                    <li><button onClick={redirect}><FormattedMessage id="nav.sign_in"/></button></li>
                    <li><button onClick={context.selectLang} style={{color: "red"}}><FormattedMessage id="nav.language"/></button></li>
                </ul>
                <ul className="ul-mobile">
                    <li style={{display:"flex",alignItems:"center"}}>
                        <img src={context.image} onClick={redirect} alt="logo" style={{height: "35px", display: "block", marginBottom: "5px", cursor:"pointer"}}/>
                    </li>
                </ul>
                <ul className="ul-mobile">
                    <li><Button onClick={handleMobileMenu} type="link" icon={<MenuOutlined style={{ color: 'red' }}/>} /></li>
                </ul>
            </nav>
            <div ref={mobileMenu} className="mobile-menu">
                <ul>
                    <li><button onClick={redirect}><FormattedMessage id="nav.home"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.pricing"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.contact_sales"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.careers"/></button></li>
                    <li><button onClick={redirect}><FormattedMessage id="nav.sign_in"/></button></li>
                    <li><button onClick={context.selectLang} style={{color: "red"}}><FormattedMessage id="nav.language"/></button></li>
                </ul>
            </div>
        </header>
    )
}