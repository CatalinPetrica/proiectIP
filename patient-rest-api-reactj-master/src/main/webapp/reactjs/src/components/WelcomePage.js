import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import Footer from './components/Footer';
import PatientList from "./components/PatientList";
import Patient from "./components/Patient";
import Login from "./components/Login";


export default function WelcomePage() {

    const heading = "Welcome to WearableHealth";
    const quote = "Good friends, good food, sports, and a long meditation: this is the ideal life.";
    const footer = "Echipa: Vali, Mihai, Cata, Andra, Adi, Mario, Denis, Tania, Raul^2";

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                            <Route path="/add" exact component={Patient}/>
                            <Route path="/edit/:id" exact component={Patient}/>
                            <Route path="/list" exact component={PatientList}/>
                            <Route path="/users" exact component={UserList}/>
                            <Route path="/login" exact component={Login}/>

                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>

        </Router>
    );
}
