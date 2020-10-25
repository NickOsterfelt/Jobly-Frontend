import React, { useState, useEffect } from "react";
import { Form, Label, FormGroup, FormFeedback, Button, Jumbotron, Input, Container } from "reactstrap";
import JoblyApi from "./JoblyApi";

function Profile(props) {
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    //gets user data to fill in form fields
    useEffect(()=> {
        async function getUserData() {
            let username = localStorage.getItem("username");
            let foundUser = await JoblyApi.getUser(username);
            setUser(foundUser);
        }
        getUserData();
    }, [])

    useEffect(() => {
        async function signup() {
            if (loading) {
                try {
                    let username = localStorage.getItem("username");
                    let data = {first_name: formData.first_name, last_name: formData.last_name, email: formData.email, password: formData.password}
                    
                    //remove undefined fields in data
                    for(let key of Object.keys(data)){
                        if(!data[key]){
                            delete data[key];
                        }
                    }

                    await JoblyApi.patchUser(username, data);
                    
                    setLoading(false);
                    setFormErrors([]);
                    
                    props.history.push("/")
                }
                catch (e) {
                    setFormErrors(e);
                    setLoading(false);
                }
            }
        }
        signup();
    }, [loading, formData, props.history]);

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
            <h3>Edit your profile:</h3>
            <Jumbotron fluid className="p-2 pt-3 bg-muted rounded">
                <Container fluid>
                    <Form onSubmit={handleSubmit} className="form text-left">
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="username"
                                name="username"
                                id="username"
                                placeholder={user.username}
                                onChange={handleChange}
                                key="username"
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input
                                type="first_name"
                                name="first_name"
                                id="first_name"
                                key="first_name"
                                placeholder={user.first_name}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input
                                type="last_name"
                                name="last_name"
                                id="last_name"
                                key="last_name"
                                placeholder={user.last_name}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                key="email"
                                placeholder={user.email}
                                onChange={handleChange}
                            />
                           
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Re-enter Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                key="password"
                                onChange={handleChange}
                            />
                            {feedBack}
                        </FormGroup>
                        <Button className="btn btn-success m-2" type="submit">Make Changes</Button>
                    </Form>
                </Container>
            </Jumbotron>
        </div>
    );
}

export default Profile;