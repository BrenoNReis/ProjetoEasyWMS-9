import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wms from "../pages/Wms";
import Login from "../pages/Login";
import ConsultaEstoque from "../pages/ConsultaEstoque";
import ConsultaEstoqueProduto from "../pages/ConsultaEstoqueProduto";
import ConsultaEstoqueEndereço from "../pages/ConsultaEstoqueEndereço";
import TransferênciaIndividual from "../pages/TransferênciaIndividual";
import TransferênciaTotal from "../pages/TransferênciaTotal";
import TransferênciaParcial from "../pages/TransferênciaParcial";
import SeparaçãoDePedidos from "../pages/SeparaçãoDePedidos";
import SeparaçãoEmAndamento from "../pages/SeparaçãoEmAndamento";
import PedidosJaSeparados from "../pages/PedidosJaSeparados";
import PedidosAseparar from "../pages/PedidosAseparar";
import ProximoPedido from "../pages/PróximoPedido";
import ProdutosDoPedido from "../pages/ProdutosDoPedido";
import ProdutosAsepararDoPedido from "../pages/ProdutosAsepararDoPedido";
import SepararProximoItem from "../pages/SepararProximoItem";
import ListaEmAndamento from "../pages/SepararProximoItemLista";
import SelecListaSeparar from "../pages/SeparaçãoDeListas";
import ListasProdutos from "../pages/ListasProdutos";
import ListasSeparar from "../pages/ListasSeparar";
import ListaAssociacao from "../pages/ListaAssociacao";
import ListaDistribuicao from "../pages/ListaDistribuicao";
import { AuthProvider } from "../context/AuthProvider";
import { ProtectedLayout } from "../Protected/ProtectedLayout";
import { PedidoContextProvider } from "../context/Separacao/Pedido";
import { ItemPedidoContextProvider } from "../context/Separacao/Item";
import { ListaContextProvider } from "../context/SeparacaoLista/Lista";
import { ItemListaContextProvider } from "../context/SeparacaoLista/Item";
import SepararProximoItemLista from "../pages/SepararProximoItemLista";
import Inventario from "../pages/Inventario"

function Router() {
  const rotaServidor = "/"; //Desenvolvimento
  //const rotaServidor="/wmsreact"; //Produção
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={rotaServidor} element={<Login />} />
            <Route
              path={rotaServidor + "wms"}
              element={
                <ProtectedLayout>
                  <Wms />
                </ProtectedLayout>
              }
            ></Route>
            <Route
              path={rotaServidor + "consultaestoque"}
              element={
                <ProtectedLayout>
                  <ConsultaEstoque />
                </ProtectedLayout>
              }
            />
            <Route
              path={rotaServidor + "consultaestoqueproduto"}
              element={<ConsultaEstoqueProduto />}
            />
            <Route
              path={rotaServidor + "consultaestoqueendereço"}
              element={<ConsultaEstoqueEndereço />}
            />
            <Route
              path={rotaServidor + "transferenciaindividual"}
              element={
                <ProtectedLayout>
                  <TransferênciaIndividual />
                </ProtectedLayout>
              }
            />
            <Route
              path={rotaServidor + "transferenciatotal"}
              element={
                <ProtectedLayout>
                  <TransferênciaTotal />
                </ProtectedLayout>
              }
            />
            <Route
              path={rotaServidor + "transferenciaparcial"}
              element={
                <ProtectedLayout>
                  <TransferênciaParcial />
                </ProtectedLayout>
              }
            />
            <Route
              path={rotaServidor + "separaçãodepedidos"}
              element={
                <PedidoContextProvider>
                  <ProtectedLayout>
                    <SeparaçãoDePedidos />
                  </ProtectedLayout>
                </PedidoContextProvider>
              }
            />
            <Route
              path={rotaServidor + "separaçãoemandamento"}
              element={
                <ProtectedLayout>
                  <SeparaçãoEmAndamento />
                </ProtectedLayout>
              }
            />
            <Route
              path={rotaServidor + "pedidosjaseparados"}
              element={
                <PedidoContextProvider>
                  <ProtectedLayout>
                    <PedidosJaSeparados />
                  </ProtectedLayout>
                </PedidoContextProvider>
              }
            />
            <Route
              path={rotaServidor + "pedidosaseparar"}
              element={
                <PedidoContextProvider>
                  <ProtectedLayout>
                    <PedidosAseparar />
                  </ProtectedLayout>
                </PedidoContextProvider>
              }
            />
            <Route
              path={rotaServidor + "produtosaseparardopedido"}
              element={
                <ProtectedLayout>
                  <ProdutosAsepararDoPedido />
                </ProtectedLayout>
              }
            />
            <Route
              path={rotaServidor + "proximopedido"}
              element={
                <ProtectedLayout>
                  <ProximoPedido />
                </ProtectedLayout>
              }
            />
            <Route
              path={rotaServidor + "produtosdopedido"}
              element={
                <PedidoContextProvider>
                  <ProtectedLayout>
                    <ProdutosDoPedido />
                  </ProtectedLayout>
                </PedidoContextProvider>
              }
            />

            <Route
              path={rotaServidor + "separarproximoitem"}
              element={
                <PedidoContextProvider>
                  <ItemPedidoContextProvider>
                    <ProtectedLayout>
                      <SepararProximoItem />
                    </ProtectedLayout>
                  </ItemPedidoContextProvider>
                </PedidoContextProvider>
              }
            />
            <Route
              path={rotaServidor + "separarproximoitemlista"}
              element={
                <ListaContextProvider>
                  <ItemListaContextProvider>
                    <ProtectedLayout>
                      <SepararProximoItemLista />
                    </ProtectedLayout>
                  </ItemListaContextProvider>
                </ListaContextProvider>
              }
            />
            <Route
              path={rotaServidor + "selecaolistaseparar"}
              element={
                <ListaContextProvider>
                  <ProtectedLayout>
                    <SelecListaSeparar />
                  </ProtectedLayout>
                </ListaContextProvider>
              }
            />
            <Route
              path={rotaServidor + "listasseparar"}
              element={
                <ListaContextProvider>
                  <ProtectedLayout>
                    <ListasSeparar />
                  </ProtectedLayout>
                </ListaContextProvider>
              }
            />
            <Route
              path={rotaServidor + "produtoslista"}
              element={
                <ListaContextProvider>
                  <ProtectedLayout>
                    <ListasProdutos />
                  </ProtectedLayout>
                </ListaContextProvider>
              }
            />
            <Route
              path={rotaServidor + "listaassosiacao"}
              element={
                <ListaContextProvider>
                  <ProtectedLayout>
                    <ListaAssociacao />
                  </ProtectedLayout>
                </ListaContextProvider>
              }
            />
            <Route
              path={rotaServidor + "listadistribuicao"}
              element={
                <ListaContextProvider>
                  <ItemListaContextProvider>
                    <ProtectedLayout>
                      <ListaDistribuicao />
                    </ProtectedLayout>
                  </ItemListaContextProvider>
                </ListaContextProvider>
              }
            />
            <Route
              path={rotaServidor + "inventario"}
              element={
                <ListaContextProvider>
                  <ItemListaContextProvider>
                    <ProtectedLayout>
                      <Inventario />
                    </ProtectedLayout>
                  </ItemListaContextProvider>
                </ListaContextProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default Router;
