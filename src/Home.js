import React from "react";
import { Link } from "react-router-dom";


function Home({ loggedIn }) {
    if(loggedIn){
        return (
            <div className="mt-5 pt-5">
                <h1>Welcome to jobly!</h1>
                <div>
                    The best place to find a job
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <h1>Welcome to jobly!</h1>
                <div>
                    <h3>Get started by logging in or signing up!</h3>
                    <div>
                        <Link to="/login" className="btn btn-success">Login/Signup</Link>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Home;