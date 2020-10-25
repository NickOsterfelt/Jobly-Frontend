import React, { useState, useEffect } from "react";
import { Form, FormGroup, Button, Jumbotron, Input, Container } from "reactstrap";

import JoblyApi from "./JoblyApi";
import CompanyCard from "./CompanyCard";
import "./Companies.css";
function Companies(props) {
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({ search: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSearchData() {
            if (loading) {
                try {
                    let companiesRes = await JoblyApi.getCompanies(formData)
                    setLoading(false);
                    setCompanies(companiesRes);
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

    let foundCompanies = companies.map(c => (
        <CompanyCard company={c} key={c.handle} />
    ))

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
                                placeholder="Enter search term for a company.."
                                value={formData.serach}
                                id="search"
                                key="search" />
                            <Button className="btn btn-info m-2" type="submit">Submit</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </Jumbotron>

            <div className="companies-list">
                {foundCompanies}
            </div>
        </div>
    )
}

export default Companies;