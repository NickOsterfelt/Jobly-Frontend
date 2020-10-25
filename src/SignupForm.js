import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { Form, Label, FormGroup, FormFeedback, Button, Jumbotron, Input, Container } from "reactstrap";
import JoblyApi from "./JoblyApi";

function SignupForm(props) {
    const [formData, setFormData] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function signup() {
            if (loading) {
                try {
                    let _token = await JoblyApi.postSignup(formData);
                    localStorage.setItem("_token", _token);
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
        signup();
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
                <Link to="/login" className="btn btn-primary">Login Page</Link>
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
                        </FormGroup>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input
                                type="first_name"
                                name="first_name"
                                id="first_name"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input
                                type="last_name"
                                name="last_name"
                                id="last_name"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                            />
                            {feedBack}
                        </FormGroup>
                        <Button className="btn btn-success m-2" type="submit">Signup</Button>
                    </Form>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default SignupForm;