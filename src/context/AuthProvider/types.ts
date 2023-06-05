export interface IUser{
    userName?: string;
    filialUsuario?: number;
    token?: string;
}

export interface IContext extends IUser{
    authenticate: (userName: string, password: string, filialUsuario: number) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider{
    children: JSX.Element;
}

export interface IResponse {
    status: number;
    statusText: string;
    data: any;
}

export interface IPedidosSeparar {
    prioridade: string;
    dataPedidoString: string;
    cliente: string;
    pedido: string;
    quantidadeTotal: number;
    quantidadeSeparada: number;
    percentualSeparado: number;
    comanda: string;
    status: string;
}

export interface IProxPedido {
    pedido: string;
    comanda: string;
    idSeparacao: number;
    tipoSeparacao: string;
    transportadora: string;
}

export interface ISepararProxPedido{
    endereco: string;
    produto: string;
    itemPedido: number;
    indice: number;
    itemPedidoMaximo: number;
    prodcode: string;
    isbn: string;
    quantidadeEndereco: number;
    mensagemRetorno?: string;
}

export interface IProdutosDoPedido {
    codigo: string;
    descricao: string;
    quantidade: number;
    quantidadeSeparada: number;
    status: string;
}

export interface IListasSeparar {
    listaId: number;
    deposito: string;
    dataString: string;
    status: string;
    descricao: string;
    quantidadeTotal: number;
    quantidadeSeparada: number;
    percentualSeparado: number;
}

export interface IProdutosDaLista {
    codigo: string;
    descricao: string;
    quantidade: number;
    quantidadeSeparada: number;
    status: string;
}

export interface IListaDistribuir {
    isbn: string;
    quantidade: number;
    titulo: string;
    posicao: string;
}

