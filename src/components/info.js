import React,{useEffect,useRef} from "react";
import { FormattedMessage } from "react-intl";

export default function Info(props) {
    
    const h3 = useRef();

    useEffect(() => {
        switch (props.status) {
            case "error":
                h3.current.style.color="#ff4d4f"
                break;
            case "finished":
                h3.current.style.color="rgb(0, 199, 0)"
                break;
            case "process":
                h3.current.style.color="rgb(199, 199, 0)"
                break;
            default:
                break;
        }
    }, [props.status]);
    return(
        <div className="info-component-main">
            <h3 className="title">
                <FormattedMessage id={props.headerID} values={{trackingNo:props.trackingNo}}/>
            </h3>
            <div className="description">
            {
                props.descID?
                    <h3 ref={h3}>
                        <FormattedMessage id={props.descID}/>
                    </h3>:
                    <h3>
                        {props.date}
                    </h3>
            }
            </div>
        </div>
    )
}