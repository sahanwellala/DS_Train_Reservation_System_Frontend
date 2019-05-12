import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import swal from "sweetalert";

export default class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            email: '',
            pwd: '',
            ConPwd: ''
        };
        this.onFNameChange = this.onFNameChange.bind(this);
        this.onLNameChange = this.onLNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPwdChange = this.onPwdChange.bind(this);
        this.onConPwdChange = this.onConPwdChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFNameChange(e) {
        this.setState({
            fName: e.target.value
        })
    }

    onLNameChange(e) {
        this.setState({
            lName: e.target.value
        })
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    onPwdChange(e) {
        this.setState({
            pwd: e.target.value
        })
    }

    onConPwdChange(e) {
        this.setState({
            ConPwd: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const userDetails = {
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            pwd: this.state.pwd
        };


        //http://localhost:4000/trainReservations/users/register

        axios.post('http://localhost:8280/profile/api/register', userDetails).then(res => {
            let data = res.data;
            if (data.success === true) {
                swal("Great !", res.data.message + ' Please Log into continue', "success").then(() => {
                    window.location.href = 'http://localhost:3000';
                })
            } else {
                swal("Oops!", data.message, "error")
                    .then(() => {
                        window.location.href = 'http://localhost:3000/home';
                    });
            }
        })

    }

    render() {
        return <div>
            <Card border="success" style={{width: '40%', marginTop: "20px"}}>
                <Card.Header><h4>Register</h4></Card.Header>
                <Card.Body>
                    <Card.Title>Please enter the details below</Card.Title>
                    <form className="form-group" onSubmit={this.onSubmit}>
                        <input type="text" className="form-control" placeholder="First Name"
                               onChange={this.onFNameChange}
                               value={this.state.fName}
                               required={true}/>
                        <input type="text" className="form-control" placeholder="Last Name"
                               onChange={this.onLNameChange}
                               value={this.state.lName}
                               required={true}/>
                        <input type="email" className="form-control" placeholder="Email"
                               onChange={this.onEmailChange}
                               value={this.state.email}
                               required={true}/>
                        <input type="password" className="form-control" placeholder="Password"
                               onChange={this.onPwdChange}
                               value={this.state.pwd} required={true}/>
                        <input type="password" className="form-control" placeholder="Confirm Password"
                               onChange={this.onConPwdChange}
                               value={this.state.ConPwd} required={true}/>

                        <Button variant="primary" type="submit">Register</Button>

                        <Link to="/">Already has a Account?</Link>

                    </form>
                </Card.Body>
            </Card>
        </div>
    }
}