import React, {Children, createContext, useEffect, useState} from 'react';
import { IAuthProvider, IContext, IUser } from './types';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util';

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider ) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            setUser(user)
        }
    }, []);

    async function authenticate(userName: string, password: string, filialUsuario: number){
        try {
            const response = await LoginRequest(userName, password, filialUsuario)
            
            if (response.token){
                const payload = {token: response.token, userName, filialUsuario, usaWmsComMascara: response.usuarioParametros.usaWmsComMascara}
                setUser(payload);
                setUserLocalStorage(payload);
            }
            else {
                throw new Error(`Request failed with status code ${response.status}`);
            }
            
            return response;

        } catch (error: any) {
            throw error;
        }
        
    }

    function logout(){
        setUser(null);
        setUserLocalStorage(null);
    }

    return(
        <AuthContext.Provider value={{...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )

}