"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const Home: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login", // Altere a URL conforme necessário
        formData
      );

      const { token, userId } = response.data;
      if (userId) {
        localStorage.setItem("token", token);
        // Redireciona para a página do Dashboard com o userId interpolado na URL
        router.push(`/dashboard/${userId}`);
      } else {
        setError("Erro ao fazer login. UserId não foi recebido.");
      }
    } catch (error) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      console.error("Error logging in:", error);
    }
  };

  const handleSignup = () => {
    router.push("/register"); // Redireciona para a página de registro
  };

  return (
    <div>
      <h1>Task Master</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
          };
          await handleLogin(formData);
        }}
      >
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Não possui uma conta?{" "}
        <button onClick={handleSignup}>Registre-se aqui</button>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
