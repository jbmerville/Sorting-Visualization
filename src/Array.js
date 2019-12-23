import React from "react";
import Bars from "./Bars";
import Sorted from "./Sorted";

class Array extends React.Component {

    constructor(props) {
        super(props);
        let bars = [];
        for(let i = 0; i < props.arr.length; i++) {
            bars.push(<Bars  height={props.arr[i]} selected={false}/>);
        }
        this.state = {arraySize: props.arr.length, arr: props.arr, bars: bars, sorted: false, speed: 10, unlock: props.unlock};
    }

    // Update the array representing the class and the bars that represent it.
    updateArray(arr) {
        let bars = [];
        for(let i = 0; i < arr.length; i++) {
            bars.push(<Bars height={arr[i]} selected={false}/>);
        }
        this.setState({arr: arr, bars: bars, sorted: false, arraySize: arr.length});
    }

    // Make an async function sleep for time in milliseconds. 
    sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
    }

    // Bubble Sort the array.
    async bubbleSort() {
        let end = this.state.arraySize;
        while (end > 0) {
            let bars = this.state.bars;
            for (let i = 1;  i < end; i++) {
                let arr = this.state.arr;
                if (i > 0)  {
                    if (arr[i-1] >  arr[i]) {
                        this.swapAndShowSwapped(i, i-1, arr, bars);
                        await this.sleep(this.state.speed/2);
                    }
                    
                    bars[i-1] = <Bars key={i-1} height={this.state.arr[i-1]} selected={''}/>;

                }
                bars[i] = <Bars key={i} height={this.state.arr[i]} selected="current"/>;
                this.setState({arr: arr, bars: bars});
                await this.sleep(this.state.speed);
            }
            end -= 1;
            bars[end] = <Bars key={end} height={this.state.arr[end]} selected="selected"/>;
            this.setState({bars: bars});
        }
        this.setState({sorted: true});
        this.state.unlock();
    }

    async mergeSort(start, end){
        await this.mergeSortHelper(start, end);
        this.state.unlock();
    }
    // Merge Sort the array.
    async mergeSortHelper(start, end) {
        if (start < end){
            let middle =  Math.floor((start + end) / 2);
            await this.mergeSortHelper(start, middle);
            await this.mergeSortHelper(middle + 1, end);
            await this.merge(start, middle, end);
            this.setState({sorted: true});
        }
    }

    async merge(start, middle, end) {
        let sorted = false;
        let arr = this.state.arr; 
        let right = middle + 1;
        if (start === 0 && end === arr.length-1) sorted = true;
        for (let i = start; i <= end; i++) {
            if (right <= end && arr[i] >= arr[right]) {
                let arrRef = arr[right];
                arr = this.shiftElementsToRight(i+1, right, arr);
                arr[i] = arrRef;
                right++;
            }
            this.updateArray(arr);
            let bars = this.state.bars;
            if (right < bars.length) bars[right] = bars[right] = <Bars key={right} height={this.state.arr[right]} selected="current"/>;
            if (!sorted) bars[i] = <Bars key={i} height={this.state.arr[i]} selected="current"/>;
            else {
                for (let y = 0; y <= i; y++){
                    bars[y] = <Bars key={y} height={this.state.arr[y]} selected="selected"/>;
                }
            }
            this.setState({bars: bars});
            await this.sleep(this.state.speed); 
        }
    }

    shiftElementsToRight(from, to, array){
        let ref = [...array];
        for (let i = from; i <= to; i++){
            array[i] = ref[i-1];
        }
        return array;
    }

    async quickSort(low, high) {
        await this.quickSortHelper(low, high);
        this.setBarsGreen();
        this.setState({sorted: true});
        this.state.unlock();
    }

    async quickSortHelper(low, high) {
        if (low < high) {
            let pi = await this.partition(low, high);
            await this.quickSortHelper(low, pi - 1);  // Before pi
            await this.quickSortHelper(pi + 1, high); // After pi   
        }
       
    }
    async shellSort(){
        await this.shellSortHelper();
        this.setBarsGreen();
        this.setState({sorted: true});
        this.state.unlock();
    }

    async shellSortHelper(){
        let arr = this.state.arr;
        for (let gap = this.state.arraySize/2; gap > 0; gap = Math.floor(gap/2)) 
        { 
            for (let i = gap; i < this.state.arraySize; i += 1) 
            { 
                let temp = arr[i]; 
                let j = i;
                for ( j = i; j >= gap && arr[j - gap] > temp; j -= gap) 
                {
                    arr[j] = arr[j - gap]; 
                    this.updateArray(arr);
                    let bars = this.state.bars;
                    bars[j] = <Bars key={j} height={this.state.arr[j]} selected="current"/>;
                    this.setState({bars: bars});
                    await this.sleep(this.state.speed); 
                }
                arr[j] = temp; 
                this.updateArray(arr);
                let bars = this.state.bars;
                bars[j] = <Bars key={j} height={this.state.arr[j]} selected="swap"/>;
                this.setState({bars: bars});
                await this.sleep(this.state.speed); 
            } 
        } 
    }

    async setBarsGreen() {
        let bars = this.state.bars;
        for (let i = 0; i < bars.length; i++){
            bars[i] = <Bars key={i} height={this.state.arr[i]} selected="selected"/>;
        }
        this.setState({bars: bars});
    }

    async partition (low, high)
    {
        let arr = this.state.arr;
        let pivot = arr[high];  
    
        let i = (low - 1);  // Index of smaller element
        let bars = this.state.bars;
        bars[high] = <Bars key={high} height={this.state.arr[high]} selected="current"/>;
        this.setState({bars: bars});
        await this.sleep(this.state.speed); 
        for (let j = low; j < high; j++)
        {
            // If current element is smaller than the pivot
            if (arr[j] < pivot)
            {
                i++;    // increment index of smaller element
                bars = this.state.bars;
                this.swapAndShowSwapped(i, j, arr, bars);
                await this.sleep(this.state.speed/2); 
                bars[i] = <Bars key={i} height={this.state.arr[i]} selected=""/>;
                bars[j] = <Bars key={j} height={this.state.arr[j]} selected=""/>;
                bars[low] = <Bars key={low} height={this.state.arr[low]} selected="current"/>;
                this.setState({bars: bars});
                await this.sleep(this.state.speed); 
            }
        }
        bars = this.state.bars;
        this.swapAndShowSwapped(i+1, high, arr, bars);
        await this.sleep(this.state.speed); 
        bars[low] = <Bars key={low} height={this.state.arr[low]} selected=""/>;
        bars[i+1] = <Bars key={i+1} height={this.state.arr[i+1]} selected=""/>;
        bars[high] = <Bars key={high} height={this.state.arr[high]} selected=""/>;
        this.setState({bars: bars});
        return i + 1;
    }
    


  
    // Swaps 2 element of an array at index1 and index2.
    swap(index1, index2, arr){
        let ref = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = ref;
        return arr;
    }

    // Swap 2 element of the state array and the corresponding bars JSX array. And highlight the 2 element swapped. 
    swapAndShowSwapped(i1, i2, arr, bars) {
        arr = this.swap(i1, i2, arr);
        bars = this.swap(i1, i2, bars);
        bars[i1] = <Bars key={i1} height={this.state.arr[i1]} selected="swap"/>;
        bars[i2] = <Bars key={i2} height={this.state.arr[i2]} selected="swap"/>;
        this.setState({arr: arr, bars: bars});
    }

    helperRender() {
        if (this.state.sorted) {
            return (
                <div className="container">
                    {this.state.bars}
                    <Sorted text="The array is sorted!"/>
                </div>
            );
        }
        return (
            <div className="container">
                {this.state.bars}
            </div>
        );
    }

    render() {
        return this.helperRender();
    }

}

export default Array;