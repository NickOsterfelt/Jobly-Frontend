import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { Form, Label, FormGroup, FormFeedback, Button, Jumbotron, Input, Container } from "reactstrap";
import JoblyApi from "./JoblyApi";
import "./Login.css";

function Login(props) {
    const [formData, setFormData] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function login() {
            if (loading) {
                try {
                    let _token = await JoblyApi.postLogin(formData);
                    localStorage.setItem("_token", _token);
                    localStorage.setItem("username", formData.username);
                    // let user = await JoblyApi.getUser(formData.username);
                    // localStorage.setItem("user", JSON.stringify(user));

                    setLoading(false);
                    setFormErrors([]);
                    props.handleLogin();
                    props.history.push("/")
                }
                catch (e) {
                    setFormErrors(e);
                    setLoading(false);
                }
            }
        }
        login();
    }, [loading, formData, props]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
    }
    let feedBack = []
    if (formErrors.length > 0) {
        feedBack = formErrors.map(e => (<FormFeedback key={e}>{e}</FormFeedback>))
    }
    return (
        <div>
            <h3 className="text-right">
                <Link to="/signup" className="btn btn-primary">Signup Page</Link>
            </h3>
            <Jumbotron fluid className="p-2 pt-3 bg-muted rounded">
                <Container fluid>
                    <Form onSubmit={handleSubmit} className="form text-left">
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="username"
                                name="username"
                                id="username"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                onChange={handleChange}
                            />
                            {feedBack}
                        </FormGroup>
                        <Button className="btn btn-success m-2" type="submit">Login</Button>
                    </Form>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Login;