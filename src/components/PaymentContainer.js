import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";

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
            pinNum: ''
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
        this.onPaymentFormSubmit = this.onPaymentFormSubmit.bind(this);
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
            userType: 'nonGov'
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

    onPaymentFormSubmit(e) {
        e.preventDefault();


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
                           pattern="[a-zA-Z]+"
                           title="Please Enter a valid Name"/>

                    <div className="form-group">
                        <label htmlFor="cardNum" style={{float: "left"}}>Credit Card Number :</label>
                        <input type="text" className="form-control" id="cardNum" onChange={this.onCardNumberChange}
                               required={true} value={this.state.cardNumber}
                               pattern="[0-9]{16}"
                               title="Please enter the 16 digit Number"/>
                    </div>

                    <label style={{float: "left"}}>CVC Number : </label>
                    <input type="number" className="form-control" onChange={this.onCVCNumberChange} required={true}
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
                               title="Please enter a valid Phone Number. Ex: 0771234567"/>
                    </div>
                </div>

            }
        };

        let govOrNot = () => {
            if (this.state.userType === 'gov') {
                return <div>
                    <label style={{float: "left"}}>NIC Number : </label>
                    <input type="text" className="form-control" onChange={this.onCVCNumberChange} required={true}
                           value={this.state.cvcNum}
                           title="Please enter the National ID card Number"/>
                </div>
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