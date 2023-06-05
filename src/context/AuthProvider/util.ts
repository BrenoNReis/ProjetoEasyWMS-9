import api from "../../auxiliares/api";
import { IUser } from "./types";
import  { AxiosError } from 'axios';

export function setUserLocalStorage(user: IUser | null){
    localStorage.setItem("u", JSON.stringify(user));
    // sessionStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage(){
    const json = localStorage.getItem("u");
    // const json = sessionStorage.getItem("u");

    if (!json) {
        return null
    }

    const user = JSON.parse(json);

    return user ?? null;
}

export async function LoginRequest(userName: string, password: string, filialUsuario: number){
    try {
        const data = {
            userName, password, filialUsuario
        };

        const response = await api.post('Usuarios/logarUsuario', data);
    
        if (response.status === 400 || response.status === 401) {
            throw new Error(response.data.message);
        }

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status code ${response.status}`);
        }
        
    } catch (error: any) {
        throw error;
    }
}

