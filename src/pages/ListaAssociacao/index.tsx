import React, { useState, useContext, useRef, useEffect } from "react";
import "./listaassosiacaostyles.css";
import { useNavigate } from "react-router-dom";
import ListaContext from "../../context/SeparacaoLista/Lista";
import { AuthContext } from "../../context/AuthProvider";
import api from "../../auxiliares/api";
import { BsFillCheckSquareFill } from "react-icons/bs";

function ListaAssociacao() {
  const [comandaAssociada, setComandaAssociada] = useState(false);

  const { state, setState } = useContext(ListaContext);
  const [listaId, setListaId] = useState(state.listaId);
  const [enderecoLista, setEnderecoLista] = useState(state.enderecoLista);
  const [tipoLista, setTipoLista] = useState(state.tipoLista);
  const [pedidoPreSeparacao, setPedidoPreSeparacao] = useState(
    state.pedidoPreSeparacao
  );
  const [usaWmsComMascara] = useState(true);
  const [caixa, setCaixa] = useState("");
  const [comanda, setComanda] = useState("");
  const [pedido, setPedido] = useState("");
  const [idSeparacao, setIdSeparacao] = useState(0);
  const [transportadora, setTransportadora] = useState("");
  const [quantidadePosicoes, setQuantidadePosicoes] = useState(0);
  const [proximaPosicao, setProximaPosicao] = useState(0);

  const navigate = useNavigate();
  const { userName, filialUsuario } = useContext(AuthContext);

  const posicaoInputRef = useRef<HTMLInputElement>(null);
  const comandaInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleProximoPedido();
  }, []);

  function limparStates() {
    setPedido("");
    setIdSeparacao(0);
    setTransportadora("");
    setQuantidadePosicoes(0);
    setProximaPosicao(0);
  }

  const handleProximoPedido = async () => {
    var sUrl = "";
    setCaixa("");
    setComanda("");
    sUrl = `SeparacaoLista/ObtemProximoPedidoAPosicionar?listaId=${listaId}&tipoLista=${tipoLista}`;

    api
      .get(sUrl)
      .then((response) => {
        if (response.status === 200) {
          setPedido(response.data?.pedido || "");
          setIdSeparacao(response.data?.idSeparacao || 0);
          setTransportadora(response.data?.transportadora || "");
          setQuantidadePosicoes(response.data?.quantidadePosicoes || 0);
          setProximaPosicao(response.data?.proximaPosicao || 0);

          if (posicaoInputRef.current) {
            posicaoInputRef.current.focus();
          }
        } else if (response.status === 404) {
          limparStates();
          alert("Lista sem Pedidos a Posicionar!");
        } else {
          alert("Erro na busca " + response.statusText);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          limparStates();
          alert("Lista sem Pedidos a Posicionar!");
        } else {
          alert(error);
        }
      });
  };

  async function confirmar() {
    if (pedido && comanda) {
      try {
        api
          .post(
            `SeparacaoLista/AssociarPosicao?listaId=${listaId}&pedido=${pedido}
          &idSeparacao=${idSeparacao}&tipoLista=${tipoLista}&usuario=${userName}
          &comanda=${comanda}&posicao=${caixa}`
          )
          .then((response) => {
            if (response.status === 200) {
              handleProximoPedido();
              setComandaAssociada(true);
            } else {
              //setComanda("");
              alert("Erro na operação: " + response.statusText);
            }
          })
          .catch((error) => {
            //setComanda("");
            //console.log(error);
            alert("Erro na operação: " + error?.response?.data?.message);
          });
      } catch (error: any) {
        //setComanda("");
        throw error;
      }
    }
  }

  const CaixaEnter = () => {
    if (comandaInputRef .current) {
      comandaInputRef .current.focus();
    }
  }

  return (
    <div className="containerSEPARAÇÃODEPEDIDOS">
      <div className="gridSEPARAÇÃODEPEDIDOS">
        <div className="texto2">ASSOCIA COMANDA</div>
        <div style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          {listaId}
        </div>

        <div style={{ fontSize: 18, color: "yellow", fontWeight: "bold", textAlign: "left", marginLeft: 8 }}>
          {quantidadePosicoes} ITENS
        </div>

        <div className="rowInput">
          <br />
          <a className="myButton3" onClick={handleProximoPedido}>
            PRÓXIMA
          </a>
          <label>
            <span className="label-listaassosiacao-form">PEDIDO: </span>
          </label>
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={pedido}
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
            <span className="label-separaçãodepedidos-form">CAIXA: </span>
          </label>
        </div>
        <div className="input-wrapper">
            <input
              className="input-separaçãodepedidosA"
              placeholder=""
              size={30}
              value={caixa}
              onChange={(e) => setCaixa(e.target.value)}
              ref={posicaoInputRef}
            />
            <BsFillCheckSquareFill
              className="button3separar-icon"
              size="25"
              onClick={CaixaEnter}
            />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label>
            <span className="label-separaçãodepedidos-form">COMANDA: </span>
          </label>
        </div>

        <div className="rowInput">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={comanda}
            onChange={(e) => setComanda(e.target.value)}
            ref={comandaInputRef}
          ></input>
        </div>
        <div className="label-listaassosiacao-form2">
          {transportadora}
        </div>
        {comandaAssociada ? (
        <div
          style={{
            fontSize: 18,
            color: "SpringGreen",
            fontWeight: "bold",
          }}
        >
          COMANDA ASSOCIADA COM SUCESSO
        </div>
      ) : null}

        <div className="rowInput">
          <a className="myButton3" onClick={confirmar}>
            CONFIRMAR
          </a>

          <br />

          <a className="myButton3" onClick={() => navigate(-1)}>
            VOLTAR
          </a>
        </div>
      </div>
    </div>
  );
}

export default ListaAssociacao;
