import React, {useState,useEffect} from "react";
import {IntlProvider} from "react-intl"
import English from '../lang/en.json'
import Arabic from '../lang/ar.json'
import LogoEN from "../assets/images/bosta_logo_en.svg";
import LogoAR from "../assets/images/bosta_logo_ar.svg";
import { Spin } from 'antd';

const local = "en"
let lang;
local === "en" ? lang = English : lang = Arabic;

export const Context = React.createContext();

export default function Wrapper(props) {

    const [locale, setLocale] = useState("ar");
    const [messages, setMessages] = useState(lang);
    const [direction, setDirection] = useState("ltr");
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if(localStorage.getItem("locale"))
            if(localStorage.getItem("locale")==="en"){
                setLocale("en")
                setMessages(English)
                setImage(LogoEN)
                setDirection("ltr")
            }
            else{
                setLocale("ar")
                setMessages(Arabic)
                setImage(LogoAR)
                setDirection("rtl")
            }
        else
            localStorage.setItem("locale","en")
            
        setLoading(false)
    }, []);

    const selectLang = () =>{
        if(locale==="en"){
            setLocale("ar")
            setMessages(Arabic)
            localStorage.setItem("locale","ar")
        }
        else{
            setLocale("en")
            setMessages(English)
            localStorage.setItem("locale","en")
        }
        window.location.reload();
    }

    return(
        loading?
        <div className="loading">
            <Spin />
        </div>
        :
        <Context.Provider value={{locale,selectLang,image,direction}}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    )
}