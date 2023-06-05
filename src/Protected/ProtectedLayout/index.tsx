import { useAuth } from "../../context/AuthProvider/useAuth"
import "./protectedstyles.css"
import React from "react"
import {useNavigate} from "react-router-dom";

export const ProtectedLayout = ({children}: {children: JSX.Element}) => {
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth.userName) {
        return <h1>Você não tem acesso! <br/> Retorne à tela de login para acessar como usuário. <br/> <a onClick={() => navigate(-1)} className="myButtonPROTECTED">VOLTAR</a></h1> ;
    }

    return children;
};
