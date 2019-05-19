//IT17009096
//Wellala S. S


import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";

const TrainSearchData = props => (
    <tr>
        <td>{props.trainDetails.start}</td>
        <td>{props.trainDetails.end}</td>
        <td>Rs. {props.trainDetails.price}</td>
        <td>{props.date}</td>
        <td>
            {/*<Link to="/train-bookings"/>*/}
            <Button variant="primary" value={props.trainDetails._id}><Link
                to={"/bookings/" + props.trainDetails._id + "/" + props.date}
                style={{color: "inherit", textDecoration: "none",}}>Book</Link></Button>
        </td>
    </tr>
);

export default class AvailableTrains extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainDetails: [],
            transition: false
        }
    }

    componentDidMount() {
        let start = this.props.start;
        let end = this.props.end;

        //let url = 'http://localhost:4000/station-list/trains/' + start + '/' + end;
        let url = 'http://localhost:8280/stationDetails/data/' + start + '/' + end;
        axios.get(url).then(res => {
            let data = res.data;
            this.setState({
                trainDetails: data.trains,
                transition: true
            });
            console.log(this.state.trainDetails);
            //console.log(res.data);

        }).catch(err => {
            console.error(err);
        })
    }

    trainDetails() {
        let date = this.props.date;
        return this.state.trainDetails.map(function (stations, i) {
            return <TrainSearchData trainDetails={stations} date={date} key={i}/>

        })
    }

    render() {
        return <div style={{marginRight: "120px", marginLeft: "-150px"}}>
            <Fade in={this.state.transition}>
                <Card border="success" style={{width: 'auto', float: "right"}}>
                    <Card.Header>Available Trains</Card.Header>
                    <Card.Body>
                        {/*<Card.Title>Success Card Title</Card.Title>*/}
                        {/*<Card.Text>*/}
                        {/*    Some quick example text to build on the card title and make up the bulk*/}
                        {/*    of the card's content.*/}
                        {/*</Card.Text>*/}
                        <table className="table table-striped" style={{marginTop: 20}}>
                            <thead>
                            <tr>
                                <th>Start</th>
                                <th>End</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.trainDetails()}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </Fade>
        </div>;
    }
}