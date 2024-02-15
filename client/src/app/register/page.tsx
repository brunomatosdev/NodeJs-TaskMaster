"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleRegister = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register", // Altere a URL conforme necessário
        formData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      router.push("/dashboard"); // Redireciona para a página do Dashboard após o registro
    } catch (error) {
      setError("Erro ao fazer registro. Verifique suas informações.");
      console.error("Error registering:", error);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
          };
          await handleRegister(formData);
        }}
      >
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
