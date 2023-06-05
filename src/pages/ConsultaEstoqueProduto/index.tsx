import React, { useContext, useState } from "react";
import api from "../../auxiliares/api";
import {
  IConsultaPorProduto,
  useConsultaPorProduto,
} from "../../hooks/useConsultaPorProduto";
import { useNavigate } from "react-router-dom";
import "./consultaestoqueprodutostyles.css";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BiSearchAlt } from "react-icons/bi";
import { ConsultaEstoquePorProduto } from "../../global";
import { AuthContext } from "../../context/AuthProvider";

const ConsultaEstoqueProduto: React.FC = () => {
  const { filialUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<IConsultaPorProduto[]>([]);
  const [prodcode, setProdcode] = useState("");
  const [filial, setFilial] = useState(0);
  const [usaWmsComMascara, setUsaWmsComMascara] = useState(true);

  const handleSearch = async () => {
    setIsLoading(true);

    var filial = filialUsuario;
    var usaWmsComMascara = true;
    var prodcode = query;

    api
      .get(
        `ConsultaEstoques/ObtemPorProduto?prodcode=${query}&filial=${filial}&usaWmsComMascara=${usaWmsComMascara}`
      )
      .then((response) => {
        if (response.status === 200) {
          setSearchResults(response.data);
        } else {
          alert("Erro na busca " + response.statusText);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        //console.log(JSON.stringify(error));
        alert(error);
        setIsLoading(false);
      });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="containerCONSULTAESTOQUEPRODUTO">
      <div className="gridCONSULTAESTOQUEPRODUTO">
        <div className="texto2">CONSULTA DE ESTOQUE POR PRODUTO</div>
        <div className="texto1">PRODUTO</div>
        <div>
          <div className="search-box">
            <input
              autoFocus
              className="search-textPRODUTO"
              type="text"
              value={query}
              onChange={({ target }) => setQuery(target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Inserir código"
            />

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
          <div className="table-consultaestoqueproduto">
            <TableContainer sx={{ maxHeight: 420 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueproduto">
                        Endereço
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueproduto">Qtde.</div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueproduto">
                        Tipo Endereço
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label1-consultaestoqueproduto">
                        Qtde. Caixas
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {searchResults.map((data) => (
                    <TableRow key={data.endereco}>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueproduto">
                          {data.endereco}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueproduto">
                          {data.quantidade}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueproduto">
                          {data.tipoEndereco}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="center">
                        <div className="label2-consultaestoqueproduto">
                          {data.quantidadeCaixas}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <a onClick={() => navigate(-1)} className="myButtonENDERECO">
          VOLTAR
        </a>
      </div>
    </div>
  );
};

export default ConsultaEstoqueProduto;
