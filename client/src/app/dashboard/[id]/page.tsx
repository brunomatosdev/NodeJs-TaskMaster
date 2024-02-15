"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface User {
  username: string;
  // Outras informações do usuário
}

interface Task {
  title: string;
  description: string;
  // Outras propriedades da tarefa
}
const Dashboard: React.FC = () => {
  const router = useRouter();
  const { userId } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        if (userId) {
          // Verifica se userId está definido antes de fazer a solicitação
          const response = await axios.get(`/api/tasks/${userId}`);
          setTasks(response.data);
        }
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data); // Adicione este console.log para ver os dados do usuário
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserTasks();
      fetchUserData();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      {user && (
        <div className="user-info">
          <p>Logged In As: {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {/* Outras informações da tarefa */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
