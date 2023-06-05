import { useEffect, useState } from "react";
import api from "../auxiliares/api";

export interface IFilial {
    codigoFilial: number;
    nomeFilial: string;
}


export const useFiliais = () => {
    const [filiais, setFiliais] = useState<IFilial[]>([]);
    
    // USANDO FETCH
    /*
    useEffect(() => {
        //fetch("http://132.255.246.194:8091/api/filiais")
        fetch(`${process.env.REACT_APP_API_BASEURL}/filiais`)
        .then((response) => response.json())
        .then((data) => setFiliais(data));

    }, []);
    */
   
    //USANDO AXIOS
    useEffect(() => {
        api.get("filiais").
            then((response) => {
                setFiliais(response.data);
            });
    }, []);
    
    return {
        filiais
    };
};
