import React, { useState, useEffect, useContext, useRef } from "react";
import "./separarproximoitemstyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import { ISepararProxPedido } from "../../context/AuthProvider/types";
import ItemPedidoContext from "../../context/Separacao/Item";
import PedidoContext from "../../context/Separacao/Pedido";
import { AuthContext } from "../../context/AuthProvider";
import { IGuardaPorItem, ISeparacaoItem } from "../../global";
import { useMotivosDivergencia } from "../../hooks/useMotivosDivergencia";
import { BsFillCheckSquareFill } from "react-icons/bs";

function SepararProximoItem() {
  const navigate = useNavigate();
  const { motivos } = useMotivosDivergencia();
  const { userName, filialUsuario } = useContext(AuthContext);
  //States do Pedido
  const { state: statePedido } = useContext(PedidoContext);
  const [pedido] = useState(statePedido.pedido);
  const [idSeparacao] = useState(statePedido.idSeparacao);
  const [comanda] = useState(statePedido.comanda);

  const [isLoading, setIsLoading] = useState(false);
  const [usaWmsComMascara] = useState(true);

  const { setState, state } = useContext(ItemPedidoContext);
  //States Local do Componente
  const [endereco, setEndereco] = useState(state.endereco);
  const [produto, setProduto] = useState(state.produto);
  const [itemPedido, setItemPedido] = useState(state.itemPedido);
  const [indice, setIndice] = useState(state.indice);
  const [itemPedidoMaximo, setItemPedidoMaximo] = useState(
    state.itemPedidoMaximo
  );
  const [prodcode, setProdcode] = useState(state.prodcode);
  const [isbn, setIsbn] = useState(state.isbn);
  const [quantidadeEndereco, setQuantidadeEndereco] = useState(
    state.quantidadeEndereco
  );

  const [enderecoConfirmar, setEnderecoConfirmar] = useState("");
  const [quantidadeConfirmar, setQuantidadeConfirmar] = useState(0);
  const [produtoConfirmar, setProdutoConfirmar] = useState("");
  const [mostrarProduto, setMostrarProduto] = useState(false);
  const [motivo, setMotivo] = useState(0);
  const produtoInputRef = useRef<HTMLInputElement>(null);
  const enderecoConfirmarInputRef = useRef<HTMLInputElement>(null);

  var filial = filialUsuario;
  var usuario = userName;

  useEffect(() => {
    handleProximoItemPesquisa(0);
  }, []);

  const handleProximoEndereco = () => {
    handleProximoItemPesquisa(2);
  };

  const handleProximoItem = () => {
    if (enderecoConfirmar === endereco) {
      handleProximoItemPesquisa(0);
      return;
    }
    setEnderecoConfirmar("");
    handleProximoItemPesquisa(0);
  };

  const confirmar = () => {
    if (
      enderecoConfirmar.replaceAll("-", "").toUpperCase() !==
      endereco.replaceAll("-", "").toUpperCase()
    ) {
      return alert(
        "Endereço bipado diferente do endereço que deve ser separado!"
      );
    }

    if (produtoConfirmar !== isbn) {
      return alert(
        "Produto bipado diferente do produto que deve ser separado!"
      );
    }

    if (quantidadeConfirmar <= 0) {
      return alert("Quantidade a separar do produto deve ser maior que zero!");
    }

    setIsLoading(true);
    var sUrl = "";

    const data: ISeparacaoItem = {
      pedido: pedido,
      idSeparacao: idSeparacao,
      itemPedido: itemPedido,
      tipoSeparacaoPedido: statePedido.tipoSeparacao,
      usuario: userName || "",
      filial: filialUsuario || 0,
      enderecoOrigem: endereco,
      enderecoConfirmado: enderecoConfirmar,
      codigoBarras: produtoConfirmar,
      quantidade: quantidadeConfirmar,
      motivoDivergencia: motivo,
    };

    api
      .post("Separacao/FazerSeparacaoDoItem", data)
      .then((response) => {
        if (response.status === 200) {
          handleProximoItemPesquisa(0);
        } else {
          alert("Erro na operação: " + response.statusText);
        }
      })
      .catch((error) => {
        alert("Erro na operação: " + error);
      });
  };

  function limparStates() {
    setEndereco("");
    setProduto("");
    setItemPedido(0);
    setIndice(0);
    setItemPedidoMaximo(0);
    setProdcode("");
    setIsbn("");
    setQuantidadeEndereco(0);
    setQuantidadeConfirmar(0);

    setState({
      ...state,
      endereco: "",
      produto: "",
      itemPedido: 0,
      indice: 0,
      itemPedidoMaximo: 0,
      prodcode: "",
      isbn: "",
      quantidadeEndereco: 0,
    });
  }

  const handleProximoItemPesquisa = async (opcao: number) => {
    setIsLoading(true);

    handleCancelClick();

    var sUrl = "";

    if (opcao == 0) {
      sUrl = `Separacao/ObtemProximoItemSeparar?opcao=${opcao}&usuario=${usuario}&filial=${filial}
      &pedido=${pedido}&idSeparacao=${idSeparacao}&usaWmsComMascara=${usaWmsComMascara}
      &itemPedido=${itemPedido}&itemPedidoMaximo=${itemPedidoMaximo}&indice=${indice}&enderecoReverso=${statePedido.endereco}`;
    } else {
      sUrl = `Separacao/ObtemProximoItemSeparar?opcao=${opcao}&usuario=${usuario}&filial=${filial}
      &pedido=${pedido}&idSeparacao=${idSeparacao}&usaWmsComMascara=${usaWmsComMascara}
      &itemPedido=${itemPedido}&itemPedidoMaximo=${itemPedidoMaximo}&indice=${indice}
      &enderecoAnterior=${endereco}&prodcode=${prodcode}&enderecoReverso=${statePedido.endereco}`;
    }

    api
      .get(sUrl)
      .then((response) => {
        if (response.status === 200) {
          setEndereco(response.data?.endereco || "");
          setProduto(response.data?.produto || "");
          setItemPedido(response.data?.itemPedido || 0);
          setIndice(response.data?.indice || 0);
          setItemPedidoMaximo(response.data?.itemPedidoMaximo || 0);
          setProdcode(response.data?.prodcode || "");
          setIsbn(response.data?.isbn || "");
          setQuantidadeEndereco(response.data?.quantidadeEndereco || 0);
          setQuantidadeConfirmar(1);
          setProdutoConfirmar("");
          if (enderecoConfirmar != response.data?.endereco) {
            setEnderecoConfirmar("");
            setMostrarProduto(false);
          } else {
            setMostrarProduto(true);
            if (produtoInputRef.current) {
              produtoInputRef.current.focus();
            }
          }

          setState({
            ...state,
            endereco: response.data?.endereco || "",
            produto: response.data?.produto || "",
            itemPedido: response.data?.itemPedido || 0,
            indice: response.data?.indice || 0,
            itemPedidoMaximo: response.data?.itemPedidoMaximo || 0,
            prodcode: response.data?.prodcode || "",
            isbn: response.data?.isbn || "",
            quantidadeEndereco: response.data?.quantidadeEndereco || 0,
          });

          if (
            enderecoConfirmarInputRef.current &&
            enderecoConfirmar != response.data?.endereco
          ) {
            enderecoConfirmarInputRef.current.focus();
          }
        } else if (response.status === 404) {
          limparStates();
          alert("Pedido finalizado ou sem itens endereçados");
        } else {
          alert("Erro na busca " + response.statusText);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          limparStates();
          alert("Pedido finalizado ou sem itens endereçados");
        } else {
          alert(error);
          setIsLoading(false);
        }
      });
  };

  const handleChangeMotivo = (event) => {
    setMotivo(Number.parseInt(event.target.value));
    setQuantidadeConfirmar(0);
  };

  async function produtosdopedido() {
    if (pedido) {
      try {
        navigate(`/produtosdopedido`);
      } catch (error) {
        alert("Não foi possível navegar para produtos do pedido " + error);
      }
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

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputConfirmar(event.target.value);
  };

  function handleInputConfirmar(value: string) {
    var inputValue = value; // event.target.value;
    const formattedValue = inputValue.match(
      /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/
    );
    //alert("formattedValue => " + formattedValue);
    if (formattedValue) {
      setEnderecoConfirmar(inputValue);
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
      setEnderecoConfirmar(inputValue);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (
        enderecoConfirmar.replaceAll("-", "").toUpperCase() ==
        endereco.replaceAll("-", "").toUpperCase()
      ) {
        //handleInputConfirmar(enderecoConfirmar);
        setMostrarProduto(true);
        if (produtoInputRef.current) {
          produtoInputRef.current.focus();
        }
      } else {
        setMostrarProduto(false);
        setEnderecoConfirmar("");
      }
    }
  };

  const handleKeyDownProduto = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      confirmar();
    }
  };

  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showDivergenceButton, setShowDivergenceButton] = useState(true);
  const [showSelect, setShowSelect] = useState(false);

  const handleDivergenceClick = () => {
    setShowCancelButton(true);
    setShowDivergenceButton(false);
    setShowSelect(true);
  };

  const handleCancelClick = () => {
    setShowCancelButton(false);
    setShowDivergenceButton(true);
    setShowSelect(false);
    setMotivo(0);
  };

  const handleConfirmEnd = async () => {
    if (
      enderecoConfirmar.replaceAll("-", "").toUpperCase() ==
      endereco.replaceAll("-", "").toUpperCase()
    ) {
      //handleInputConfirmar(enderecoConfirmar);
      setMostrarProduto(true);
      if (produtoInputRef.current) {
        produtoInputRef.current.focus();
      }
    } else {
      setMostrarProduto(false);
      setEnderecoConfirmar("");
    }
  };

  return (
    <div className="containerSEPARAÇÃODEPEDIDOS">
      <div className="gridSEPARAÇÃODEPEDIDOS">
        <div className="texto2">SEPARAR PROXIMO ITEM</div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label>
            <span className="label-separaçãodepedidos-form">PEDIDO: </span>
          </label>
        </div>

        <div className="rowInput">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={pedido}
            readOnly
          ></input>

          <input
            className="input-separaçãodepedidosB"
            placeholder=""
            size={30}
            value={comanda}
            readOnly
          ></input>

          <input
            className="input-separaçãodepedidosB"
            placeholder=""
            size={30}
            value={idSeparacao}
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
            <span className="label-separaçãodepedidos-form">PRÓXIMO: </span>
          </label>
        </div>

        <div className="rowInput">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={endereco}
            readOnly
          ></input>

          <a className="myButton2" onClick={handleProximoItem}>
            PROX ITEM
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
            <span className="label-separaçãodepedidos-form">CONFIRMA: </span>
          </label>
        </div>

        <div className="rowInput">
          <div className="input-wrapper">
            <input
              className="input-separaçãodepedidosA"
              placeholder=""
              size={30}
              value={enderecoConfirmar}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setEnderecoConfirmar(formatValue(e.target.value))
              }
              required
              ref={enderecoConfirmarInputRef}
            ></input>

            <BsFillCheckSquareFill
              className="button3separar-icon"
              size="25"
              onClick={handleConfirmEnd}
            />
          </div>

          <a className="myButton2" onClick={handleProximoEndereco}>
            PROX ENDEREÇO
          </a>
        </div>

        {mostrarProduto && (
          <div className="label-div-produto-a-separar">
            {produto}
            <br></br>
            Quantidade a Separar: {quantidadeEndereco}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label>
            <span className="label-separaçãodepedidos-form">QTDE: </span>
          </label>
        </div>

        <div className="rowInput">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={quantidadeConfirmar || ""}
            onChange={(e) =>
              setQuantidadeConfirmar(Number.parseInt(e.target.value))
            }
            required
          ></input>

          {showDivergenceButton && (
            <a className="myButton2" onClick={handleDivergenceClick}>
              DIVERGÊNCIA
            </a>
          )}
          {!showDivergenceButton && (
            <a className="myButton2" style={{ visibility: "hidden" }}>
              DIVERGÊNCIA
            </a>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label>
            <span className="label-separaçãodepedidos-form">PRODUTO: </span>
          </label>
        </div>

        <div className="rowInput">
          <input
            className="input-separaçãodepedidosA"
            placeholder=""
            size={30}
            value={produtoConfirmar}
            onChange={(e) => setProdutoConfirmar(e.target.value)}
            onKeyDown={handleKeyDownProduto}
            ref={produtoInputRef}
          ></input>

          {showCancelButton && (
            <a className="myButton2" onClick={handleCancelClick}>
              CANCELAR
            </a>
          )}
          {!showCancelButton && (
            <a className="myButton2" style={{ visibility: "hidden" }}>
              CANCELAR
            </a>
          )}
        </div>

        <div className="select-wrapper">
          {showSelect && (
            <select
              value={motivo}
              className={motivo !== 0 ? "has-val input" : "input"}
              onChange={handleChangeMotivo}
            >
              <option className="selectoptions" value={""}>
                Selecione
              </option>
              {motivos.map((motivo) => (
                <option
                  className="selectoptions"
                  key={motivo.motivoId}
                  value={motivo.motivoId}
                >
                  {motivo.motivoDescricao}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="rowInput">
          <a className="myButton3" onClick={confirmar}>
            CONFIRMAR
          </a>

          <br />
          <a className="myButton3" onClick={produtosdopedido}>
            PRODUTOS
          </a>
        </div>
        <a className="myButton3" onClick={() => navigate(-1)}>
          VOLTAR
        </a>
      </div>
    </div>
  );
}

export default SepararProximoItem;
