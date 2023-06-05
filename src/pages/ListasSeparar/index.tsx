import React, { useState, useEffect, useContext, useRef } from "react";
import "./listassepararstyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import ListaContext from "../../context/Separacao/Pedido";
import { AuthContext } from "../../context/AuthProvider";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IListasSeparar } from "../../context/AuthProvider/types";

function ListasSeparar() {
    const { userName, filialUsuario } = useContext(AuthContext);
    const navigate = useNavigate();
    const { state } = useContext(ListaContext);
    const [searchListas, setSearchListas] = useState<IListasSeparar[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    var filial = filialUsuario;
    var usuario = userName;
  
    useEffect(() => {
      const handleSearch = async () => {
        setIsLoading(true);
        
        api
          .get(
            `SeparacaoLista/ObtemListasASeparar?usuario=${usuario}&filial=${filial}`
          )
          .then((response) => {
            if (response.status === 200) {
                setSearchListas(response.data);
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
                <div className="texto2">LISTAS A SEPARAR</div>

                <div className="table-consultaestoqueendereço">
                    <TableContainer sx={{ maxHeight: 420 }}>
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: 200 }} align="center">
                                        <div className="label1-consultaestoqueendereço">
                                            LISTA
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: 200 }} align="center">
                                        <div className="label1-consultaestoqueendereço">
                                            DEPOSITO
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: 200 }} align="center">
                                        <div className="label1-consultaestoqueendereço">
                                            DATA
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: 200 }} align="center">
                                        <div className="label1-consultaestoqueendereço">
                                            STATUS
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: 200 }} align="center">
                                        <div className="label1-consultaestoqueendereço">
                                            STATUS
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: 200 }} align="center">
                                        <div className="label1-consultaestoqueendereço">
                                            DESC.
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: 200 }} align="center">
                                        <div className="label1-consultaestoqueendereço">
                                            TOTAL
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ width: 200 }} align="center">
                                        <div className="label1-consultaestoqueendereço">
                                            SEPARADA
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {searchListas.map((data) => (
                                    <TableRow key={data.listaId}>
                                        <TableCell style={{ width: 200 }} align="center">
                                            <div className="label2-consultaestoqueendereço">
                                                {data.listaId}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ width: 200 }} align="center">
                                            <div className="label2-consultaestoqueendereço">
                                                {data.deposito}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ width: 200 }} align="center">
                                            <div className="label2-consultaestoqueendereço">
                                                {data.dataString}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ width: 200 }} align="center">
                                            <div className="label2-consultaestoqueendereço">
                                                {data.status}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ width: 200 }} align="center">
                                            <div className="label2-consultaestoqueendereço">
                                                {data.descricao}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ width: 200 }} align="center">
                                            <div className="label2-consultaestoqueendereço">
                                                {data.quantidadeTotal}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ width: 200 }} align="center">
                                            <div className="label2-consultaestoqueendereço">
                                                {data.quantidadeSeparada}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ width: 200 }} align="center">
                                            <div className="label2-consultaestoqueendereço">
                                                {data.percentualSeparado}
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

export default ListasSeparar;
