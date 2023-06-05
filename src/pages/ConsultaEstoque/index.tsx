import React from "react";
import "./consultaestoquestyles.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiExit } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxDoubleArrowDown } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function ConsultaEstoque() {
  const navigate = useNavigate();

  async function consultarEstoqueProduto() {
    try {
      navigate(`/consultaEstoqueProduto`);
    } catch (error) {
      alert("Não foi possível consultar o estoque de produto " + error);
    }
  }

  async function consultarEstoqueEndereço() {
    try {
      navigate(`/consultaEstoqueEndereço`);
    } catch (error) {
      alert("Não foi possível consultar o estoque de endereço " + error);
    }
  }

  return (
    <div className="containerCONSULTAESTOQUE">
      <div className="gridCONSULTAESTOQUE">
        <div className="texto2">CONSULTA DE ESTOQUE</div>
        <br />
        <br />
        <div className="texto1">SELECIONE UMA OPÇÃO</div>

        <RxDoubleArrowDown className="icon-vector3" />

        <div className="button" onClick={consultarEstoqueProduto}>
          <div className="text-conteudo-button">
            PRODUTO
            <br />
            <AiOutlineShoppingCart className="icon-vector" />
          </div>
        </div>
        <div className="button" onClick={consultarEstoqueEndereço}>
          <div className="text-conteudo-button">
            ENDEREÇO
            <br />
            <MdOutlineLocationOn className="icon-vector" />
          </div>
        </div>
        <div className="button" onClick={() => navigate(-1)}>
          <div className="text-conteudo-button">
            VOLTAR
            <br />
            <BiExit className="icon-vector" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultaEstoque;
