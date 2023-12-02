import { api, requestConfig } from "../utils/config";

//Register an user
const register = async (data: any) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config);
    const jsonData = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(jsonData));
      return jsonData;
    } else if (res.status === 422 && jsonData.errors) {
      const validationErrors = jsonData.errors.map((error: string) => error);
      return { errors: validationErrors };
    } else {
      return {
        errors: [
          `Request Error: ${res.status} - ${jsonData.error || "Unknown error"}`,
        ],
      };
    }
  } catch (error) {
    console.log(error);
    return { errors: ["Error processing the request"] };
  }
};

//Logout an user
const logout = () => {
  localStorage.removeItem("user");
};

//Sign in an user
const login = async (data: any) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config);
    const jsonData = await res.json();

    if (res.ok) { //Atentar, pode ser preciso usar res._id
      localStorage.setItem("user", JSON.stringify(jsonData));
    } else {
      if (jsonData.errors && jsonData.errors.length > 0) {
        // Se houver mensagens de erro específicas do backend, use-as
        console.error("Erro durante o login:", jsonData.errors);
        // Aqui você pode tratar os erros e apresentar uma mensagem ao usuário
      } else {
        // Caso contrário, use uma mensagem genérica
        console.error("Erro durante o login:", "Erro desconhecido no servidor");
        // Aqui você pode tratar o erro e apresentar uma mensagem genérica ao usuário
      }
    }

    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
