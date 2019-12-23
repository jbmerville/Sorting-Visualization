import React from "react";

class Buttons extends React.Component {

    constructor(props){
        super(props)
        this.state = {algo: props.algo, text: props.text, onButtonClick: props.runOnClick, logo: props.logo, hoverText: props.hoverText, position: props.position};
    }

    runAlgorithm = event => {
        if (!this.props.locked) this.state.onButtonClick(this.state.algo);
    }

    render() {
        let color = "white inverted";
        if (this.props.locked) color = "secondary ";

        if (this.state.logo){
            return (
                <div className={`${color} ui button`} data-tooltip={this.state.hoverText} data-position={`bottom ${this.state.position}`} onClick={this.runAlgorithm} ><i className={`${this.state.logo} icon`}></i>{this.state.text}</div>
            );
        }
        else {
            return (
                <div className={`${color} ui button`} data-tooltip={this.state.hoverText} data-position={`bottom ${this.state.position}`} onClick={this.runAlgorithm} >{this.state.text}</div>
            );
        }
    }
}

export default Buttons;