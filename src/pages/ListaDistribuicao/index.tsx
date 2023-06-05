import { useState, useEffect, useContext } from "react";
import "./listadistribuicaostyles.css";
import { useNavigate } from "react-router-dom";
import api from "../../auxiliares/api";
import { AuthContext } from "../../context/AuthProvider";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IListaDistribuir } from "../../context/AuthProvider/types";
import ListaContext from "../../context/SeparacaoLista/Lista";
import ItemListaContext from "../../context/SeparacaoLista/Item";

function ListaDistribuicao() {
  const { userName, filialUsuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useContext(ListaContext);
  const { state: stateItem, setState } = useContext(ItemListaContext);
  const [searchListas, setSearchListas] = useState<IListaDistribuir[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  var filial = filialUsuario;
  var usuario = userName;

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);

      api
        .get(
          `SeparacaoLista/ObtemDistribuicaoLista?listaId=${state.listaId}&listaItem=${stateItem.itemLista}&tipoLista=${state.tipoLista}`
        )
        .then((response) => {
          if (response.status === 200) {
            setSearchListas(response.data);
          } else {
            alert("Erro na busca " + response.statusText);
          }

          setIsLoading(false);
        })
        .catch((error) => {
          alert(error);
          setIsLoading(false);
        });
    };
    handleSearch();
  }, []);

  function voltar() {
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
      mensagemRetorno: "",
    });

    navigate(-1);
  }

  return (
    <div className="containerSEPARAÇÃODEPEDIDOS">
      <div className="gridSEPARAÇÃODEPEDIDOS">
        <div className="texto2">DISTRIBUIÇÃO X CAIXA</div>

        <div className="table-consultaestoqueendereço">
          <TableContainer sx={{ maxHeight: 420 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">ISBN</div>
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">QTDE</div>
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">TÍTULO</div>
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    <div className="label1-consultaestoqueendereço">
                      POSIÇÃO
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {searchListas.map((data) => (
                  <TableRow key={data.isbn}>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.isbn}
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.quantidade}
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.titulo}
                      </div>
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      <div className="label2-consultaestoqueendereço">
                        {data.posicao}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* <a className="myButton3" onClick={() => navigate(-1)}> */}
        <a className="myButton3" onClick={voltar}>
          VOLTAR
        </a>
      </div>
    </div>
  );
}

export default ListaDistribuicao;
