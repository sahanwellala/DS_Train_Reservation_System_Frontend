import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import StartStations from "./StartStations";
import EndStations from "./EndStations";
import AvailableTrains from "./AvailableTrains";
import logo from "../resources/images/logo.png";

export default class TrainSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',
            date: '',
            isSearchClicked: false,
            startStations: [],
            endStations: []
        };
        this.onStartSelectedChange = this.onStartSelectedChange.bind(this);
        this.onEndSelectedChange = this.onEndSelectedChange.bind(this);
        this.onDateSelected = this.onDateSelected.bind(this);
        this.onSearchClicked = this.onSearchClicked.bind(this);
    }

    onStartSelectedChange(e) {
        this.setState({
            start: e.target.value,
            isSearchClicked: false
        });
        console.log(this.state.start);
    }

    onEndSelectedChange(e) {
        this.setState({
            end: e.target.value,
            isSearchClicked: false
        });
        console.log(this.state.end);
    }

    onDateSelected(e) {
        this.setState({
            date: e.target.value,
            isSearchClicked: false
        })
    }

    onSearchClicked() {
        this.setState({
            isSearchClicked: true
        })
    }

    componentDidMount() {
        let stations = [];
        axios.get('http://localhost:8280/stationDetails/stations/start').then(res => {
            console.log(res.data);
            return res.data
        }).then(data => {
            stations = data.stations.map((station) => {
                return station
            });
            console.log(stations);
            this.setState({
                startStations: stations
            })
        }).catch(err => {
            console.error(err);
        });

        let stationsEnd = [];
        axios.get('http://localhost:8280/stationDetails/stations/end').then(res => {
            console.log(res.data);
            return res.data
        }).then(data => {
            stationsEnd = data.stations.map((station) => {
                return station
            });
            this.setState({
                endStations: stationsEnd
            })
        }).catch(err => {
            console.error(err);
        });


    }


    render() {
        let searchResults = () => {
            return <AvailableTrains start={this.state.start} end={this.state.end} date={this.state.date}/>
        };
        return <div>

            <div className="mainTrainSearchForm">
                <Card style={{minWidth: "350px"}}>
                    <Card.Header as="h3">
                        <img src={logo} style={{width: "100px", height: "100px"}}/>
                    </Card.Header>

                    <Card.Body>
                        {/*<Card.Title>Special title treatment</Card.Title>*/}
                        {/*<Card.Text>*/}
                        {/*    With supporting text below as a natural lead-in to additional content.*/}
                        {/*</Card.Text>*/}
                        <form>
                            <div className="form-group">
                                <input list="stationStartList" name="start" className="form-control"
                                       required={true}
                                       placeholder="Start Station"
                                       onFocus={this.onStartSelectedChange}
                                       onBlur={this.onStartSelectedChange}
                                       onSelect={this.onStartSelectedChange}/>
                                <datalist id="stationStartList">
                                    {/*<option value="A"/>*/}
                                    {/*<option value="B"/>*/}
                                    <StartStations state={this.state}/>
                                </datalist>

                                <input list="stationEndList" name="end" className="form-control" required={true}
                                       placeholder="End Station"
                                       onFocus={this.onEndSelectedChange}
                                       onBlur={this.onEndSelectedChange}
                                       onSelect={this.onEndSelectedChange}
                                />
                                <datalist id="stationEndList">
                                    {/*<option value="A"/>*/}
                                    {/*<option value="B"/>*/}
                                    <EndStations state={this.state}/>
                                </datalist>
                                <input type="date" className="form-control" required={true} placeholder="Date"
                                       onChange={this.onDateSelected}/>
                            </div>
                        </form>
                        <Button variant="primary" onClick={this.onSearchClicked}>Search Trains</Button>
                    </Card.Body>
                </Card>;

                {this.state.isSearchClicked && searchResults()}

            </div>
        </div>
    }
}