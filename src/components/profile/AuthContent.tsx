import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  user: { username: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        { username, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser({
          username: response.data.username,
          email: response.data.email,
        });
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      const axiosError = error;
      throw new Error(axiosError.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    await axios.get("http://localhost:3000/api/logout", {
      withCredentials: true,
    });
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
