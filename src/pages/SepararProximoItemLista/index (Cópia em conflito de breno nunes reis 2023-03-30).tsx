import React, { useState, useEffect, useContext, useRef } from "react";
import "./listaemandamentostyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import { AuthContext } from "../../context/AuthProvider";
import { ISeparacaoItemLista } from "../../global";
import { useMotivosDivergencia } from "../../hooks/useMotivosDivergencia";
import ListaContext from "../../context/SeparacaoLista/Lista";
import ItemListaContext from "../../context/SeparacaoLista/Item";
import { BsFillCheckSquareFill } from "react-icons/bs";

function SepararProximoItemLista() {
  const navigate = useNavigate();
  const { motivos } = useMotivosDivergencia();
  const { userName, filialUsuario } = useContext(AuthContext);
  //States da Lista (CONTEXT API)
  const { state: stateLista } = useContext(ListaContext);
  const [listaId] = useState(stateLista.listaId);
  const [tipoLista] = useState(stateLista.tipoLista);
  const [enderecoLista] = useState(stateLista.enderecoLista);

  const [isLoading, setIsLoading] = useState(false);
  const [usaWmsComMascara] = useState(true);

  const { setState, state } = useContext(ItemListaContext);
  //States do Item da Lista (CONTEXT API)
  const [endereco, setEndereco] = useState(state.endereco);
  const [produto, setProduto] = useState(state.produto);
  const [itemLista, setItemLista] = useState(state.itemLista);
  const [indice, setIndice] = useState(state.indice);
  const [prodcode, setProdcode] = useState(state.prodcode);
  const [isbn, setIsbn] = useState(state.isbn);
  const [quantidadeEndereco, setQuantidadeEndereco] = useState(
    state.quantidadeEndereco
  );
  const [quantidadeCaixa, setQuantidadeCaixa] = useState(state.quantidadeCaixa);
  const [codigoBarras, setCodigoBarras] = useState(state.codigoBarras);

  const [enderecoConfirmar, setEnderecoConfirmar] = useState("");
  const [quantidadeConfirmar, setQuantidadeConfirmar] = useState(0);
  const [produtoConfirmar, setProdutoConfirmar] = useState("");
  const [mostrarProduto, setMostrarProduto] = useState(false);
  const [motivo, setMotivo] = useState(0);
  const produtoInputRef = useRef<HTMLInputElement>(null);
  const enderecoConfirmarInputRef = useRef<HTMLInputElement>(null);
  const [enderecoOrigem, setEnderecoOrigem] = useState(0);
  const [usaWmsPulmao, setUsaWmsPulmao] = useState(false);

  var filial = filialUsuario;
  var usuario = userName;

  useEffect(() => {
    if (itemLista <= 0) {
      handleProximoItemPesquisa(0);
    }
  }, []);

  const handleProximoEndereco = () => {
    handleProximoItemPesquisa(2);
  };

  const handleProximoItem = () => {
    handleProximoItemPesquisa(0);
  };

  function confirmarEndereco() {
    if (enderecoConfirmar === endereco) {
      setMostrarProduto(true);
      if (produtoInputRef.current) {
        produtoInputRef.current.focus();
      }
    } else {
      setMostrarProduto(false);
      setEnderecoConfirmar("");
    }
  }

  const confirmar = () => {
    if (enderecoConfirmar !== endereco) {
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

    const data: ISeparacaoItemLista = {
      listaId: listaId,
      itemLista: itemLista,
      tipoLista: stateLista.tipoLista,
      enderecoLista: enderecoLista,
      usuario: userName || "",
      filial: filialUsuario || 0,
      enderecoOrigem: endereco,
      enderecoConfirmado: enderecoConfirmar,
      codigoBarras: produtoConfirmar,
      quantidade: quantidadeConfirmar,
      motivoDivergencia: motivo,
    };

    api
      .post("SeparacaoLista/FazerSeparacaoDoItem", data)
      .then((response) => {
        if (response.status === 200) {
          if (
            stateLista.tipoLista == "1/N" ||
            stateLista.tipoLista == "Carrinho"
          ) {
            navigate(`/listadistribuicao`);
          } else {
            handleProximoItemPesquisa(0);
          }
        } else {
          alert("Erro na operação: " + response.statusText);
        }
      })
      .catch((error) => {
        // alert("Erro na operação: " + error);
        alert("Erro na operação: " + error?.response?.data?.message);
      });
  };

  function limparStates() {
    setEndereco("");
    setEnderecoConfirmar("");
    setProduto("");
    setProdutoConfirmar("");
    setItemLista(0);
    setIndice(0);
    setProdcode("");
    setIsbn("");
    setQuantidadeEndereco(0);
    setQuantidadeCaixa(0);
    setCodigoBarras("");
    setQuantidadeConfirmar(0);
    setMostrarProduto(false);

    setState({
      ...state,
      endereco: "",
      produto: "",
      itemLista: 0,
      indice: 0,
      prodcode: "",
      isbn: "",
      quantidadeEndereco: 0,
      quantidadeCaixa: 0,
      codigoBarras: "",
    });
  }

  const handleProximoItemPesquisa = async (opcao: number) => {
    setIsLoading(true);

    handleCancelClick();

    var sUrl = "";

    if (opcao == 0) {
      sUrl = `SeparacaoLista/ObtemProximoItemSeparar?opcao=${opcao}&enderecoOrigem=${enderecoOrigem}
      &tipoLista=${tipoLista}&usuario=${usuario}&filial=${filial}
      &listaId=${listaId}&indice=${indice}&itemLista=${itemLista}&usaWmsComMascara=${usaWmsComMascara}
      &usaWmsPulmao=${usaWmsPulmao}&enderecoAnterior=${endereco}`;
    } else {
      sUrl = `SeparacaoLista/ObtemProximoItemSeparar?opcao=${opcao}&enderecoOrigem=${enderecoOrigem}
      &tipoLista=${tipoLista}&usuario=${usuario}&filial=${filial}
      &listaId=${listaId}&indice=${indice}&itemLista=${itemLista}&usaWmsComMascara=${usaWmsComMascara}
      &usaWmsPulmao=${usaWmsPulmao}&enderecoAnterior=${endereco}&prodcode=${prodcode}`;
    }

    api
      .get(sUrl)
      .then((response) => {
        if (response.status === 200) {
          setEndereco(response.data?.endereco || "");
          setProduto(response.data?.produto || "");
          setItemLista(response.data?.itemLista || 0);
          setIndice(response.data?.indice || 0);
          setProdcode(response.data?.prodcode || "");
          setIsbn(response.data?.isbn || "");
          setQuantidadeEndereco(response.data?.quantidadeEndereco || 0);
          setQuantidadeCaixa(response.data?.quantidadeCaixa || 0);
          setCodigoBarras(response.data?.codigoBarras || "");
          setQuantidadeConfirmar(1);
          setEnderecoConfirmar("");
          setProdutoConfirmar("");
          setMostrarProduto(false);

          setState({
            ...state,
            endereco: response.data?.endereco || "",
            produto: response.data?.produto || "",
            itemLista: response.data?.itemLista || 0,
            indice: response.data?.indice || 0,
            prodcode: response.data?.prodcode || "",
            isbn: response.data?.isbn || "",
            quantidadeEndereco: response.data?.quantidadeEndereco || 0,
            quantidadeCaixa: response.data?.quantidadeCaixa || 0,
            codigoBarras: response.data?.codigoBarras || "",
          });

          if (enderecoConfirmarInputRef.current) {
            enderecoConfirmarInputRef.current.focus();
          }
        } else if (response.status === 404) {
          limparStates();
          alert("Lista finalizada ou sem itens endereçados");
        } else {
          alert("Erro na busca " + response.statusText);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          limparStates();
          alert("Lista finalizada ou sem itens endereçados");
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

  async function produtosdalista() {
    if (listaId) {
      try {
        navigate(`/produtoslista`);
      } catch (error) {
        alert("Não foi possível navegar para produtos da Lista!" + error);
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
    let inputValue = event.target.value;
    const formattedValue = inputValue.match(
      /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}$/
    );
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
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      confirmarEndereco();
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

  return (
    <div className="containerSEPARAÇÃODEPEDIDOS">
      <div className="gridSEPARAÇÃODEPEDIDOS">
        <div className="texto2">LISTA EM ANDAMENTO</div>

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
            value={listaId}
            readOnly
          ></input>

          {/* <input
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
          ></input> */}
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
            />
            <BsFillCheckSquareFill
              className="button3separar-icon"
              size="25"
              onClick={confirmarEndereco}
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
            <div style={{ fontSize: 16, color: "yellow", fontWeight: "bold", textAlign: "center", marginLeft: 8 }}>
            Quantidade a Separar: {quantidadeEndereco}
            </div>
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
          <a className="myButton3" onClick={produtosdalista}>
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

export default SepararProximoItemLista;
