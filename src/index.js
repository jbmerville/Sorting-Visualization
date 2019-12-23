import React from "react";
import ReactDOM from "react-dom";
import Array from "./Array";
import Buttons from "./Buttons";
import Slider from "./Slider";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.onButtonClick = this.onButtonClick.bind(this);
        this.unlock = this.unlock.bind(this);
        this.newArray = this.newArray.bind(this);
        let arr = [];
        for (let i = 0; i < 100; i++){
            arr.push((Math.random() * 600) + 10);
        }
        this.state = {arr: arr, size: 100, locked: false, canArray: true};
      }

    onButtonClick(algorithm) {
        this.setState({locked: true});
        if (algorithm === "bubbleSort") {
            this.child.current.bubbleSort();
        }
        else if (algorithm === "mergeSort") {
            this.child.current.mergeSort(0, this.child.current.state.arraySize - 1);
        }
        else if (algorithm === "quickSort") {
            this.child.current.quickSort(0, this.child.current.state.arraySize - 1);
        }
        else if (algorithm === "shellSort") {
            this.child.current.shellSort();
        }
    }


    unlock() {
        this.setState({locked: false});
    }

    newArray(size) {
        if (!size) size = this.state.size;
        else this.setState({size: size});
        let arr = [];
        for (let i = 0; i < size; i++){
            arr.push((Math.random() * 500) + 10);
        }
        this.setState({arr: arr});
        this.child.current.updateArray(arr);
    }

    render(){
        return (
            <div className="app-container">
                <div className="header">
                    <Slider text="Array Size" locked={this.state.locked} runOnClick={this.newArray} size="100"/>
                    <Buttons text="New Array" locked={this.state.locked} logo="add" runOnClick={this.newArray} size="100"/>
                    <Buttons text="Bubble Sort" locked={this.state.locked} hoverText="Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order." runOnClick={this.onButtonClick} algo="bubbleSort" position="center"/>
                    <Buttons text="Merge Sort" locked={this.state.locked} hoverText="Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves." runOnClick={this.onButtonClick} algo="mergeSort" position="center"/>
                    <Buttons text="Quick Sort" locked={this.state.locked} hoverText="Quick Sort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot." runOnClick={this.onButtonClick} algo="quickSort" position="right" />
                    <Buttons text="Shell Sort" locked={this.state.locked} hoverText="Shell Sort is mainly a variation of Insertion Sort. In insertion sort, we move elements only one position ahead. When an element has to be moved far ahead, many movements are involved. The idea of shellSort is to allow exchange of far items." runOnClick={this.onButtonClick} algo="shellSort" position="right" />
                </div>
                    <Array arr={this.state.arr} unlock={this.unlock} ref={this.child}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
);