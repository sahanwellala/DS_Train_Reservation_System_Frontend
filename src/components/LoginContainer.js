import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import logo from "../resources/images/logo.png";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: ''
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPwdChange = this.onPwdChange.bind(this);
        this.onLoginClicked = this.onLoginClicked.bind(this);
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

    onLoginClicked(e) {
        e.preventDefault();
        const userCredentials = {
            email: this.state.email,
            pwd: this.state.pwd
        };

        //http://localhost:4000/trainReservations/users/login
        axios.post('http://localhost:8280/profile/api/login', userCredentials).then(res => {
            let data = res.data;
            if (data.success === true) {
                localStorage.setItem('fName', data.user.fName);
                localStorage.setItem('lName', data.user.lName);
                localStorage.setItem('email', data.user.email);

                swal("Welcome " + localStorage.getItem('fName'), data.message, "success").then(() => {
                    window.location.href = 'http://localhost:3000/home';
                })
            } else {
                swal("Oops!", data.message, "error")
                    .then(() => {
                        window.location.href = 'http://localhost:3000/';
                    });
            }
        })

    }

    render() {
        return <div>
            <Card style={{width: "30%", marginTop: "60px"}}>
                <Card.Header as="h3">
                    <img src={logo} style={{width: "100px", height: "100px"}}/>
                </Card.Header>

                <Card.Body>
                    <Card.Title>Please Log in to Continue ...</Card.Title>
                    {/*<Card.Text>*/}
                    {/*    With supporting text below as a natural lead-in to additional content.*/}
                    {/*</Card.Text>*/}
                    <form onSubmit={this.onLoginClicked}>
                        <div className="form-group">
                            <input type="text" name="userName" className="form-control" placeholder="Email"
                                   value={this.state.email} required={true} onChange={this.onEmailChange}/>
                            <input type="password" name="userName" className="form-control" placeholder="Password"
                                   value={this.state.pwd} required={true} onChange={this.onPwdChange}/>
                        </div>
                        <Button variant="primary" type="submit">Login</Button>
                    </form>
                    <br/>
                    <Link to="/register">Need an Account ?</Link>
                </Card.Body>
            </Card>;
        </div>
    }
}