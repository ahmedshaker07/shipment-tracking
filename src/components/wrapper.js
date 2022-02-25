import React, {useState,useEffect} from "react";
import {IntlProvider} from "react-intl"

import English from '../lang/en.json'
import Arabic from '../lang/ar.json'

import { Spin } from 'antd';

export const Context = React.createContext();

export default function Wrapper(props) {

    const [locale, setLocale] = useState("en");
    const [messages, setMessages] = useState(English);
    const [direction, setDirection] = useState("ltr");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem("locale")){
            if(localStorage.getItem("locale")==="en"){
                setLocale("en")
                setMessages(English)
                setDirection("ltr")
            }
            else{
                setLocale("ar")
                setMessages(Arabic)
                setDirection("rtl")
            }
        }
        else localStorage.setItem("locale","en");
        setLoading(false);
    }, []);

    const switchLanguage = () =>{
        if(locale==="en"){
            setLocale("ar")
            setMessages(Arabic)
            setDirection("rtl")
            localStorage.setItem("locale","ar")
        }
        else{
            setLocale("en")
            setMessages(English)
            setDirection("ltr")
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
        <Context.Provider value={{locale,switchLanguage,direction}}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    )
}