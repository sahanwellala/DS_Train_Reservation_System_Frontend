//IT17009096
//Wellala S. S


import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import swal from "sweetalert";
import logo from "../resources/images/logo.png";

export default class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            email: '',
            pwd: '',
            conPwd: '',
            isEmailValid: true,
            isPwdMatched: true
        };
        this.onFNameChange = this.onFNameChange.bind(this);
        this.onLNameChange = this.onLNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPwdChange = this.onPwdChange.bind(this);
        this.onConPwdChange = this.onConPwdChange.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.checkPasswordMatches = this.checkPasswordMatches.bind(this);
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
            conPwd: e.target.value
        })
    }

    checkEmailExists() {

        let email = {
            email: this.state.email
        };

        //http://localhost:4000/users/check-email
        axios.post('http://localhost:8280/profile/check', email).then(res => {
            console.log(res.data);
            let validity = res.data;
            if (parseInt(validity.count) >= 1) {
                this.setState({
                    isEmailValid: false
                })
            } else {
                this.setState({
                    isEmailValid: true
                })
            }

        })
    }

    //Validating the Passwords
    checkPasswordMatches() {
        let pwd = this.state.pwd;
        let conPwd = this.state.conPwd;
        if (pwd === conPwd) {
            this.setState({
                isPwdMatched: true
            })
        } else {
            this.setState({
                isPwdMatched: false
            })
        }
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
        let checkEmailExists = () => {
            if (!this.state.isEmailValid) {
                return <p style={{color: "red"}}>Already Exists Please Enter Another Email !</p>
            } else {
                return null
            }
        };
        let passwordMatch = () => {
            if (!this.state.isPwdMatched) {
                return <p style={{color: "red"}}>Passwords didn't match !</p>
            } else {
                return null;
            }
        };
        return <div>
            <Card border="success" style={{width: '40%', marginTop: "0px"}}>
                <Card.Header><img src={logo} style={{width: "100px", height: "100px"}}/></Card.Header>
                <Card.Body>
                    <Card.Title>Let's get Started. Register from here ...</Card.Title>
                    <form className="form-group" onSubmit={this.onSubmit}>
                        <input type="text" className="form-control" placeholder="First Name"
                               onChange={this.onFNameChange}
                               value={this.state.fName}
                               pattern="[a-zA-Z .]*$"
                               title="Please enter a valid name"
                               required={true}/>
                        <input type="text" className="form-control" placeholder="Last Name"
                               onChange={this.onLNameChange}
                               pattern="[a-zA-Z .]*$"
                               title="Please enter a valid name"
                               value={this.state.lName}
                               required={true}/>
                        {checkEmailExists()}
                        <input type="email" className="form-control" placeholder="Email"
                               onChange={this.onEmailChange}
                               title="Please enter a valid email"
                               value={this.state.email}
                               onBlur={this.checkEmailExists}
                               required={true}/>
                        {passwordMatch()}
                        <input type="password" className="form-control" placeholder="Password"
                               onChange={this.onPwdChange}
                               value={this.state.pwd} required={true}/>
                        <input type="password" className="form-control" placeholder="Confirm Password"
                               onChange={this.onConPwdChange}
                               value={this.state.conPwd} required={true}
                               onBlur={this.checkPasswordMatches}/>

                        <Button variant="primary" type="submit">Register</Button>

                    </form>

                    <Link to="/">Already has a Account?</Link>
                </Card.Body>
            </Card>
        </div>
    }
}