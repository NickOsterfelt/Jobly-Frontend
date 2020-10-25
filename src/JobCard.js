import React, { useEffect, useState } from "react"
import { Card, CardBody, CardTitle, Button, Form, FormGroup } from 'reactstrap';
import JoblyApi from "./JoblyApi";

function JobCard({ job }) {
    const [applied, setApplied] = useState(job.applied)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            if (loading) {
                JoblyApi.postApply(job.id, localStorage.getItem("username"));
            }
        }
        catch (e) {
            console.error(e);
        }


    }, [loading, job.id, applied])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setApplied(true);
        setLoading(true);
    }

    let button;
    if (applied) {
        button = <Button className="btn btn-success" disabled>Applied</Button>
    }
    else {
        button = <Button className="btn btn-success" type="submit">Apply</Button>
    }

    return (
        <Card className="m-3 ">
            <CardBody className="bg-secondary text-light rounded" >
                <CardTitle>
                    <h5 className="text-left"><u>{job.title}</u></h5>
                </CardTitle>
                <div component="span" >
                    <span className="text-left d-inline-block w-50">
                        <span className="d-block">Salary: {job.salary}</span>
                        <span className="d-block">Equity: {job.equity}</span>
                    </span>
                    <div className="text-right d-inline-block w-50">
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup onSubmit={handleSubmit}>
                                    {button}
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default JobCard;