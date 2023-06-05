import React, { useContext, useRef, useState, useEffect } from "react";
import "./transferenciaparcialstyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  IGuardaTotal,
  ITransferenciaParcialAdicionar,
  ITransferenciaParcialConfirmar,
  ITransferenciaParcialItem,
} from "../../global";
import { AuthContext } from "../../context/AuthProvider";
import { IConsultaPorProduto } from "../../hooks/useConsultaPorProduto";
import { BsFillCheckSquareFill } from "react-icons/bs";

const TransferenciaParcial: React.FC = () => {
  const { userName, filialUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const refOrigem = useRef<HTMLInputElement>(null);
  const refDestino = useRef<HTMLInputElement>(null);
  const [aviso, setAviso] = useState("");
  const [searchResults, setSearchResults] = useState<
    ITransferenciaParcialItem[]
  >([]);
  const [produtoConfirmar, setProdutoConfirmar] = useState("");
  const produtoInputRef = useRef<HTMLInputElement>(null);
  const [idNova, setIdNova] = useState(0);
  const [quantidadeConfirmar, setQuantidadeConfirmar] = useState(1);

  const confirmarProduto = async () => {
    try {
      const data: ITransferenciaParcialAdicionar = {
        novaSeparacaoID: idNova,
        codigoBarras: produtoConfirmar,
        quantidade: quantidadeConfirmar,
      };

      await api
        .post("Guarda/TransferenciaParcialAdicionarProduto", data)
        .then((response) => {
          if (response.status === 200) {
            setDisableButton(false);
            setSearchResults(response.data);
            setProdutoConfirmar("");
            setQuantidadeConfirmar(1);
            if (produtoInputRef.current) {
              produtoInputRef.current.focus();
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

  const handleKeyDownProduto = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      confirmarProduto();
    }
  };

  const handleEnterProduto = async () => {
    try {
      const data: ITransferenciaParcialAdicionar = {
        novaSeparacaoID: idNova,
        codigoBarras: produtoConfirmar,
        quantidade: quantidadeConfirmar,
      };

      await api
        .post("Guarda/TransferenciaParcialAdicionarProduto", data)
        .then((response) => {
          if (response.status === 200) {
            setDisableButton(false);
            setSearchResults(response.data);
            setProdutoConfirmar("");
            setQuantidadeConfirmar(1);
            if (produtoInputRef.current) {
              produtoInputRef.current.focus();
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

  //// ORIGEM //////////////////////////////////////////////////////////////////////////////////////////////
  const HandleSearchOrigem = async () => {
    if (origem.length >= 12) {
      var filial = filialUsuario;
      var edestino = 1;

      api
        .get(
          `Guarda/ValidaEnderecoPicking?endereco=${origem}&filial=${filial}&origemOuDestino=${edestino}`
        )
        .then((response) => {
          if (response.status === 200) {
            if (refDestino.current) {
              refDestino.current.focus();
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

  const [disableButton, setDisableButton] = useState(true);

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

  const handleEnterOrigem = async () => {
    if (origem.length >= 12) {
      var filial = filialUsuario;
      var edestino = 1;

      api
        .get(
          `Guarda/ValidaEnderecoPicking?endereco=${origem}&filial=${filial}&origemOuDestino=${edestino}`
        )
        .then((response) => {
          if (response.status === 200) {
            if (refDestino.current) {
              refDestino.current.focus();
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
  //// ORIGEM //////////////////////////////////////////////////////////////////////////////////////////////

  //// DESTINO //////////////////////////////////////////////////////////////////////////////////////////////
  const handleSearchDestino = async () => {
    if (destino.length >= 12) {
      var filial = filialUsuario;
      var edestino = 2;

      api
        .get(
          `Guarda/ValidaEnderecoPicking?endereco=${destino}&filial=${filial}&origemOuDestino=${edestino}`
        )
        .then((response) => {
          if (response.status === 200) {
            if (produtoInputRef.current) {
              produtoInputRef.current.focus();
            }
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

  const handleEnterDestino = async () => {
    if (destino.length >= 12) {
      var filial = filialUsuario;
      var edestino = 2;

      api
        .get(
          `Guarda/ValidaEnderecoPicking?endereco=${destino}&filial=${filial}&origemOuDestino=${edestino}`
        )
        .then((response) => {
          if (response.status === 200) {
            if (produtoInputRef.current) {
              produtoInputRef.current.focus();
            }
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


  //// DESTINO //////////////////////////////////////////////////////////////////////////////////////////////
  const [showMessage, setShowMessage] = useState(false);

  const handleBotaoConfirmar = async () => {
    try {
      const data: ITransferenciaParcialConfirmar = {
        novaSeparacaoID: idNova,
        usuario: userName || "",
        filial: filialUsuario || 0,
        enderecoOrigem: origem,
        enderecoDestino: destino,
      };

      await api
        .post("Guarda/TransferenciaParcialConfirmar", data)
        .then((response) => {
          if (response.status === 200) {
            if (response.data?.length > 0) {
              setSearchResults(response.data);
              alert(
                "Erro na transferência de estoque, verique estoque de Origem!"
              );
            } else {
              setSearchResults([]);
              setIdNova(0);
              setDestino("");
              setOrigem("");
              setDisableButton(true);
              setCamposDesabilitados(true);
              setShowMessage(true);
            }
          } else {
            alert("Erro na operação: " + response.statusText);
            setAviso("Erro na transferência");
          }
        })
        .catch((error) => {
          alert("Erro na operação: " + error);
        });
    } catch (error: any) {
      throw error;
    }
  };

  const [camposDesabilitados, setCamposDesabilitados] = useState(true);

  const handleBotaoNova = async () => {
    try {
      await api
        .post(`Guarda/TransferenciaParcialNova?usuario=${userName}`)
        .then((response) => {
          if (response.status === 200) {
            setIdNova(response.data.novaSeparacaoID);
            setCamposDesabilitados(false);
            setDestino("");
            setOrigem("");
            if (refOrigem.current) {
              refOrigem.current.focus();
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

  return (
    <div className="containerTRANSFERENCIATOTAL">
      <div className="gridTRANSFERENCIATOTAL">
        <div className="texto2">TRANSFERÊNCIA PARCIAL</div>
        <div>{idNova}</div>

        <div className="newForm">
          <div className="gridINPUTTRANSFERENCIATOTAL">
            <div className="label-TRANSFERENCIATOTAL-form">
              ORIGEM:
              <div className="input-wrapper">
                <input
                  autoFocus
                  className="newForm-InputTRANSFERENCIATOTAL"
                  type="text"
                  value={origem}
                  onInput={handleInputOrigem}
                  onKeyDown={handleKeyDownOrigem}
                  onChange={(e) => setOrigem(formatValue(e.target.value))}
                  placeholder="Endereço de saída"
                  size={30}
                  required
                  ref={refOrigem}
                  disabled={camposDesabilitados}
                ></input>
                <BsFillCheckSquareFill
                  className="button3transferenciaparcial-icon"
                  size="25"
                  onClick={handleEnterOrigem}
                />
              </div>
            </div>
            <div className="label-TRANSFERENCIATOTAL-form">
              DESTINO:
              <div className="input-wrapper">
                <input
                  className="newForm-InputTRANSFERENCIATOTAL"
                  type="text"
                  value={destino}
                  onInput={handleInputDestino}
                  onKeyDown={handleKeyDownDestino}
                  onChange={(e) => setDestino(formatValue(e.target.value))}
                  placeholder="Endereço de entrada"
                  size={30}
                  required
                  ref={refDestino}
                  disabled={camposDesabilitados}
                ></input>
                <BsFillCheckSquareFill
                  className="button3transferenciaparcial-icon"
                  size="25"
                  onClick={handleEnterDestino}
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
                        CÓDIGO
                      </div>
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
                      <div className="label1-consultaestoqueendereço">ISBN</div>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {searchResults.map((data) => (
                    <TableRow key={data.prodcode}>
                      <TableCell>
                        <div className="label2-consultaestoqueproduto">
                          {data.prodcode}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="label2-consultaestoqueproduto">
                          {data.descricao}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="label2-consultaestoqueproduto">
                          {data.quantidade}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="label2-consultaestoqueproduto">
                          {data.codigoBarras}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div className="rowInput">
            <label style={{ marginTop: "13px" }}>
              <span className="label-TRANSFERENCIATOTAL-form">PRODUTO: </span>
            </label>
            <div className="input-wrapper">
              <input
                className="input-separaçãodepedidosA"
                type="text"
                value={produtoConfirmar}
                onKeyDown={handleKeyDownProduto}
                onChange={(e) => setProdutoConfirmar(e.target.value)}
                size={30}
                placeholder=""
                ref={produtoInputRef}
                disabled={camposDesabilitados}
              />
              <BsFillCheckSquareFill
                className="button3separar-icon"
                size="25"
                onClick={handleEnterProduto}
              />
            </div>

            <label style={{ marginTop: "13px" }}>
              <span className="label-TRANSFERENCIATOTAL-form">QTDE: </span>
            </label>
            <input
              className="input-separaçãodepedidosB"
              type="text"
              value={quantidadeConfirmar || ""}
              onChange={(e) =>
                setQuantidadeConfirmar(Number.parseInt(e.target.value))
              }
              placeholder=""
              size={30}
              required
              disabled={camposDesabilitados}
            ></input>
          </div>
        </div>

        <div className="label-div-produto-a-separar" style={{ fontSize: 20 }}>
          {showMessage && "transferencia realizada com sucesso!"}
        </div>
        <button
          onClick={handleBotaoNova}
          className="myButtonPARCIAL"
          disabled={!camposDesabilitados}
        >
          NOVA
        </button>

        <button
          onClick={handleBotaoConfirmar}
          className="myButtonPARCIAL"
          disabled={disableButton}
        >
          CONFIRMAR
        </button>
        <button onClick={() => navigate(-1)} className="myButtonPARCIAL">
          VOLTAR
        </button>
      </div>
    </div>
  );
};

export default TransferenciaParcial;
