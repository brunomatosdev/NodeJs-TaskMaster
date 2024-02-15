// components/privateRoute.js
import { useRouter } from "next/router";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Se o token não estiver presente, redirecione para a página de login
    if (!token) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
