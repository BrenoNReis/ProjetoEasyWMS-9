import React from "react";
import "./wmsstyles.css"
import { CgLock, CgNotes } from "react-icons/cg"
import { BsArrowLeftRight, BsArrowRepeat, BsArrowBarDown, BsClipboardCheck, BsBoxSeam } from "react-icons/bs"
import {MdOutlineInventory2} from "react-icons/md"
import {useNavigate, useLocation} from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";

function Wms() {

    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation();

    async function consultarEstoque() {
        try {
            navigate(`/consultaEstoque`);
        } catch (error) {
            alert('Não foi possível consultar o estoque ' + error);
        }
    }     

    async function transferenciatotal() {
        try {
            navigate(`/transferenciatotal`);
        } catch (error) {
            alert('Não foi possível navegar para transferenciatotal ' + error);
        }
    }  

    async function transferenciaparcial() {
        try {
            navigate(`/transferenciaparcial`);
        } catch (error) {
            alert('Não foi possível navegar para transferenciaparcial ' + error);
        }
    } 
    
    async function separaçãodepedidos() {
        try {
            navigate(`/separaçãodepedidos`);
        } catch (error) {
            alert('Não foi possível navegar para separação de pedidos ' + error);
        }
    }    

    async function inventario() {
        try {
            navigate(`/inventario`);
        } catch (error) {
            alert('Não foi possível navegar para inventario ' + error);
        }
    }    

    function logout() {
    
        try {
          auth.logout();

          window.location.assign("/");
    
        } catch (error) {
          alert('Erro ao tentar deslogar!');
        }
      }

    return (
        <div className="containerWMS" >
            <div className="gridWMS">
            <div className="buttonWMS" onClick={inventario}>                    
                    <div className="text-conteudo-button">
                        INVENTÁRIO
                        <br/>
                        <MdOutlineInventory2 className="icon-vector"/>
                    </div>
                </div>
                <div className="buttonWMS" onClick={consultarEstoque} >                    
                    <div className="text-conteudo-button">
                        CONSULTA ESTOQUE
                        <br/>
                        <BsBoxSeam className="icon-vector"/>
                    </div>
                </div>
                <div className="buttonWMS" onClick={transferenciatotal} >
                    <div className="text-conteudo-button">
                        TRANSF. TOTAL
                        <br/>
                        <BsArrowLeftRight className="icon-vector"/>
                    </div>
                </div>
                <div className="buttonWMS" onClick={separaçãodepedidos}>
                    <div className="text-conteudo-button" >
                        SEPARAÇÃO DE PEDIDO
                        <br/>
                        <BsClipboardCheck className="icon-vector"/>
                    </div>
                </div>
                <div className="buttonWMS" onClick={transferenciaparcial}>                    
                    <div className="text-conteudo-button">
                        TRANSF. PARCIAL
                        <br/>
                        <BsArrowBarDown className="icon-vector"/>
                    </div>
                </div>
                <div className="button2" onClick={(e) => logout()}>                    
                    <div className="text-conteudo-button" >
                        <CgLock className="icon-vector2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wms;