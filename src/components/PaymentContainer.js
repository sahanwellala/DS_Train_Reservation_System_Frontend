import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import swal from "sweetalert";

export default class PaymentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalBill: localStorage.getItem('total'),
            paymentType: 'credit card',
            userType: 'nonGov',
            cardName: '',
            cardNumber: '',
            cvcNum: '',
            exDate: '',
            mobileNum: '',
            pinNum: '',
            nic: '',
            discount: 'no',
            isNICInvalid: 'no'
        };
        this.onCreditCardSelected = this.onCreditCardSelected.bind(this);
        this.onMobilePaySelected = this.onMobilePaySelected.bind(this);
        this.onUserIsGovernment = this.onUserIsGovernment.bind(this);
        this.onUserIsNotGovernment = this.onUserIsNotGovernment.bind(this);
        this.onMobileNumberChange = this.onMobileNumberChange.bind(this);
        this.onPINNumberChange = this.onPINNumberChange.bind(this);
        this.onCardHoldersNameChange = this.onCardHoldersNameChange.bind(this);
        this.onCardNumberChange = this.onCardNumberChange.bind(this);
        this.onCVCNumberChange = this.onCVCNumberChange.bind(this);
        this.onExpirationDateChange = this.onExpirationDateChange.bind(this);
        this.onNICNumberChange = this.onNICNumberChange.bind(this);
        this.onGovEmployeeValidation = this.onGovEmployeeValidation.bind(this);
        this.onPaymentFormSubmit = this.onPaymentFormSubmit.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    onCreditCardSelected(e) {
        this.setState({
            paymentType: 'credit card'
        })
    }

    onMobilePaySelected(e) {
        this.setState({
            paymentType: 'mobile'
        })
    }

    onUserIsGovernment(e) {
        this.setState({
            userType: 'gov'
        })
    }

    onUserIsNotGovernment(e) {
        this.setState({
            userType: 'nonGov',
            totalBill: localStorage.getItem('total')
        })
    }

    onMobileNumberChange(e) {
        this.setState({
            mobileNum: e.target.value
        })
    }

    onPINNumberChange(e) {
        this.setState({
            pinNum: e.target.value
        })
    }

    onCardHoldersNameChange(e) {
        this.setState({
            cardName: e.target.value
        })

    }

    onCardNumberChange(e) {
        this.setState({
            cardNumber: e.target.value
        })
    }

    onCVCNumberChange(e) {
        this.setState({
            cvcNum: e.target.value
        })
    }

    onExpirationDateChange(e) {
        this.setState({
            exDate: e.target.value
        })
    }

    onNICNumberChange(e) {
        this.setState({
            nic: e.target.value
        });
    }

    onGovEmployeeValidation() {
        console.log('checking gov employee');
        console.log(this.state.nic);
        if (this.state.userType === 'gov') {
            if (this.state.nic) {
                const nic = {
                    nic: this.state.nic
                };
                axios.post('http://localhost:4000/gov/employee/validate', nic).then(res => {
                    let data = res.data;
                    console.log(data);
                    if (data.success === true) {
                        let newAmount = parseFloat(localStorage.getItem('total')) * 0.95;
                        this.setState({
                            discount: 'yes',
                            totalBill: newAmount,
                            isNICInvalid: 'no'
                        });

                    } else {
                        console.log('Calling No');
                        this.setState({
                            discount: 'no',
                            totalBill: localStorage.getItem('total'),
                            isNICInvalid: 'yes'
                        })
                    }
                })
            }
        } else {
            this.setState({
                discount: 'no',
                totalBill: localStorage.getItem('total')
            })


        }
    }

    clearFields() {
        this.setState({
            totalBill: localStorage.getItem('total'),
            paymentType: 'credit card',
            userType: 'nonGov',
            cardName: '',
            cardNumber: '',
            cvcNum: '',
            exDate: '',
            mobileNum: '',
            pinNum: '',
            nic: '',
            discount: 'no',
            isNICInvalid: 'no'
        })
    }

    onPaymentFormSubmit(e) {
        e.preventDefault();
        console.log('From button call this methods');
        if (this.state.paymentType === 'credit card') {
            console.log('Credit Card Pay');
            const paymentDetails = {
                cardName: this.state.cardName,
                cardNum: this.state.cardNumber,
                cvcNum: this.state.cvcNum,
                exDate: this.state.cvcNum,
                totalBill: this.state.totalBill
            };
            console.log(paymentDetails);
            //http://localhost:4000/sampath/creditCard/validation

            axios.post('http://localhost:8280/profile/validate/sampath', paymentDetails).then(res => {
                let data = res.data;
                if (data.success) {
                    swal('Ticket Reserved !', data.message, "success").then(() => {

                        const bookingData = {
                            userID: localStorage.getItem('userID'),
                            start: localStorage.getItem('start'),
                            end: localStorage.getItem('end'),
                            date: localStorage.getItem('date'),
                            qty: localStorage.getItem('qty'),
                            total: this.state.totalBill

                        };
                        console.log(bookingData);

                        //http://localhost:4000/bookings/add

                        axios.post('http://localhost:8280/profile/bookings/add', bookingData).then((res) => {

                            let bookingData = res.data;
                            console.log(bookingData);

                            //To send an Email Confirming the Payment
                            let to = localStorage.getItem('email');
                            let subject = 'Train Ticket Reservation Successful ';
                            let content = 'Hi ' + localStorage.getItem('fName') + '<br/>' + '<br/>' +
                                'You have successfully ' +
                                'completed the payment process and following are the details of you reservation. <br/> ' +
                                'Name : ' + localStorage.getItem('fName') + ' ' + localStorage.getItem('lName') + '<br/>' +
                                'Start Station : ' + localStorage.getItem('start') + '<br/>' +
                                'End Station : ' + localStorage.getItem('end') + '<br/>' +
                                'Date : ' + localStorage.getItem('date') + '<br/>' +
                                'Qty : ' + localStorage.getItem('qty') + '<br/>' +
                                '<b>Total Amount : Rs.' + this.state.totalBill.toString() + '</b>' +
                                '<br/>' + '<br/>' +
                                'This is a System generated Message so no signature is needed . <br/> Thank you !';

                            let emailData = {
                                to,
                                subject,
                                content
                            };
                            //http://localhost:4000/bookings/sendMail

                            axios.post('http://localhost:8280/profile/mail', emailData).then(res => {
                                let data = res.data;
                                swal("Email Sent", 'Confirmation email is sent to : ' + localStorage.getItem('email'), "success").then(() => {
                                    this.clearFields();
                                    window.location.href = 'http://localhost:3000/home';
                                })
                            })
                        })
                    })
                } else {
                    swal("Oops!", data.message, "error")
                        .then(() => {

                        });
                }
            });


        } else if (this.state.paymentType === 'mobile') {
            const paymentDetails = {
                mobileNum: this.state.mobileNum,
                pinNum: this.state.pinNum,
                amount: this.state.totalBill
            };

            //http://localhost:4000/dialog/bill/auth

            axios.post('http://localhost:8280/profile/dialog/validate', paymentDetails).then(res => {
                let data = res.data;
                console.log(data);
                if (data.success) {
                    console.log('Email Sending method invokes');
                    swal('Ticket Reserved !', data.message, "success").then(() => {

                        const bookingData = {
                            userID: localStorage.getItem('userID'),
                            start: localStorage.getItem('start'),
                            end: localStorage.getItem('end'),
                            date: localStorage.getItem('date'),
                            qty: localStorage.getItem('qty'),
                            total: this.state.totalBill

                        };
                        console.log(bookingData);
                        axios.post('http://localhost:8280/profile/bookings/add', bookingData).then((res) => {


                            //To send an Email Confirming the Payment
                            let to = localStorage.getItem('email');
                            let subject = 'Train Ticket Reservation Successful ';
                            let content = 'Hi ' + localStorage.getItem('fName') + '<br/>' +
                                'You have successfully ' +
                                'completed the payment process and following are the details of you reservation. <br/> ' +
                                'Name : ' + localStorage.getItem('fName') + ' ' + localStorage.getItem('lName') + '<br/>' +
                                'Start Station : ' + localStorage.getItem('start') + '<br/>' +
                                'End Station : ' + localStorage.getItem('end') + '<br/>' +
                                'Date : ' + localStorage.getItem('date') + '<br/>' +
                                'Qty : ' + localStorage.getItem('qty') + '<br/>' +
                                '<b>Total Amount : Rs.' + this.state.totalBill.toString() + '</b>' +
                                '<br/>' + '<br/>' +
                                'This is a System generated Message so no signature is needed . <br/> ' +
                                'Thank you !';

                            let emailData = {
                                to,
                                subject,
                                content
                            };
                            axios.post('http://localhost:8280/profile/mail', emailData).then(res => {
                                let data = res.data;
                                swal("Email Sent", 'Confirmation email is sent to : ' + localStorage.getItem('email'), "success").then(() => {
                                    console.log(data);
                                    this.clearFields();
                                    window.location.href = 'http://localhost:3000/home';

                                })
                            })
                        })
                    })
                } else {
                    swal("Oops!", data.message, "error")
                        .then(() => {

                        });
                }
            })
        }

    }

    render() {
        let paymentForm = () => {
            if (this.state.paymentType === 'credit card') {
                return <div>
                    <br/>

                    <label style={{float: "left"}}>Card Holders Name : </label>
                    <input type="text" className="form-control" required={true}
                           onChange={this.onCardHoldersNameChange}
                           value={this.state.cardName}
                           pattern="[a-zA-Z .]*$"
                           title="Please Enter a valid Name"/>

                    <div className="form-group">
                        <label htmlFor="cardNum" style={{float: "left"}}>Credit Card Number :</label>
                        <input type="text" className="form-control" id="cardNum" onChange={this.onCardNumberChange}
                               required={true} value={this.state.cardNumber}
                               pattern="[0-9]{16}"
                               title="Please enter the 16 digit Number"/>
                    </div>

                    <label style={{float: "left"}}>CVC Number : </label>
                    <input type="text" className="form-control" onChange={this.onCVCNumberChange}
                           required={true}
                           value={this.state.cvcNum}
                           pattern="[0-9]{3}"
                           title="Please enter the 3 digit Number in the Back"/>

                    <label style={{float: "left"}}>Expiration Date : </label>
                    <input type="text"
                           pattern="[0-9]{2}/[0-9]{2}"
                           className="form-control"
                           required={true}
                           placeholder="MM/YY"
                           onChange={this.onExpirationDateChange}
                           title="MM/YY"/>

                </div>
            } else if (this.state.paymentType === 'mobile') {
                return <div>
                    <div className="form-group">
                        <label htmlFor="mobileNum" style={{float: "left"}}>Mobile Number :</label>
                        <input type="text" className="form-control" id="mobileNum" onChange={this.onMobileNumberChange}
                               required={true} value={this.state.mobileNum}
                               pattern="[0-9]{10}"
                               title="Please enter a valid Phone Number. Ex: 0771234567"/>

                        <label htmlFor="pin" style={{float: "left"}}>PIN Number :</label>
                        <input type="text" className="form-control" id="pin" onChange={this.onPINNumberChange}
                               required={true} value={this.state.pinNum}
                               pattern="[0-9]{4}"
                               title="Please enter a valid PIN Number of four digits"/>
                    </div>
                </div>

            }
        };

        let govOrNot = () => {
            if (this.state.userType === 'gov') {
                return <div>
                    <label style={{float: "left"}}>NIC Number : </label>
                    {nicWrong()}
                    <input type="text" className="form-control" onChange={this.onNICNumberChange} required={true}
                           value={this.state.nic}
                           onBlur={this.onGovEmployeeValidation}
                           onClick={this.onGovEmployeeValidation}
                           onFocus={this.onGovEmployeeValidation}
                           title="Please enter the National ID card Number"/>
                    {discount()}
                </div>
            }
        };

        let nicWrong = () => {
            if (this.state.isNICInvalid === 'yes') {
                return <div>
                    <p style={{color: "red"}}>Invalid Government Employeee NIC number </p>
                </div>
            }
        };

        let discount = () => {
            if (this.state.discount === 'yes') {
                return <div>
                    <label style={{float: "left"}}>Discount : </label>
                    <input type="text" className="form-control" readOnly={true} required={true}
                           value="5% OFF From Total Amount"/>
                </div>
            } else if (this.state.discount === 'no') {
                return null;
            }
        };

        return <div>
            <Card border="success" style={{width: '40%'}}>
                <Card.Header><h4>Payment Details</h4></Card.Header>
                <Card.Body>
                    <form className="form-group" onSubmit={this.onPaymentFormSubmit}>

                        <label className="form-group" style={{marginLeft: "-265px"}}>Please select the Payment Type
                            :</label><br/>

                        <div className="row" style={{marginLeft: "8px"}}>
                            <label className="radio-inline" style={{float: "left"}}>
                                <input type="radio" name="paymentType" value="credit card"
                                       onChange={this.onCreditCardSelected}
                                       style={{marginTop: "15px"}}
                                       checked={this.state.paymentType === 'credit card'}/>Credit Card
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="accType" value="mobile"
                                       onChange={this.onMobilePaySelected}
                                       style={{marginLeft: "20px", marginTop: "15px"}}
                                       checked={this.state.paymentType === 'mobile'}/>Mobile Pay
                            </label>

                        </div>
                        {paymentForm()}

                        <label className="form-group" style={{marginLeft: "-265px"}}>
                            Are you a Government Employee ?</label>

                        <div className="row" style={{marginLeft: "8px"}}>
                            <label className="radio-inline" style={{float: "left"}}>
                                <input type="radio" name="userType" value="yes"
                                       onChange={this.onUserIsGovernment}
                                       style={{marginTop: "15px"}}
                                       checked={this.state.userType === 'gov'}/>Yes
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="userType" value="no"
                                       onChange={this.onUserIsNotGovernment}
                                       style={{marginLeft: "20px", marginTop: "15px"}}
                                       checked={this.state.userType === 'nonGov'}/>No
                            </label>
                        </div>

                        {govOrNot()}

                        <label style={{float: "left"}}>Amount : </label>
                        <input type="text" className="form-control" readOnly={true} required={true}
                               value={"Rs. " + this.state.totalBill}/>

                        <Button variant="primary" type="submit" style={{marginTop: "10px"}}>Pay</Button>
                    </form>
                </Card.Body>
            </Card>
        </div>
    }
}