import { useEffect, useState } from "react";
import api from "../auxiliares/api";

export interface IConsultaPorEndereço {
    codigoBarras: string;
    quantidade: number;
    descricao: string;
    editora: string;
    quantidadeCaixas: number;
}

export const useConsultaPorEndereço = (endereco: string, filial: number, usaWmsComMascara: boolean) => {
    const [consultasPorEndereço, setconsultasPorEndereço] = useState<IConsultaPorEndereço[]>([]);
    
    if (endereco!=='') {
        useEffect(() => {
            api.get(`ConsultaEstoques/ObtemPorEndereco?endereco=${endereco}&filial=${filial}&usaWmsComMascara=${usaWmsComMascara}`).then((response) => {
                setconsultasPorEndereço(response.data);
              });
        }, []);
    }
        
    return {
        consultasPorEndereço
    };
};
