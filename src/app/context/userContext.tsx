"use client";
import React, { createContext, useContext, useState } from "react";

// Define the shape of user data
interface User {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userToken: string | null;
}

// Define the context and updater types
interface UserContextType {
  userContext: User;
  setUserContext: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userContext, setUserContext] = useState<User>({
    userId: null,
    userName: null,
    userEmail: null,
    userToken: null,
  });

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
