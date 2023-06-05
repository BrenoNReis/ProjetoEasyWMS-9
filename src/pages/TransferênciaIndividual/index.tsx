import React, { useContext, useRef, useState } from "react";
import "./transferenciaindividualstyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IGuardaPorItem } from "../../global";
import { IConsultaPorProduto } from "../../hooks/useConsultaPorProduto";
import { AuthContext } from "../../context/AuthProvider";
import { BsFillCheckSquareFill } from "react-icons/bs";

const TransferenciaIndividual: React.FC = () => {
  const { userName, filialUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [barras, setBarras] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [query, setQuery] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<IConsultaPorProduto[]>([]);
  const refProduto = useRef<HTMLInputElement>(null);
  const refQuantidade = useRef<HTMLInputElement>(null);
  const refDestino = useRef<HTMLInputElement>(null);
  const [aviso, setAviso] = useState("");

  //// ORIGEM //////////////////////////////////////////////////////////////////////////////////////////////
  const HandleSearchOrigem = async () => {
    if (origem.length >= 12) {
      var filial = filialUsuario;
      var usaWmsComMascara = true;
      var origemdestino = 1;

      api
        .get(
          `Guarda/ValidaEnderecoPicking?endereco=${origem}&filial=${filial}&origemOuDestino=${origemdestino}`
        )
        .then((response) => {
          if (response.status === 200) {
            if (refProduto.current) {
              refProduto.current.focus();
            }
          } else {
            alert("Endereço inválido!");
            setOrigem("");
          }
        })
        .catch((error) => {
          alert("Endereço inválido!");
          setOrigem("");
        });
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

  const handleInputOrigem = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const formattedValue = inputValue.match(
      /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/
    );
    if (formattedValue) {
      setOrigem(inputValue);
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
      setOrigem(inputValue);
    }
  };

  const handleKeyDownOrigem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      HandleSearchOrigem();
    }
  };
  //// ORIGEM //////////////////////////////////////////////////////////////////////////////////////////////

  //// PRODUTO //////////////////////////////////////////////////////////////////////////////////////////////
  const handleSearchProduto = async () => {
    setIsLoading(true);

    var filial = filialUsuario;
    var usaWmsComMascara = true;

    api
      .get(
        `Guarda/ObtemProdutoEnderecos?prodcode=${query}&filial=${filial}&usaWmsComMascara=${usaWmsComMascara}`
      )
      .then((response) => {
        if (response.status === 200) {
          setQuery(response.data.prodcode);
          setBarras(response.data.isbn);
          setSearchResults(response.data.enderecosPorProduto);
          if (refQuantidade.current) {
            refQuantidade.current.focus();
          }
        } else {
          alert("Produto inválido!");
          setQuery("");
          setBarras("");
          setSearchResults([]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Produto inválido!");
        setQuery("");
        setBarras("");
        setSearchResults([]);
      });
  };

  const handleKeyDownProduto = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearchProduto();
    }
  };

  const handleKeyDownQuantidade = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (refDestino.current) {
        refDestino.current.focus();
      }
    }
  };
  //// PRODUTO //////////////////////////////////////////////////////////////////////////////////////////////

  //// DESTINO //////////////////////////////////////////////////////////////////////////////////////////////
  const handleSearchDestino = async () => {
    if (destino.length >= 12) {
      var filial = filialUsuario;
      var usaWmsComMascara = true;
      var origemdestino = 2;

      api
        .get(
          `Guarda/ValidaEnderecoPicking?endereco=${destino}&filial=${filial}&origemOuDestino=${origemdestino}`
        )
        .then((response) => {
          if (response.status === 200) {
            handleBotaoConfirmar();
          } else {
            alert("Endereço inválido!");
            setDestino("");
          }
        })
        .catch((error) => {
          alert("Endereço inválido!");
          setDestino("");
        });
    }
  };

  const handleInputDestino = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const formattedValue = inputValue.match(
      /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/
    );
    if (formattedValue) {
      setDestino(inputValue);
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
      setDestino(inputValue);
    }
  };

  const handleKeyDownDestino = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearchDestino();
    }
  };
  //// DESTINO //////////////////////////////////////////////////////////////////////////////////////////////

  const handleBotaoConfirmar = async () => {
    try {
      const data: IGuardaPorItem = {
        usuario: userName || "",
        filial: 2,
        enderecoOrigem: origem,
        prodcode: query,
        quantidade: quantidade,
        enderecoDestino: destino,
      };

      await api
        .post("Guarda/FazerTransferenciaPorItem", data)
        .then((response) => {
          if (response.status === 200) {
            setQuery("");
            setBarras("");
            setQuantidade(0);
            setDestino("");
            setSearchResults([]);
            setAviso(
              response.data.isbn +
              "/" +
              response.data.descricao +
              "/" +
              response.data.quantidade
            );

            if (refProduto.current) {
              refProduto.current.focus();
            }
          } else {
            alert("Erro na operação: " + response.statusText);
          }
        })
        .catch((error) => {
          alert("Erro na operação: " + error);
        });
    } catch (error: any) {
      throw error;
    }
  };

  const handleQuantidadeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const newValue = Number(value.replace(/[^0-9]/g, ""));
    //const newValue = Number(value);
    if (!isNaN(newValue) && Number.isInteger(newValue)) {
      setQuantidade(newValue);
      //console.log(quantidade);
    }
  };

  return (
    <div className="containerENDEREÇAMENTO">
      <div className="gridENDEREÇAMENTO">
        <div className="texto2">ENDEREÇAMENTO</div>

        <div className="newForm">
          <div className="gridINPUTendereçamento">
            <div className="label-endereçamento-form">
              ORIGEM:
              <div className="input-wrapper">
                <input
                  autoFocus
                  className="newForm-Input"
                  type="text"
                  value={origem}
                  onInput={handleInputOrigem}
                  onKeyDown={handleKeyDownOrigem}
                  onChange={(e) => setOrigem(formatValue(e.target.value))}
                  placeholder="Endereço de saída"
                  size={30}
                  required
                />
                <BsFillCheckSquareFill
                  className="button3transferenciaindividual-icon"
                  size="25"
                  onClick={HandleSearchOrigem}
                />
              </div>
            </div>

            <div className="label-endereçamento-form">
              PRODUTO:
              <div className="input-wrapper">
                <input
                  className="newForm-Input"
                  type="text"
                  value={query}
                  onChange={({ target }) => setQuery(target.value)}
                  onKeyDown={handleKeyDownProduto}
                  placeholder="Produto para transferência"
                  size={30}
                  required
                  ref={refProduto}
                />
                <BsFillCheckSquareFill
                  className="button3transferenciaindividual-icon"
                  size="25"
                  onClick={handleSearchProduto}
                />
              </div>
            </div>

            <div className="rowInput">
              <div className="label-endereçamento-form">
                ISBN:
                <input
                  className="newForm-Input"
                  type="text"
                  value={barras}
                  placeholder="ISBN do produto"
                  size={30}
                  readOnly
                ></input>
              </div>

              <div className="label-endereçamento-form">
                QTDE:
                <input
                  className="newForm-Input2"
                  placeholder=""
                  size={30}
                  required
                  ref={refQuantidade}
                  type="text"
                  value={quantidade || ""}
                  onChange={handleQuantidadeChange}
                  onKeyDown={handleKeyDownQuantidade}
                  pattern="^[0-9]+$"
                ></input>
              </div>
            </div>
          </div>

          <div className="label-endereçamento-form">
            DESTINO:
            <div className="input-wrapper">
              <input
                className="newForm-Input"
                type="text"
                value={destino}
                onInput={handleInputDestino}
                onKeyDown={handleKeyDownDestino}
                onChange={(e) => setDestino(formatValue(e.target.value))}
                placeholder="Endereço de entrada"
                size={30}
                required
                ref={refDestino}
              />
              <BsFillCheckSquareFill
                className="button3transferenciaindividual-icon"
                size="25"
                onClick={handleSearchDestino}
              />
            </div>
          </div>
        </div>
        <div className="table-consultaestoqueendereço">
          <TableContainer sx={{ maxHeight: 120 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      ENDEREÇO
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">Qtde</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">TIPO</div>
                  </TableCell>
                  <TableCell align="center" style={{ width: 200 }}>
                    <div className="label1-consultaestoqueendereço">
                      Qtde. CAIXA
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {searchResults.map((data) => (
                  <TableRow key={data.endereco}>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {data.endereco}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {data.quantidade}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="label2-consultaestoqueproduto">
                        {data.tipoEndereco}
                      </div>
                    </TableCell>
                    <TableCell>
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

        <div className="label-endereçamento-form">
          TRANSFERIDO:
          <input
            className="newForm-Input"
            type="text"
            value={aviso}
            placeholder="Último produto transferido"
            size={30}
            readOnly
          ></input>
        </div>

        <a onClick={handleBotaoConfirmar} className="myButton">
          CONFIRMAR
        </a>
        <a onClick={() => navigate(-1)} className="myButton">
          VOLTAR
        </a>
      </div>
    </div>
  );
};

export default TransferenciaIndividual;
