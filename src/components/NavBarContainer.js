//IT17009096
//Wellala S. S


import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../resources/images/logo.png";
import NavLink from "react-bootstrap/NavLink";
import swal from "sweetalert";

export default class NavBarContainer extends Component {
    constructor(props) {
        super(props)
        this.onLogOutClicked = this.onLogOutClicked.bind(this);
    }

    onLogOutClicked() {
        let fName = localStorage.getItem('fName');
        localStorage.removeItem('fName');
        localStorage.removeItem('lName');
        localStorage.removeItem('email');
        localStorage.removeItem('isLogged');

        swal("See you Soon " + fName, 'You are Successfully logged out !', "success").then(() => {
            window.location.href = 'http://localhost:3000';
        })
    }

    render() {
        let NavBarBrand = () => {
            if (localStorage.getItem('fName')) {
                return <Navbar.Brand href="/home" style={{fontFamily: 'Akbaal'}}><img src={logo} style={{
                    width: "36px",
                    height: "36px",
                    marginRight: "10px"
                }}/>Train Reservation</Navbar.Brand>
            } else {
                return <Navbar.Brand href="/" style={{fontFamily: 'Akbaal'}}><img src={logo} style={{
                    width: "36px",
                    height: "36px",
                    marginRight: "10px"
                }}/>Train Reservation</Navbar.Brand>
            }
        };
        let nameNavLink = () => {
            if (localStorage.getItem('fName')) {
                return <Nav>
                    <Nav.Link href="/home">{localStorage.getItem('fName')}</Nav.Link>
                    <Nav.Link eventKey={2} onClick={this.onLogOutClicked}>Logout</Nav.Link>
                </Nav>
            } else {
                return <Nav>
                    <NavLink href="/">Login</NavLink>
                </Nav>
            }
        };
        return (

            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                    {NavBarBrand()}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>

                        {nameNavLink()}


                    </Navbar.Collapse>
                </Navbar>;
            </div>
        );
    }
}