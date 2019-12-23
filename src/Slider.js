import React from "react";

class Slider extends React.Component {

    constructor(props){
        super(props)
        this.runAlgorithm = this.runAlgorithm.bind(this);
        this.state = {size: props.size, text: props.text, onButtonClick: props.runOnClick};
    }

    runAlgorithm (e){
        e.preventDefault();
        this.setState({size: e.target.value});
        this.state.onButtonClick(this.state.size);
    }

    render() {
        if (this.props.locked) {
            return (
                <div className="slider">
                    <div>{this.state.text}: {this.state.size}</div>
                    <input disabled type="range" onChange={this.runAlgorithm} min="5" max="200" value={this.state.size}/>
                </div>
            );
        } 
        return (
            <div className="slider">
                <div>{this.state.text}: {this.state.size}</div>
                <input type="range" onChange={this.runAlgorithm} min="5" max="200" value={this.state.size}/>
            </div>
        );
    }
}

export default Slider;