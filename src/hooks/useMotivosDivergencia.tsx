import { useEffect, useState } from "react";
import api from "../auxiliares/api";

export interface IMotivoDivergencia {
  motivoId: number;
  motivoDescricao: string;
}

export const useMotivosDivergencia = () => {
  const [motivos, setMotivos] = useState<IMotivoDivergencia[]>([]);

  //USANDO AXIOS
  useEffect(() => {
    api.get("Separacao/ObtemMotivosDivergencia").then((response) => {
      setMotivos(response.data);
    });
  }, []);

  return {
    motivos,
  };
};
