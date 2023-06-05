import React, { useState, useEffect, useContext } from "react";
import "./produtosdopedidostyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  IProdutosDoPedido,
  IProxPedido,
} from "../../context/AuthProvider/types";
import PedidoContext from "../../context/Separacao/Pedido";
import { AuthContext } from "../../context/AuthProvider";

function ProdutosDoPedido() {
  const navigate = useNavigate();
  const { userName } = useContext(AuthContext);
  const { state: statePedido } = useContext(PedidoContext);
  const [pedido] = useState(statePedido.pedido);
  const [idSeparacao] = useState(statePedido.idSeparacao);
  const [produtos, setProdutos] = useState<IProdutosDoPedido[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  var usuario = userName;

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);

      api
        .get(
          `Separacao/ObtemProdutosASeparar?usuario=${usuario}&pedido=${pedido}`
        )
        .then((response) => {
          if (response.status === 200) {
            setProdutos(response.data);
          } else {
            alert("Erro na busca " + response.statusText);
          }

          setIsLoading(false);
        })
        .catch((error) => {
          alert(error);
          setIsLoading(false);
        });
    };
    handleSearch();
  }, []);

  return (
    <div className="containerSEPARAÇÃOEMANDAMENTO">
      <div className="gridSEPARAÇÃOEMANDAMENTO">
        <div className="texto2">Próximo Pedido</div>
        <div style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {usuario}
        </div>
        <div style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {pedido}
        </div>

        <br />

        <div className="table-consultaestoqueendereço">
          <TableContainer sx={{ maxHeight: 420 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">CÓDIGO</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      DESCRIÇÃO
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">QTDE</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      QTDE. SEPARADA
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">STATUS</div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {produtos.map((produto) => (
                  <TableRow key={produto.codigo}>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {produto.codigo}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {produto.descricao}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {produto.quantidade}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {produto.quantidadeSeparada}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {produto.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <a onClick={() => navigate(-1)} className="myButton">
          VOLTAR
        </a>
      </div>
    </div>
  );
}

export default ProdutosDoPedido;
