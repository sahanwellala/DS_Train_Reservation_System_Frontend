import React, {Component} from 'react';

export default class StartStations extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let stations = this.props.state.startStations;
        let optionItems = stations.map((station) =>
            <option key={station} value={station}>{station}</option>
        );
        return <div>
            {optionItems}
        </div>
    }
}