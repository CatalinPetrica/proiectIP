import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import './Style.css';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        console.log(username);
        return username.length > 0 && password.length > 0;

    }

    function handleSubmit(event) {
        event.preventDefault();
       // console.log(email);
       // console.log(password);

        axios({
            method: 'post',
            url: 'http://13.58.63.43:8080/wearablehealth/users/checkCredentials',
            data: {
                username: username,
                password: password
            }
        }).then(response=> {

            this.setState({
                role: response.data,

            })

        })

    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <FormLabel style={{color: "white"}}>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel style={{color: "white"}}>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}
