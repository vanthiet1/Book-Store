import axios from 'axios';

class Http {
    instance;
    constructor(){
         this.instance = axios.create({
            baseURL:'https://book-store-9po5.onrender.com/api/v1/',
            timeout:10000,
            headers:{
                'Content-Type': 'application/json'
            }
         })
    }
}
const http = new Http().instance;
export default http;
