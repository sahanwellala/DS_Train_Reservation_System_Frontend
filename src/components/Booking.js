//IT17009096
//Wellala S. S



import React, {Component} from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',
            price: 0,
            trainID: '',
            date: '',
            qty: 1,
            total: 0
        };
        this.onQtyChange = this.onQtyChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTotal = this.onChangeTotal.bind(this);
    }

    componentDidMount() {
        let date = this.props.match.params.date;
        console.log(date);

        //http://localhost:4000/station-list/bookings/
        axios.get('http://localhost:8280/stationDetails/train/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    start: response.data.start,
                    end: response.data.end,
                    price: response.data.price,
                    date: date,
                    trainID: response.data.id
                })
            }).then(() => {
            this.onChangeTotal();
        }).catch(err => {
            console.error(err);
        });
    }

    onChangeTotal() {
        this.setState({
            total: this.state.qty * this.state.price
        })
    }

    onQtyChange(e) {
        if (e.target.value < 1) {
            this.setState({
                qty: 1
            })
        }
        if (this.state.qty < 1) {
            this.setState({
                qty: 1
            });
            return;
        }

        this.setState({
            qty: e.target.value
        });
        this.onChangeTotal();
    }

    onSubmit(e) {
        e.preventDefault();
        const finalBookingDetails = {
            trainID: this.state.trainID,
            start: this.state.start,
            end: this.state.end,
            date: this.state.date,
            qty: this.state.qty,
            total: this.state.total
        };
        localStorage.setItem('trainID', finalBookingDetails.trainID);
        localStorage.setItem('start', finalBookingDetails.start);
        localStorage.setItem('end', finalBookingDetails.end);
        localStorage.setItem('date', finalBookingDetails.date);
        localStorage.setItem('qty', finalBookingDetails.qty);
        localStorage.setItem('total', finalBookingDetails.total);

        window.location.href = 'http://localhost:3000/bookings/payment';

    }


    render() {
        return <div>
            <Card border="success" style={{width: '40%', marginLeft: "auto", marginRight: "auto"}}>
                <Card.Header><h4>Booking Details</h4></Card.Header>
                <Card.Body>
                    {/*<Card.Title>Success Card Title</Card.Title>*/}
                    {/*<Card.Text>*/}
                    {/*    Some quick example text to build on the card title and make up the bulk*/}
                    {/*    of the card's content.*/}
                    {/*</Card.Text>*/}

                    <form onSubmit={this.onSubmit}>

                        <div className="row" style={{marginRight: "10px"}}>

                            <label className="col-md-2" style={{marginTop: "18px"}}>From : </label>
                            <input type="text"
                                   className="form-control col-md-10"
                                   readOnly={true}
                                   value={this.state.start}/>
                        </div>
                        <div className="row" style={{marginRight: "10px"}}>
                            <label className="col-md-2" style={{marginTop: "18px"}}>To : </label>
                            <input type="text"
                                   className="form-control col-md-10"
                                   readOnly={true}
                                   value={this.state.end}/>
                        </div>

                        <div className="row" style={{marginRight: "10px"}}>
                            <label className="col-md-2" style={{marginTop: "18px"}}>Date : </label>
                            <input type="date"
                                   className="form-control col-md-10"
                                   readOnly={true}
                                   value={this.state.date}/>
                        </div>

                        <div className="row" style={{marginRight: "10px"}}>
                            <label className="col-md-2" style={{marginTop: "18px"}}>Price : </label>
                            <input type="text"
                                   className="form-control col-md-10"
                                   readOnly={true}
                                   value={this.state.price}/>
                        </div>

                        <div className="row" style={{marginRight: "10px"}}>
                            <label className="col-md-2" style={{marginTop: "18px"}}>Qty :</label>
                            <input type="number"
                                   className="form-control col-md-10"
                                   readOnly={false}
                                   onChange={this.onQtyChange}
                                   onFocus={this.onQtyChange}
                                   onBlur={this.onQtyChange}
                                   onSelect={this.onQtyChange}
                                   onClickCapture={this.onQtyChange}
                                   value={this.state.qty}/>
                        </div>
                        <div className="row" style={{marginRight: "10px"}}>
                            <label className="col-md-2" style={{marginTop: "18px"}}>Total : </label>
                            <input type="text"
                                   className="form-control col-md-10"
                                   readOnly={true}
                                   value={"Rs. " + this.state.total}/>
                        </div>
                        <div className="row">
                            <Button variant="primary" type="submit"
                                    style={{marginRight: "23px", marginLeft: "85px"}}>Proceed To CheckOut</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    }
}