import React from "react";

export const Toolbar = function({datetime}){
    return(
        <div className="toolbar">
            <p>{datetime}</p>
        </div>
    )
};