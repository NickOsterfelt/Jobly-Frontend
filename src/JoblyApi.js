import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
        
class JoblyApi {
    
    static async request(endpoint, paramsOrData = {}, verb = "get") {
        paramsOrData._token = localStorage.getItem("_token");
        console.debug("API Call:", endpoint, paramsOrData, verb);

        try {
            return (await axios({
                method: verb,
                url: `${BASE_URL}${endpoint}`,
                [verb === "get" ? "params" : "data"]: paramsOrData
            })).data;
            // axios sends query string data via the "params" key,
            // and request body data via the "data" key,
            // so the key we need depends on the HTTP verb
        }

        catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async getCompanies(data) {
        let res = await this.request(`companies`, {...data}, "get" );
        return res.companies;
    }

    static async getJobs(data) {
        let res = await this.request("jobs", {...data});
        return res.jobs;
    }

    static async postLogin(data) {
        let res = await this.request("login", {...data}, "post");
        return res.token;
    }

    static async postSignup(data) {
        let res = await this.request("users", {...data}, "post");
        return res.token;
    }
    
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async patchUser(username, data) {
        let res = await this.request(`users/${username}`, {...data}, "patch");
        return res.user;
    }

    static async postApply(jobId, username) {
        let res = await this.request(`jobs/${jobId}/apply`, {username: username}, "post");
        return res.message;
    }
}

export default JoblyApi;