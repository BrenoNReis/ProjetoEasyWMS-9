import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

//Tipando os dados que quero para usuário
type ListaType = {
  listaId: number;
  enderecoLista: string;
  tipoLista: string;
  pedidoPreSeparacao: string;
};

//Tipando as Props do contexto
type PropsListaContext = {
  state: ListaType;
  setState: React.Dispatch<React.SetStateAction<ListaType>>;
};

//Valor default do contexto
const DEFAULT_VALUE = {
  state: {
    listaId: 0,
    enderecoLista: "",
    tipoLista: "",
    pedidoPreSeparacao: ""
  },
  setState: () => {}, //função de inicialização
};

//criando nosso contexto UserContext
const ListaContext = createContext<PropsListaContext>(DEFAULT_VALUE);

/**
 * Função que irá conter o estado e função que irá alterar o estado 'setState'
 * quer irá prover o contexto para os componentes filhos da árvore
 */
const ListaContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <ListaContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </ListaContext.Provider>
  );
};
export { ListaContextProvider };
export default ListaContext;
