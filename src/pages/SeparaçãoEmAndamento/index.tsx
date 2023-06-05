import React from "react";
import "./separaçãoemandamentostyles.css"
import { BiArrowFromRight } from "react-icons/bi"
import { BsCheck2 } from "react-icons/bs"
import { useNavigate } from "react-router-dom";

function SeparaçãoEmAndamento() {

    const navigate = useNavigate();

    return (
        <div className="containerSEPARAÇÃOEMANDAMENTO" >
            <div className="gridSEPARAÇÃOEMANDAMENTO">

                <div className="texto2">SEPARAÇÃO EM ANDAMENTO</div>

                <br />

                <label>
                    <span className="label-separaçãoemandamento-form">PEDIDO: </span>
                </label>

                <input className="input-separaçãoemandamento" placeholder="" size={30} required></input>
                <input className="input-separaçãoemandamento" placeholder="" size={30} required></input>

                <label>
                    <span className="label-separaçãoemandamento-form">PRÓXIMO: 
                        <input className="input-separaçãoemandamento" placeholder="" size={30} required></input>
                        <a href="#" className="myButton">PRÓXIMO ITEM</a>
                    </span>
                </label>

                <label>
                    <span className="label-separaçãoemandamento-form">CONFIRMA: 
                        <input className="input-separaçãoemandamento" placeholder="" size={30} required></input>
                        <a href="#" className="myButton">PRÓX. ENDEREÇO</a>
                    </span>
                </label>

                <label>
                    <span className="label-separaçãoemandamento-form">QTDE: 
                        <input className="input-separaçãoemandamento" placeholder="" size={30} required></input>
                        <a href="#" className="myButton">DIVERGÊNCIA</a>
                    </span>
                </label>

                <label>
                    <span className="label-separaçãoemandamento-form">PRODUTO: 
                        <input className="input-separaçãoemandamento" placeholder="" size={30} required></input>
                    </span>
                </label>

                <br />

                <a href="#" className="myButton">CONFIRMAR</a>
                <br/>
                <a href="#" className="myButton">PRODUTOS</a>
                <br/>
                <a href="#" className="myButton">VOLTAR</a>

            </div>
        </div >

    );
}

export default SeparaçãoEmAndamento;

/*
                <form>

                    <div className="formSEPARAÇÃODEPEDIDOS">

                        <label className="label-separaçãodepedidos-form">PEDIDO</label>

                        <div className="input-div">
                            <input className="input-separaçãodepedidos" placeholder="ORIGEM" />
                        </div>

                        <label className="label-separaçãodepedidos-form">COMANDA</label>

                        <div className="input-div">
                            <input className="input-separaçãodepedidos" placeholder="PRODUTO" />
                        </div>

                    </div>

                </form>

                <form>

                    <div className="formSEPARAÇÃODEPEDIDOS">

                        <label className="label-separaçãodepedidos-form">QTDE</label>

                        <div className="input-div">
                            <input className="input-separaçãodepedidos" placeholder="QTDE" />
                        </div>

                    </div>

                </form>
*/

/*
                <div className="buttonSEPARAÇÃODEPEDIDOS" onClick={() => navigate(-1)}>
                    <div className="text-conteudo-button">
                        VOLTAR
                        <br />
                        <BiArrowFromRight className="icon-vector" />
                    </div>
                </div>

                <div className="buttonSEPARAÇÃODEPEDIDOS" onClick={() => navigate(-1)}>
                    <div className="text-conteudo-button">
                        CONFIRMAR
                        <br />
                        <BsCheck2 className="icon-vector" />
                    </div>
                </div>

*/