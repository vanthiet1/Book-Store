import axios from 'axios';

class Http {
    instance;
    constructor() {
// baseURL:'http://localhost:8080/api/v1/',
        this.instance = axios.create({ 
            baseURL: 'https://book-store-production-1713.up.railway.app/api/v1/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

const http = new Http().instance;
export default http;
