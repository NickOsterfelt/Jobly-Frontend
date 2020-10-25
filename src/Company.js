
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Jumbotron, Container } from "reactstrap";

import JoblyApi from "./JoblyApi";
import JobCard from "./JobCard";
import "./Company.css";
import logo from './logo.png';


function Company(props) {
    let [company, setCompany] = useState(null);

    let { handle } = useParams();

    const [user, setUser] = useState({})
    //gets user data on first load
    useEffect(() => {
        async function getUserData() {
            let foundUser = await JoblyApi.getUser(localStorage.getItem("username"));
            setUser(foundUser);
        }
        getUserData();
    }, []);

    //Retrieves job data once at start of component load
    useEffect(() => {
        async function getData() {
            try {
                let companyData = await JoblyApi.getCompany(handle);
                setCompany(companyData);
            }
            catch (err) {
                props.history.push("/");
            }
        }
        getData();
    }, [handle, props.history])

    if (!company) {
        return <p>Loading &hellip;</p>;
    }
    else {


        let foundJobs = [];
        let appliedJobIds = [];
        if(user.jobs){
            appliedJobIds = user.jobs.map(j => j.id);
            
        }          
    
        foundJobs = company.jobs.map(j => (
            appliedJobIds.includes(j.id) ? { ...j, applied: true } : { ...j, applied: false }
        ));
        
        foundJobs = foundJobs.map(j => (
            <JobCard job={j} key={j.id} />
        ));

        if(!company.logo_url){
            company.logo_url = logo;
        }

        return (
            <div>
                <Jumbotron fluid className="p-2 pt-3 bg-muted rounded">
                    <Container fluid>
                        <div className="header-text text-primary">
                            <h1 className="text-left"><u>{company.name}</u></h1>
                            <p className="text-left">{company.description}</p>
                        </div>
                        <div className="header-image">
                            <img src={company.logo_url} alt=""/>
                        </div>
                    </Container>
                </Jumbotron>
                <div>
                    <h5 className="text-left">Jobs available:</h5>
                </div>
                <div className="jobs-list">
                    {foundJobs}
                </div>
            </div>
        )
    }
}

export default Company;