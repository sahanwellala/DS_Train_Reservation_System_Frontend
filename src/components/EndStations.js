//IT17009096
//Wellala S. S


import React, {Component} from 'react';

export default class EndStations extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let stations = this.props.state.endStations;
        let optionItems = stations.map((station) =>
            <option key={station} value={station}>{station}</option>
        );
        return <div>
            {optionItems}
        </div>
    }
}