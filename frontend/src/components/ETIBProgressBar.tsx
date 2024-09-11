import React from "react";

function ETIBProgressBar(width: { width: number}) {
    const classes = "bg-green-400 transition-all ease-linear duration-500 w-[" + width.width + "px]";
    return (
        <div className="h-10 fixed left-0 top-0 right-0">
            <div className={classes}></div>
        </div>
    );
}

export default ETIBProgressBar;