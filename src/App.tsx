import "./App.css";

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks
import { useAuth } from "./hooks/useAuth.ts";

//Components
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { Footer } from "./components/Footer/Footer.tsx";

//Pages
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
