import { API_BOOK } from "~/utils/url-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "~/utils/http";
const GetDetailBookFree = () => {
    const { id } = useParams();
    const [dataBookDetailFree, setDataBookDetailFree] = useState(null);

    const getAnBookFree = async () => {
        try {
            const response = await http.get(`${API_BOOK}/${id}`);
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
