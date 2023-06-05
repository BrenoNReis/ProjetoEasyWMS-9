import React, { useState, KeyboardEvent, useContext } from "react";
import api from "../../auxiliares/api";
import { IConsultaPorEndereço } from "../../hooks/useConsultaPorEndereço";
import { useNavigate } from "react-router-dom";
import "./consultaestoqueendereçostyles.css";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BiSearchAlt } from "react-icons/bi";
import { AuthContext } from "../../context/AuthProvider";

const ConsultaEstoqueEndereço: React.FC = () => {
  const { filialUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [endereco, setEndereco] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<IConsultaPorEndereço[]>(
    []
  );

  const handleSearch = async () => {
    if (endereco.length >= 12) {
      setIsLoading(true);

      var filial = filialUsuario;
      var usaWmsComMascara = true;

      api
        .get(
          `ConsultaEstoques/ObtemPorEndereco?endereco=${endereco}&filial=${filial}&usaWmsComMascara=${usaWmsComMascara}`
        )
        .then((response) => {
          setSearchResults(response.data);
        });

      setIsLoading(false);
    }
  };

  const formatValue = (value) => {
    const characters = value.split("");

    if (characters.length === 2) {
      characters.push("-");
    } else if (characters.length === 6) {
      characters.push("-");
    } else if (characters.length === 11) {
      characters.push("-");
    }

    return characters.join("");
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const formattedValue = inputValue.match(
      /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/
    );
    if (formattedValue) {
      setEndereco(inputValue);
    } else {
      const parts = inputValue.split("-");
      inputValue = parts
        .map((part, index) => {
          if (index === 0) {
            return part.slice(0, 2);
          } else if (index === 1) {
            return part.slice(0, 3);
          } else if (index === 2) {
            return part.slice(0, 4);
          } else if (index === 3) {
            return part.slice(0, 3);
          }
          return "";
        })
        .join("-");
      setEndereco(inputValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="containerCONSULTAESTOQUEENDEREÇO">
      <div className="gridCONSULTAESTOQUEENDEREÇO">
        <div className="texto2">CONSULTA DE ESTOQUE POR ENDEREÇO</div>
        <div className="texto1">ENDEREÇO</div>
        <div>
          <div className="search-box">
            {
              <input
                autoFocus
                className="search-textENDEREÇO"
                type="text"
                value={endereco}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onChange={(e) => setEndereco(formatValue(e.target.value))}
                placeholder="Inserir endereço"
              />
            }

            <button
              type="button"
              className="button3-box"
              onClick={handleSearch}
              disabled={isLoading}
            >
              <BiSearchAlt
                className="button3-icon"
                size="25"
                onClick={handleSearch}
              />
            </button>
          </div>
          <div className="table-consultaestoqueendereço">
            <TableContainer sx={{ maxHeight: 420 }}>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueendereço">
                        ISBN
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueendereço">
                        Desc.
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueendereço">
                        Qtde.
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueendereço">
                        Editora
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueendereço">
                        Qtde. Caixas
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {searchResults.map((data) => (
                    <TableRow key={data.codigoBarras}>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueendereço">
                          {data.codigoBarras}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueendereço">
                          {data.descricao.slice(0, 50)}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueendereço">
                          {data.quantidade}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueendereço">
                          {data.editora}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueendereço">
                          {data.quantidadeCaixas}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <a onClick={() => navigate(-1)} className="myButtonENDERECO">
            VOLTAR
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConsultaEstoqueEndereço;

/*
        <table>
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Editora</th>
                <th>QTDE. Caixas</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((data) => (
                <tr key={data.codigoBarras}>
                  <td>{data.codigoBarras}</td>
                  <td>{data.descricao}</td>
                  <td>{data.quantidade}</td>
                  <td>{data.editora}</td>
                  <td>{data.quantidadeCaixas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 

import "./consultaestoqueendereçostyles.css"
import { BiArrowFromRight } from "react-icons/bi"
import {useNavigate} from "react-router-dom";
import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: any) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: any) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: any) => value.toFixed(2),
    },
];

function createData(name: any, code: any, population: any, size: any) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

function ConsultaEstoqueEndereço() {

    const navigate = useNavigate();

    function Teste() {
        console.log("confirmado");
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="containerCONSULTAESTOQUEPRODUTO" >
            <div className="gridCONSULTAESTOQUEPRODUTO">
                
                <div className="texto2">CONSULTA DE ESTOQUE POR ENDEREÇO</div>
                <div className="texto1">LOCAL</div>
                <input className="search-text" type="text" placeholder="Buscar endereço..."onChange={Teste}/>

                <Paper sx={{ width: '100%' }}>

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table aria-label="sticky table">

              <TableHead>
              
                <TableRow>

                  <TableCell align="center" colSpan={2}>
                    Country
                  </TableCell>

                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>

                </TableRow>

                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"//{column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>

              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = column.id;
                          return (
                            <TableCell key={column.id} align="center">
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>

            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

                

        <a onClick={() => navigate(-1)} className="myButton">VOLTAR</a>

            </div>
        </div>
    );
}

export default ConsultaEstoqueEndereço;*/
