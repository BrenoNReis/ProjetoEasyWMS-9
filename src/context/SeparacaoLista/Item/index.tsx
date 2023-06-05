import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

//Tipando os dados que quero para usuário
type ItemListaType = {
  endereco: string;
  produto: string;
  itemLista: number;
  indice: number;
  prodcode: string;
  isbn: string;
  quantidadeEndereco: number;
  quantidadeCaixa: number;
  codigoBarras: string;
  mensagemRetorno: string;
};

//Tipando as Props do contexto
type PropsItemListaContext = {
  state: ItemListaType;
  setState: React.Dispatch<React.SetStateAction<ItemListaType>>;
};

//Valor default do contexto
const DEFAULT_VALUE = {
  state: {
    endereco: "",
    produto: "",
    itemLista: 0,
    indice: 0,
    prodcode: "",
    isbn: "",
    quantidadeEndereco: 0,
    quantidadeCaixa: 0,
    codigoBarras: "",
    mensagemRetorno: "",
  },
  setState: () => {}, //função de inicialização
};

//criando nosso contexto UserContext
const ItemListaContext = createContext<PropsItemListaContext>(DEFAULT_VALUE);

/**
 * Função que irá conter o estado e função que irá alterar o estado 'setState'
 * quer irá prover o contexto para os componentes filhos da árvore
 */
const ItemListaContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <ItemListaContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </ItemListaContext.Provider>
  );
};
export { ItemListaContextProvider };
export default ItemListaContext;
