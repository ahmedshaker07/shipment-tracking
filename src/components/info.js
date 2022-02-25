import React from "react";

export default function Info({status,header,description,date,...props}) {

    return(
        <div className="info-component-main">
            <h3 className="title">
                {header}
            </h3>
            <div className="description">
                {
                    description?
                    <h3 className={status==="error"?"delivery-status-error":status==="finished"?"delivery-status-finished":status===undefined?"":"delivery-status-proccess"}>
                        {description}
                    </h3>:
                    <h3>
                        {date}
                    </h3>
                }
            </div>
        </div>
    )
}