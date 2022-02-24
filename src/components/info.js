import React,{useEffect,useRef} from "react";
import { FormattedMessage } from "react-intl";

export default function Info(props) {
    
    const h3 = useRef();

    useEffect(() => {
        switch (props.status) {
            case "error":
                h3.current.style.color="red"
                break;
            case "finished":
                h3.current.style.color="green"
                break;
            case "process":
                h3.current.style.color="#e4c500"
                break;
            default:
                break;
        }
    }, [props.status]);
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            <h3 style={{color:"rgb(150,150,150)"}}>
                <FormattedMessage id={props.headerID} values={{trackingNo:props.trackingNo}}/>
            </h3>
            {
                props.descID?
                    <h3 ref={h3} style={{fontWeight: "600" }}>
                        <FormattedMessage id={props.descID}/>
                    </h3>:
                    <h3 style={{fontWeight: "600"}}>
                        {props.date}
                    </h3>
            }
        </div>
    )
}