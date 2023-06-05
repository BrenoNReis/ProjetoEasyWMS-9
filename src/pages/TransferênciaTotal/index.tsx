import React, { useContext, useRef, useState } from "react";
import "./transferenciatotalstyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import { IGuardaPorItem, IGuardaTotal } from "../../global";
import { AuthContext } from "../../context/AuthProvider";
import { BsFillCheckSquareFill } from "react-icons/bs";

const TransferenciaTotal: React.FC = () => {
  const { userName, filialUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [query, setQuery] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const refOrigem = useRef<HTMLInputElement>(null);
  const refDestino = useRef<HTMLInputElement>(null);
  const [aviso, setAviso] = useState("");

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
      const data: IGuardaTotal = {
        usuario: userName || "",
        filial: filialUsuario || 0,
        enderecoOrigem: origem,
        enderecoDestino: destino,
      };

      await api
        .post("Guarda/FazerTransferenciaTotal", data)
        .then((response) => {
          if (response.status === 200) {
            setDestino("");
            setOrigem("");
            //console.log(response);
            //alert(response);
            setAviso(response.data);

            if (refOrigem.current) {
              refOrigem.current.focus();
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

  return (
    <div className="containerTRANSFERENCIATOTAL">
      <div className="gridTRANSFERENCIATOTAL">
        <div className="texto2">TRANSFERÊNCIA</div>

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
                />
                <BsFillCheckSquareFill
                  className="button3transferenciatotal-icon"
                  size="25"
                  onClick={HandleSearchOrigem}
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
                />
                <BsFillCheckSquareFill
                  className="button3transferenciatotal-icon"
                  size="25"
                  onClick={handleSearchDestino}
                />
              </div>
            </div>
          </div>

          <div className="label-TRANSFERENCIATOTAL-form">
            TRANSFERÊNCIA:
            <input
              className="newForm-InputTRANSFERENCIATOTAL"
              type="text"
              value={aviso}
              placeholder="Última transferência realizada"
              size={30}
              readOnly
            ></input>
          </div>
        </div>

        <a onClick={handleBotaoConfirmar} className="myButtonTRANSFERENCIATOTAL">
          CONFIRMAR
        </a>
        <a onClick={() => navigate(-1)} className="myButtonTRANSFERENCIATOTAL">
          VOLTAR
        </a>
      </div>
    </div>
  );
};

export default TransferenciaTotal;
