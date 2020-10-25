import React, { useState, useEffect } from "react";
import { Form, FormGroup, Button, Jumbotron, Input, Container } from "reactstrap";
import JoblyApi from "./JoblyApi";
import JobCard from "./JobCard";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({ search: "" });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    let foundJobs = [];

    useEffect(() => {
        async function getUserData() {
            let foundUser = await JoblyApi.getUser(localStorage.getItem("username"));
            setUser(foundUser);
        }
        getUserData();
    }, []);

    useEffect(() => {
        async function getSearchData() {
            if (loading) {
                try {
                    let jobsRes = await JoblyApi.getJobs(formData);
                    setLoading(false);
                    setJobs(jobsRes);
                }
                catch (e) {
                    console.error(e)
                }
            }
        }
        getSearchData();
    }, [loading, formData]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
    }

    let appliedJobIds;
    if(user.jobs){
        appliedJobIds = user.jobs.map(j => j.id);
    }
   
    foundJobs = jobs.map(j => (
        appliedJobIds.includes(j.id) ? { ...j, applied: true } : { ...j, applied: false }
    ));
    
    foundJobs = foundJobs.map(j => (
        <JobCard job={j} key={j.id} />
    ));

    return (
        <div>
            <Jumbotron fluid className="p-2 pt-3 bg-muted rounded">
                <Container fluid>
                    <Form onSubmit={handleSubmit} className="form-inline">
                        <FormGroup className="w-100">
                            <Input
                                onChange={handleChange}
                                className="form-control form-control-lg flex-grow-1 m-2"
                                name="search"
                                placeholder="Enter search term for a job.."
                                value={formData.serach}
                                id="search"
                                key="search" />
                            <Button className="btn btn-info m-2" type="submit">Submit</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </Jumbotron>

            <div className="jobs-list">
                {foundJobs}
            </div>
        </div>
    )
}

export default Jobs;