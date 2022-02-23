import React from "react";
import { useLocation } from "react-router-dom";

export default function TrackingInfoPage(props) {

    const {state} = useLocation();
    console.log(state.data)
    return(
        <div className="delivery-main">
           {/* {state.data.CurrentStatus.state} */}
           <div className="delivery-status">

           </div>
           <div className="delivery-info">
               <div className="delivery-progress">

               </div>
               <div className="delivery-address">

               </div>
           </div>
        </div>
    )
}