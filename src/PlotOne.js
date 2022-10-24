import React, { Component } from 'react';
import Plot from "react-plotly.js";

class PlotOne extends Component {
    constructor(props){
        super(props);
        this.state ={ data: [] }
    }

    componentDidMount() {
        const endpoint = "https://data.cityofnewyork.us/resource/rc75-m7u3.json"
        
         fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState( {data: data})
            })
                

    }

    transformData (data) {
        let plot_data = [];

        let x = [];
        let y = [];
        data.map(each => {
            x.push(each.date_of_interest)
            y.push(each.case_count)

        })
        plot_data['x'] =x;
        plot_data['y'] =y;

        console.log(plot_data)

        return plot_data
        
    }

    

    render() {
        return (
            <div>
               
                <Plot 
                      data= {[
                        {type: 'scatter',
                         mode: 'lines',
                         x: this.transformData(this.state.data)['x'],
                         y: this.transformData(this.state.data)['y'],
                         marker: { color : 'black'}}
                        
                    ]}
                    layout ={{width: 1100 , height: 800, title: 'NEW YORK COVID DATA 2020-2022'}}
                    />
            </div>
        )
    }
}

export default PlotOne;




