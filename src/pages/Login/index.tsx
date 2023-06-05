import { useState } from "react";
import "./loginstyles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useFiliais } from "../../hooks/useFiliais";

import logoImage from "../../assets/easywms9logo6.png";
import { useAuth } from "../../context/AuthProvider/useAuth";

const Login = () => {
  const [filialUsuario, setFilialUsuario] = useState(0);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { filiais } = useFiliais();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function Logar(
    userName: string,
    password: string,
    filialUsuario: number
  ) {
    try {
      const response = await auth.authenticate(
        userName,
        password,
        filialUsuario
      );

      window.location.assign("/wms");
      //navigate("/wms");
    } catch (error: any) {
      if (error?.response?.status) {
        if (error.response.status === 400) {
          alert("Dados para login inválidos!");
        } else if (error.response.status === 401) {
          alert("Usuário não autorizado!");
        } else {
          alert("Aconteceu um erro ao afetuar o seu login!");
        }
      } else {
        alert("Aconteceu um erro ao afetuar o seu login!");
      }
    }
  }

  const handleChange = (event) => {
    setFilialUsuario(event.target.value);
  };

  return (
    <div className="containerLOGIN">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Bem-vindo(a)</span>

            <span className="login-form-title">
              <img src={logoImage} alt="Jovem Programador" />
            </span>

            <div className="wrap-input">
              <select
                value={filialUsuario}
                className={filialUsuario !== 0 ? "has-val input" : "input"}
                onChange={handleChange}
              >
                <option className="selectoptions" value={""}>
                  
                </option>
                {filiais.map((filial) => (
                  <option
                    className="selectoptions"
                    key={filial.codigoFilial}
                    value={filial.codigoFilial}
                  >
                    {filial.nomeFilial}
                  </option>
                ))}
              </select>

              <span className="focus-input" data-placeholder="Filial"></span>
            </div>

            <div className="wrap-input">
              <input
                className={userName !== "" ? "has-val input" : "input"}
                type="user"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Usuario"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button
                className="login-form-btn"
                onClick={(e) => Logar(userName, password, filialUsuario)}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
