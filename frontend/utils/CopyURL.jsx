import React from "react";

import './CopyURL.css';

export default function CopyURL(){

    function CopyURL(){

        navigator.clipboard.writeText(window.location.href);
    }

    return(
        <div className="copy-box">
            <input type="text" value={window.location.href}  readOnly/>

            <button onClick={CopyURL}>Copy</button>
        </div>
    )

}