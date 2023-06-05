import { useState, useContext } from "react";
import "./separaçãodepedidosstyles.css";
import { useNavigate } from "react-router-dom";
import { IProxPedido } from "../../context/AuthProvider/types";
import api from "../../auxiliares/api";
import PedidoContext from "../../context/Separacao/Pedido";
import { AuthContext } from "../../context/AuthProvider";

function SeparaçãoDePedidos() {
  const { userName, filialUsuario } = useContext(AuthContext);

  const { setState, state } = useContext(PedidoContext);

  const [pedido, setPedido] = useState(state.pedido);
  const [idSeparacao, setIdSeparacao] = useState(state.idSeparacao);
  const [transportadora, setTransportadora] = useState(state.transportadora);
  const [tipoSeparacao, setTipoSeparacao] = useState(state.tipoSeparacao);
  const [comanda, setComanda] = useState(state.comanda);
  const [filtraPedido, setFiltraPedido] = useState(false);
  const [filtraEndereco, setfiltraEndereco] = useState(false);
  const [endereco, setEndereco] = useState(state.endereco);

  const navigate = useNavigate();

  var filial = filialUsuario;
  var usuario = userName;

  async function convertToIProxPedido(obj: any): Promise<IProxPedido> {
    // Simula uma operação assíncrona que retorna o objeto depois de 1 segundo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      pedido: obj.pedido,
      comanda: obj.comanda,
      idSeparacao: obj.idSeparacao,
      tipoSeparacao: obj.tipoSeparacao,
      transportadora: obj.transportadora,
    };
  }

  const handleSearch = async () => {
    if (filtraPedido && !pedido) {
      setFiltraPedido(false);
    }

    await api
      .get(
        `Separacao/ObtemProximoPedidoSeparar?usuario=${usuario}&filial=${filial}&filtrarPedido=${filtraPedido}${
          pedido ? `&pedido=${pedido}` : ""
        }`
      )
      .then(async (response) => {
        if (response.status === 200 && response.data) {
          setTipoSeparacao(response.data?.tipoSeparacao || "");
          setTransportadora(response.data?.transportadora || "");
          setPedido(response.data?.pedido || "");
          setIdSeparacao(response.data?.idSeparacao || 0);
          setComanda(response.data?.comanda || "");
          setState({
            ...state,
            pedido: response.data?.pedido || "",
            comanda: response.data?.comanda || "",
            idSeparacao: response.data?.idSeparacao || 0,
            tipoSeparacao: response.data?.tipoSeparacao || "",
            transportadora: response.data?.transportadora || "",
          });
          /*setPedidoContexto({
            pedido: response.data?.pedido || "",
            comanda: response.data?.comanda || "",
            idSeparacao: response.data?.idSeparacao || 0,
            tipoSeparacao: response.data?.tipoSeparacao || "",
            transportadora: response.data?.transportadora || "",
          });*/
        } else {
          //alert("Erro na busca " + response.statusText);
          limpaStates();
        }
      })
      .catch((error) => {
        //console.log(error);
        //alert(error?.message);
        limpaStates();
      });
  };

  function limpaStates() {
    setTipoSeparacao("");
    setTransportadora("");
    setPedido("");
    setIdSeparacao(0);
    setComanda("");
    setState({
      ...state,
      pedido: "",
      comanda: "",
      idSeparacao: 0,
      tipoSeparacao: "",
      transportadora: "",
    });
  }

  async function pedidosaseparar() {
    try {
      navigate(`/pedidosaseparar`);
    } catch (error) {
      alert("Não foi possível navegar para pedidos a separar " + error);
    }
  }

  async function pedidosjaseparados() {
    try {
      navigate(`/pedidosjaseparados`);
    } catch (error) {
      alert("Não foi possível navegar para pedidos ja separados " + error);
    }
  }

  async function produtosdopedido() {
    if (pedido) {
      try {
        navigate(`/produtosdopedido`);
      } catch (error) {
        alert("Não foi possível navegar para produtos do pedido " + error);
      }
    }
  }

  async function separar() {
    if (pedido && comanda) {
      try {
        setState({
          ...state,
          endereco: endereco,
        });

        navigate(`/separarproximoitem`);
      } catch (error) {
        alert("Não foi possível iniciar separação do pedido " + error);
      }
    }
  }

  async function confirmar() {
    if (pedido && comanda) {
      try {
        api
          .post(`Separacao/AssociarComanda?pedido=${pedido}&comanda=${comanda}`)
          .then((response) => {
            if (response.status === 200) {
              setState({
                ...state,
                comanda: comanda,
              });
              separar();
            } else {
              setComanda("");
              alert("Erro na operação: " + response.statusText);
            }
          })
          .catch((error) => {
            setComanda("");
            alert("Erro na operação: " + error);
          });
      } catch (error: any) {
        setComanda("");
        throw error;
      }
    }
  }

  const identificacao =
    usuario + (transportadora ? " | " + transportadora : "");

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //       handleSearch();
  //   }

  return (
    <div className="containerSEPARAÇÃODEPEDIDOS">
      <div className="gridSEPARAÇÃODEPEDIDOS">
        <div className="texto2">
          SEPARAÇÃO DE PEDIDOS{" "}
          <input
            className="input-separaçãodepedidos"
            placeholder=""
            size={30}
            value={tipoSeparacao}
            readOnly
          ></input>
        </div>

        <div style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          {identificacao}
        </div>

        <a className="myButton3" onClick={pedidosaseparar}>
          A SEPARAR
        </a>
        <a className="myButton3" onClick={handleSearch}>
          PROX PEDIDO
        </a>
        <a className="myButton3" onClick={pedidosjaseparados}>
          SEPARADOS
        </a>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div className="rowInput">
            <label style={{ marginLeft: "5px", marginRight: "5px" }}>
              <span className="label-separaçãodepedidos-form">PEDIDO: </span>
            </label>

            <input
              type="checkbox"
              checked={filtraPedido}
              onChange={({ target }) => setFiltraPedido(target.checked)}
            />
          </div>
        </div>

        <div className="rowInput">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={pedido}
            onChange={({ target }) => setPedido(target.value)}
            required
            readOnly={!filtraPedido}
          ></input>

          <input
            className="input-separaçãodepedidosB"
            placeholder=""
            size={30}
            value={idSeparacao || ""}
            required
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
          <div className="rowInput">
            <label style={{ marginLeft: "5px", marginRight: "5px" }}>
              <span className="label-separaçãodepedidos-form">ENDEREÇO: </span>
            </label>

            <input
              type="checkbox"
              checked={filtraEndereco}
              onChange={({ target }) => setfiltraEndereco(target.checked)}
              size={10}
            />
          </div>
        </div>

        <div className="rowInput">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={endereco}
            onChange={({ target }) => setEndereco(target.value)}
            required
            readOnly={!filtraEndereco}
          ></input>
          <br />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div className="rowInput">
              <label style={{ marginTop: "13px" }}>
                <span className="label-separaçãodepedidos-form">COMANDA: </span>
              </label>

              <input
                className="input-separaçãodepedidosA"
                placeholder=""
                size={30}
                required
                value={comanda}
                onChange={({ target }) => setComanda(target.value)}
                readOnly={state.comanda !== ""}
              />
            </div>
          </div>
        </div>

        <div className="rowInput">
          {state.comanda === "" && (
            <a className="myButton" onClick={confirmar}>
              CONFIRMAR
            </a>
          )}
          <a className="myButton" onClick={separar}>
            SEPARAR
          </a>
        </div>
        <div className="rowInput">
          <a className="myButton" onClick={produtosdopedido}>
            PRODUTOS
          </a>
          <a className="myButton" onClick={() => navigate(-1)}>
            VOLTAR
          </a>
        </div>
      </div>
    </div>
  );
}

export default SeparaçãoDePedidos;
