import React, { useState, useEffect, useContext } from "react";
import "./proximopedidostyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IProxPedido } from "../../context/AuthProvider/types";
import { AuthContext } from "../../context/AuthProvider";

function ProximoPedido() {
  const navigate = useNavigate();
  const { userName, filialUsuario } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState<IProxPedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  var filial = filialUsuario;
  var usuario = userName;
  var filtrarPedido = false;

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);

      api
        .get(
          `Separacao/ObtemProximoPedidoSeparar?usuario=${usuario}&filial=${filial}&filtrarPedido=${filtrarPedido}`
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
        <div className="texto2">Próximo Pedido</div>
        <div style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {usuario}
        </div>
        <div style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {filial}
        </div>

        <br />

        <div className="table-consultaestoqueendereço">
          <TableContainer sx={{ maxHeight: 420 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">PEDIDO</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      COMANDA
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">ID</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">TIPO</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      TRANSPORTADORA
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.pedido}>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.pedido}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.comanda}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.idSeparacao}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.tipoSeparacao}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {pedido.transportadora}
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

export default ProximoPedido;
