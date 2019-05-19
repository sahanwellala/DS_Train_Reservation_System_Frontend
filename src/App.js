//IT17009096
//Wellala S. S

import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

//Importing the Needed Components
import TrainSearchForm from "./components/TrainSearchForm";
import Booking from "./components/Booking";
import NavBarContainer from "./components/NavBarContainer";
import PaymentContainer from "./components/PaymentContainer";
import LoginContainer from "./components/LoginContainer";
import RegisterContainer from "./components/RegisterContainer";

function App() {

    return (
        <div className="App">
            <Router>
                <NavBarContainer/>
                {/*<TrainSearchForm/>*/}
                <Route path="/home" exact
                       component={() => localStorage.getItem('isLogged') === "true" ? <TrainSearchForm/> :
                           <LoginContainer/>}/>
                <Route path="/" exact component={LoginContainer}/>
                <Route path="/register" exact component={RegisterContainer}/>
                <Route path="/bookings/:id/:date" exact component={Booking}/>
                <Route path='/bookings/payment' exact component={PaymentContainer}/>
            </Router>
        </div>

    );
}

export default App;
