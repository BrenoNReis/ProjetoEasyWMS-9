import React, { useState, useContext, useRef } from "react";
import "./seleclistasepararstyles.css";
import { useNavigate } from "react-router-dom";
import ListaContext from "../../context/SeparacaoLista/Lista";
import { AuthContext } from "../../context/AuthProvider";
import api from "../../auxiliares/api";
import { BsFillCheckSquareFill } from "react-icons/bs";

function SelecListaSeparar() {
  const { state, setState } = useContext(ListaContext);
  const [listaId, setListaId] = useState(state.listaId);
  const [enderecoLista, setEnderecoLista] = useState(state.enderecoLista);

  const [enderecoSalvo, setEnderecoSalvo] = useState(false);
  const [desabilitarBotao, setDesabilitarBotao] = useState(false);

  const [tipoLista, setTipoLista] = useState(state.tipoLista);
  const [pedidoPreSeparacao, setPedidoPreSeparacao] = useState(
    state.pedidoPreSeparacao
  );
  const [usaWmsComMascara] = useState(true);

  const navigate = useNavigate();
  const { userName, filialUsuario } = useContext(AuthContext);

  async function listas() {
    try {
      navigate(`/listasseparar`);
    } catch (error) {
      alert("Não foi possível navegar para listas a separar " + error);
    }
  }

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
  const handleEndereco = async () => {
    if (enderecoLista.length >= 12) {
      api
        .get(
          `SeparacaoLista/ValidaEnderecoLista?endereco=${enderecoLista}&filial=${filialUsuario}&tipoSeparacao=${tipoLista}&usaWmsSetor=${usaWmsComMascara}&idSetor=${listaId}&pedidoPreSeparacao=${pedidoPreSeparacao}`
        )
        .then((response) => {
          if (response.status === 200) {
            setDesabilitarBotao(false);
          } else {
            alert("Endereço inválido!");
            setEnderecoLista("");
          }
        })
        .catch((error) => {
          alert("Endereço inválido!");
          setEnderecoLista("");
        });
    }
  };

  const handleInputEndereco = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const formattedValue = inputValue.match(
      /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/
    );
    if (formattedValue) {
      setEnderecoLista(inputValue);
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
      setEnderecoLista(inputValue);
    }
  };

  const handleKeyDownEndereco = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleEndereco();
    }
  };

  const handleSearch = async () => {
    await api
      .get(
        `SeparacaoLista/ObtemProximaListaSeparar?usuario=${userName}&filial=${filialUsuario}&listaId=${listaId}&usaWmsComMascara=${usaWmsComMascara}`
      )
      .then(async (response) => {
        if (response.status === 200 && response.data) {
          setListaId(response.data?.listaId || 0);
          setTipoLista(response.data?.tipoLista || "");
          setPedidoPreSeparacao(response.data?.pedidoPreSeparacao || "");
          setEnderecoLista(response.data?.enderecoLista || "");
          setEnderecoSalvo(response.data?.enderecoLista ? true : false);
          setState({
            ...state,
            listaId: response.data?.listaId || 0,
            enderecoLista: response.data?.enderecoLista || "",
            tipoLista: response.data?.tipoLista || "",
            pedidoPreSeparacao: response.data?.pedidoPreSeparacao || "",
          });
        } else {
          limpaStates();
        }
      })
      .catch((error) => {
        limpaStates();
      });
  };

  function limpaStates() {
    setListaId(0);
    setTipoLista("");
    setPedidoPreSeparacao("");
    setEnderecoLista("");
    setEnderecoSalvo(false);
    setDesabilitarBotao(true);
    setState({
      ...state,
      listaId: 0,
      enderecoLista: "",
      tipoLista: "",
      pedidoPreSeparacao: "",
    });
  }

  async function produtoslista() {
    if (listaId > 0) {
      try {
        navigate(`/produtoslista`);
      } catch (error) {
        alert("Não foi possível navegar para produtos da lista " + error);
      }
    } else {
      alert("Selecione uma lista!");
    }
  }

  async function confirmar() {
    if (listaId && enderecoLista) {
      try {
        api
          .post(
            `SeparacaoLista/AssociarEndereco?listaId=${listaId}&endereco=${enderecoLista}&tipoLista=${tipoLista}&usuario=${userName}&filial=${filialUsuario}&pedidoPreSeparacao=${pedidoPreSeparacao}`
          )
          .then((response) => {
            if (response.status === 200) {
              setState({
                ...state,
                enderecoLista: enderecoLista,
              });
              setEnderecoSalvo(true);
            } else {
              setEnderecoLista("");
              alert("Erro na operação: " + response.statusText);
            }
          })
          .catch((error) => {
            setEnderecoLista("");
            alert("Erro na operação: " + error);
          });
      } catch (error: any) {
        setEnderecoLista("");
        throw error;
      }
    }
  }

  async function separarlista() {
    if (state.listaId && state.enderecoLista) {
      if (
        state.tipoLista == "1/N" ||
        state.tipoLista == "Carrinho" ||
        state.tipoLista == "Colméia"
      ) {
        api
          .get(
            `SeparacaoLista/BuscaQuantidadePedidosAPosicionar?listaId=${listaId}`
          )
          .then((response) => {
            if (response.status === 200) {
              if (response.data.quantidade > 0) {
                navigate(`/listaassosiacao`);
              } else {
                try {
                  navigate(`/separarproximoitemlista`);
                } catch (error) {
                  alert(
                    "Não foi possível navegar para proximo item da lista " +
                      error
                  );
                }
              }
            }
          });
      } else {
        try {
          navigate(`/separarproximoitemlista`);
        } catch (error) {
          alert("Não foi possível navegar para proximo item da lista " + error);
        }
      }
    } else {
      alert("Selecione uma lista com endereço associado!");
    }
  }

  return (
    <div className="containerSEPARAÇÃODEPEDIDOS">
      <div className="gridSEPARAÇÃODEPEDIDOS">
        <div className="texto2">SELEÇÃO DE LISTA A SEPARAR</div>
        <div style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {userName}
        </div>

        <div className="rowInput">
          <a className="myButton3" onClick={listas}>
            LISTAS
          </a>

          <br />
          <a className="myButton3" onClick={handleSearch}>
            PRÓXIMA
          </a>
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={tipoLista}
            readOnly
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label>
            <span className="label-separaçãodepedidos-form">LISTA: </span>
          </label>
        </div>

        <div className="rowInput">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={listaId || ""}
            readOnly
          ></input>

          <a className="myButton2" onClick={produtoslista}>
            PRODUTOS
          </a>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label>
            <span className="label-separaçãodepedidos-form">ENDEREÇO: </span>
          </label>
        </div>

        <div className="input-wrapper">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            onInput={handleInputEndereco}
            onKeyDown={handleKeyDownEndereco}
            onChange={(e) => setEnderecoLista(formatValue(e.target.value))}
            value={enderecoLista}
            readOnly={enderecoSalvo}
          ></input>
          <BsFillCheckSquareFill
            className="button3separar-icon"
            size="25"
            onClick={handleEndereco}
            // disabled={desabilitarBotao || enderecoSalvo}
          />
        </div>

        <div className="rowInput">
          <button
            className="myButton3"
            onClick={confirmar}
            disabled={desabilitarBotao || enderecoSalvo}
          >
            CONFIRMAR
          </button>

          <br />
          <a className="myButton3" onClick={separarlista}>
            SEPARAR
          </a>
        </div>
        <a className="myButton3" onClick={() => navigate(-1)}>
          VOLTAR
        </a>
      </div>
    </div>
  );
}

export default SelecListaSeparar;
