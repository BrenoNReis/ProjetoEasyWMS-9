import { useState } from "react";
import api from "../auxiliares/api";

export interface IGuardaPorItem {
    usuario: string;
    filial: number;
    enderecoOrigem: string;
    prodcode: string;
    quantidade: number;
    enderecoDestino: string;
}

export interface IGuardaTotal {
    usuario: string;
    filial: number;
    enderecoOrigem: string;
    enderecoDestino: string;
}

export interface IConsultaPorProduto {
    endereco: string;
    quantidade: number;
    tipoEndereco: string;
    quantidadeCaixas: number;
}

export interface ISeparacaoItem {
    pedido: string,
    idSeparacao: number,
    itemPedido: number,
    tipoSeparacaoPedido: string,
    usuario: string,
    filial: number,
    enderecoOrigem: string,
    enderecoConfirmado: string,
    codigoBarras: string,
    quantidade: number,
    motivoDivergencia: number
  }

export interface ISeparacaoItemLista {
    listaId: number;
    itemLista: number;
    tipoLista: string;
    enderecoLista: string;
    usuario: string;
    filial: number;
    enderecoOrigem: string;
    enderecoConfirmado: string;
    codigoBarras: string;
    quantidade: number;
    motivoDivergencia: number;
  };

export interface ITransferenciaParcialAdicionar {
    novaSeparacaoID: number,
    codigoBarras: string,
    quantidade: number
}

export interface ITransferenciaParcialItem {
    prodcode: string;
    descricao: string;
    quantidade: number;
    codigoBarras: string;
}

export interface ITransferenciaParcialConfirmar {
    novaSeparacaoID: number;
    usuario: string;
    filial: number;
    enderecoOrigem: string;
    enderecoDestino: string;
}

export async function ConsultaEstoquePorProduto(prodcode: string, filial: number, usaWmsComMascara: boolean) {
    const [dados, setDados] = useState<IConsultaPorProduto[]>([]);
    alert('Chegou na função: ' + prodcode);
    api.get(`ConsultaEstoques/ObtemPorProduto?prodcode=${prodcode}&filial=${filial}&usaWmsComMascara=${usaWmsComMascara}`)
        .then((response) => {
            if (response.status === 200) {
                setDados(response.data);
            }
        }).catch((error) => {
            throw error;
        });

    return dados;
}

