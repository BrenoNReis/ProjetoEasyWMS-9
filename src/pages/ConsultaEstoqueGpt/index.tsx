import React, { useState, useEffect, useContext } from "react";
import api from "../../auxiliares/api";
import { AuthContext } from "../../context/AuthProvider";
import {
  IConsultaPorProduto,
  useConsultaPorProduto,
} from "../../hooks/useConsultaPorProduto";

const ConsultaEstoqueGpt: React.FC = () => {
  const { filialUsuario } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<IConsultaPorProduto[]>([]);

  const handleSearch = async () => {
    setIsLoading(true);

    var filial = filialUsuario;
    var usaWmsComMascara = true;

    api
      .get(
        `ConsultaEstoques/ObtemPorProduto?prodcode=${query}&filial=${filial}&usaWmsComMascara=${usaWmsComMascara}`
      )
      .then((response) => {
        setSearchResults(response.data);
      });

    setIsLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Digite o código do produto"
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Pesquisando..." : "Pesquisar"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Endereço</th>
            <th>Quantidade</th>
            <th>Tipo de Endereço</th>
            <th>Quantidade de Caixas</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((data) => (
            <tr key={data.endereco}>
              <td>{data.endereco}</td>
              <td>{data.quantidade}</td>
              <td>{data.tipoEndereco}</td>
              <td>{data.quantidadeCaixas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaEstoqueGpt;
