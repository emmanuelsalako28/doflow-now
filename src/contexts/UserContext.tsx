import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
}

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "member" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "member" },
];

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users: mockUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
