import React, { useState, useEffect, useContext, useRef } from "react";
import "./listasprodutosstyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import { AuthContext } from "../../context/AuthProvider";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IProdutosDaLista } from "../../context/AuthProvider/types";
import ListaContext from "../../context/SeparacaoLista/Lista";

function ListasProdutos() {
  const { userName, filialUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useContext(ListaContext);
  const [searchProdutosLista, setSearchProdutosLista] = useState<
    IProdutosDaLista[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  var filial = filialUsuario;
  var usuario = userName;
  var listaId = state.listaId;

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);

      api
        .get(`SeparacaoLista/ObtemProdutosASeparar?listaId=${listaId}`)
        .then((response) => {
          if (response.status === 200) {
            setSearchProdutosLista(response.data);
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
    <div className="containerSEPARAÇÃODEPEDIDOS">
      <div className="gridSEPARAÇÃODEPEDIDOS">
        <div className="texto2">PRODUTOS DA LISTA</div>
        <div style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {listaId}
        </div>
        <div className="table-consultaestoqueendereço">
          <TableContainer sx={{ maxHeight: 420 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">CÓDIGO</div>
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">DESC.</div>
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">QTDE</div>
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">
                      SEPARADA
                    </div>
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">STATUS</div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {searchProdutosLista.map((data) => (
                  <TableRow key={data.codigo}>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.codigo}
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.descricao}
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.quantidade}
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.quantidadeSeparada}
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <a className="myButton3" onClick={() => navigate(-1)}>
          VOLTAR
        </a>
      </div>
    </div>
  );
}

export default ListasProdutos;
