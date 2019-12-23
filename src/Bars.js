import React from "react";


const Bars = (props) => {
    return (
        <div style={{height: props.height}} className={`bar ${props.selected}`} key={props.id}>
            <div className="heights">{Math.round(props.height/10)}</div>
        </div>
    );
};

export default Bars;