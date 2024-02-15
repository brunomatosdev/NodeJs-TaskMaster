// pages/profile/[userId].tsx

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  // Adicione outras propriedades do usuário, se houver
}

const Profile: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (typeof userId === "string") {
          const response = await axios.get(`/api/users/${userId}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Outras informações do usuário */}
    </div>
  );
};

export default Profile;
