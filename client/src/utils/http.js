import axios from 'axios';

class Http {
    instance;
    constructor(){
<<<<<<< HEAD
         this.instance = axios.create({ 
            baseURL:'http://localhost:8080/api/v1/',
=======
         this.instance = axios.create({
            baseURL:'https://book-store-9po5.onrender.com/api/v1/',
>>>>>>> 7cfb221b0d1aee8a5085275b33def3c2fef5b8a1
            timeout:10000,
            headers:{
                'Content-Type': 'application/json'
            }
         })
    }
}
const http = new Http().instance;
export default http;
