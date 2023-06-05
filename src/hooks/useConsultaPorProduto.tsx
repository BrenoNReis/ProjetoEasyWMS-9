import { useEffect, useState } from "react";
import api from "../auxiliares/api";

export interface IConsultaPorProduto {
    endereco: string;
    quantidade: number;
    tipoEndereco: string;
    quantidadeCaixas: number;
}

export const useConsultaPorProduto = (prodcode: string, filial: number, usaWmsComMascara: boolean) => {
    const [consultasPorProduto, setconsultasPorProduto] = useState<IConsultaPorProduto[]>([]);
    
    try {
        if (prodcode!=='' && filial>0) {
            useEffect(() => {
                api.get(`ConsultaEstoques/ObtemPorProduto?prodcode=${prodcode}&filial=${filial}&usaWmsComMascara=${usaWmsComMascara}`).
                then((response) => {
                    if (response.status===200) {
                        setconsultasPorProduto(response.data);
                    }
                    else {
                        throw new Error(response.statusText);
                    }
                  });
            }, []);
        }
            
        return {
            consultasPorProduto
        };
    } catch (error) {
        //return consultasPorProduto;
    }
    
};
