import { URL_API, API_BOOK } from "../../util/url-api";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GetDetailBookFree = () => {
    const { id } = useParams();
    const [dataBookDetailFree, setDataBookDetailFree] = useState(null);

    const getAnBookFree = async () => {
        try {
            const response = await axios.get(`${URL_API}/${API_BOOK}/${id}`);
            setDataBookDetailFree(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (id) {
            getAnBookFree();
        }
    }, [id]);
    
    return dataBookDetailFree;
};

export { GetDetailBookFree };
