import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

//Tipando os dados que quero para usuário
type ItemType = {
    endereco: string;
    produto: string;
    itemPedido: number;
    indice: number;
    itemPedidoMaximo: number;
    prodcode: string;
    isbn: string;
    quantidadeEndereco: number;
    mensagemRetorno: string;
};

//Tipando as Props do contexto
type PropsItemContext = {
  state: ItemType;
  setState: React.Dispatch<React.SetStateAction<ItemType>>;
};

//Valor default do contexto
const DEFAULT_VALUE = {
  state: {
    endereco: "",
    produto: "",
    itemPedido: 0,
    indice: 0,
    itemPedidoMaximo: 0,
    prodcode: "",
    isbn: "",
    quantidadeEndereco: 0,
    mensagemRetorno: "",
  },
  setState: () => {}, //função de inicialização
};

//criando nosso contexto UserContext
const ItemPedidoContext = createContext<PropsItemContext>(DEFAULT_VALUE);

/**
 * Função que irá conter o estado e função que irá alterar o estado 'setState'
 * quer irá prover o contexto para os componentes filhos da árvore
 */
const ItemPedidoContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <ItemPedidoContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </ItemPedidoContext.Provider>
  );
};
export { ItemPedidoContextProvider };
export default ItemPedidoContext;
