import React from "react"
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import {Link} from "react-router-dom";
import logo from './logo.png';

function CompanyCard({ company }) {

    if (!company.logo_url) {
        company.logo_url = logo;
    }

    return (
        <Card className="m-3 ">
            <CardBody className="bg-secondary text-light rounded" >
                <CardTitle>
                    <h5 className="text-left"><u>
                        <Link to={`/companies/${company.handle}`}>{company.name}</Link>
                    </u></h5>
                </CardTitle>
                <CardText component="span" >
                    <span className="text-left d-inline-block w-50">
                        <span className="d-block">{company.description}</span>
                    </span>
                    <span className="text-right d-inline-block w-50">
                        <img src={company.logo_url} alt="" />
                    </span>
                </CardText>
            </CardBody>
        </Card>
    )
}

export default CompanyCard;