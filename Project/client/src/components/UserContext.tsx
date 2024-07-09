import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of the user data
interface User {
  id: number;
  username: string;
  emailOrPhone: string;
  loginstatus: boolean;
}

// Define the shape of the context value
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  users: User[];
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Provider for the context
export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  // Fetch users from the backend (useEffect to load users when component mounts)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const usersData: User[] = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user login
  const login = (userData: User) => {
    setUser(userData);
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      if (user) {
        await fetch(`http://localhost:5000/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ loginstatus: false }), // Update loginstatus to false
        });
      }
      setUser(null);
      navigate('/login'); // Clear user context
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isLoggedIn = !!user;

  // Return the provider with the context value
  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn, users }}>
      {children}
    </UserContext.Provider>
  );
};
