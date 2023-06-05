import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

//Tipando os dados que quero para usuário
type PedidoType = {
  pedido: string;
  comanda: string;
  idSeparacao: number;
  tipoSeparacao: string;
  transportadora: string;
  endereco: string;
};

//Tipando as Props do contexto
type PropsPedidoContext = {
  state: PedidoType;
  setState: React.Dispatch<React.SetStateAction<PedidoType>>;
};

//Valor default do contexto
const DEFAULT_VALUE = {
  state: {
    pedido: "",
    comanda: "",
    idSeparacao: 0,
    tipoSeparacao: "",
    transportadora: "",
    endereco: "",
  },
  setState: () => {}, //função de inicialização
};

//criando nosso contexto UserContext
const PedidoContext = createContext<PropsPedidoContext>(DEFAULT_VALUE);

/**
 * Função que irá conter o estado e função que irá alterar o estado 'setState'
 * quer irá prover o contexto para os componentes filhos da árvore
 */
const PedidoContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <PedidoContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
export { PedidoContextProvider };
export default PedidoContext;
