import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class Patient extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
      /*  this.state = {
            genres: [],
            languages : [],
            show : false
        };*/
        this.patientChange = this.patientChange.bind(this);
        this.submitPatient = this.submitPatient.bind(this);
    }

    initialState = {
        id:'', name:'', surname:'',username:'', cnp:'', age:'', country:'', county:'', city:'',
        adress:'', phone:'', email:'', job:''
    };

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if(bookId) {
            this.findBookById(bookId);
        }

    }




    findPatientById = (patientId) => {
        axios.get("http://localhost:3036/rest/patient/"+patientId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        surname: response.data.surname,
                        username: response.data.username,
                        patientPhotoURL: response.data.patientPhotoURL,
                        cnp: response.data.cnp,
                        age: response.data.age,
                        country: response.data.country,
                        county: response.data.county,
                        city: response.data.city,
                        adress: response.data.adress,
                        phone: response.data.phone,
                        email: response.data.email,
                        job: response.data.job,
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    resetPatient = () => {
        this.setState(() => this.initialState);
    };

    /*submitBook = event => {

        //alert('Name: '+this.state.name+'Surname: '+ this.state.surname)
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8081/rest/books", {
            method: 'POST',
            body: JSON.stringify(book),
            headers
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    };*/

    submitPatient = event => {
        event.preventDefault();

        const patient = {
            id: this.state.id,
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            patientPhotoURL: this.state.patientPhotoURL,
            cnp: this.state.cnp,
            age: this.state.age,
            country: this.state.country,
            county: this.state.county,
            city: this.state.city,
            adress: this.state.adress,
            phone: this.state.phone,
            email: this.state.email,
            job: this.state.job,
        };

        axios.post("http://localhost:3036/rest/patient", patient)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    /*updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8081/rest/books", {
            method: 'PUT',
            body: JSON.stringify(book),
            headers
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.bookList(), 3000);
            } else {
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    };*/

    updatePatient = event => {
        event.preventDefault();

        const patient = {
            id: this.state.id,
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            patientPhotoURL: this.state.patientPhotoURL,
            cnp: this.state.cnp,
            age: this.state.age,
            country: this.state.country,
            county: this.state.county,
            city: this.state.city,
            adress: this.state.adress,
            phone: this.state.phone,
            email: this.state.email,
            job: this.state.job,
        };

        axios.put("http://localhost:3036/rest/patient", patient)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.bookList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    patientChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    bookList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {name, surname, username, patientPhotoURL, cnp, age, country,county, city, adress, phone, email, job} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Patient Updated Successfully." : "Patient Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Patient" : "Add New Patient"}
                    </Card.Header>
                    <Form onReset={this.resetPatient} onSubmit={this.state.id ? this.updatePatient : this.submitPatient} id="patientFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="name"
                                        value={name} onChange={this.patientChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Patient Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridSurname">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="surname"
                                        value={surname} onChange={this.patientChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Patient Surname" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="username"
                                                  value={username} onChange={this.patientChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Patient Username" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="password"
                                                  value={name} onChange={this.patientChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Patient Password" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPatientPhotoURL">
                                    <Form.Label>Patient Photo URL</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="patientPhotoURL"
                                        value={patientPhotoURL} onChange={this.patientChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Patient Photo URL" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAge">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="age"
                                                  value={age} onChange={this.patientChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Patient Age" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridcnp">
                                    <Form.Label>CNP</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="cnp"
                                        value={cnp} onChange={this.patientChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Patient CNP" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="country"
                                        value={country} onChange={this.patientChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Patient Country" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCounty">
                                    <Form.Label>County</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.patientChange}
                                        name="county" value={county}
                                        className={"bg-dark text-white"}>
                                        {this.state.county.map(county =>
                                            <option key={county.value} value={county.value}>
                                                {county.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="city"
                                                  value={city} onChange={this.patientChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Patient City" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAdress">
                                    <Form.Label>Adress</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="adress"
                                                  value={adress} onChange={this.patientChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Patient Adress" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="phone"
                                                  value={phone} onChange={this.patientChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Patient Phone" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="email"
                                                  value={email} onChange={this.patientChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Patient Email" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridJob">
                                    <Form.Label>Job</Form.Label>
                                    <Form.Control required as="select"
                                                  custom onChange={this.patientChange}
                                                  name="job" value={job}
                                                  className={"bg-dark text-white"}>
                                        {this.state.job.map(job =>
                                            <option key={job.value} value={job.value}>
                                                {job.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Book List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}