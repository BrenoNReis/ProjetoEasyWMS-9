import React, { useState, useEffect, useContext } from "react";
import "./pedidosjaseparadosstyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IPedidosSeparar } from "../../context/AuthProvider/types";
import { AuthContext } from "../../context/AuthProvider";

function PedidosJaSeparados() {
  const navigate = useNavigate();
  const { userName, filialUsuario } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState<IPedidosSeparar[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  var filial = filialUsuario;
  var usuario = userName;

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);

      api
        .get(
          `Separacao/ObtemPedidosSeparados?usuario=${usuario}&filial=${filial}`
        )
        .then((response) => {
          if (response.status === 200) {
            setPedidos(response.data);
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
        <div className="texto2">Pedidos Já Separados</div>
        <div style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {usuario}
        </div>

        <br />

        <div className="table-consultaestoqueendereço">
          <TableContainer sx={{ maxHeight: 420 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      PRIORIDADE
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">DATA</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      CLIENTE
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">PEDIDO</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">TOTAL</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      Qtde. SEPARADA
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      % SEPARADO
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      COMANDA
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">STATUS</div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.pedido}>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.prioridade}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.dataPedidoString}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.cliente}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.pedido}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.quantidadeTotal}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.quantidadeSeparada}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.percentualSeparado}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.comanda}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.status}
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

export default PedidosJaSeparados;
