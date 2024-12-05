"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of user data
interface User {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userToken: string | null;
  userRole: string | null;
  createdAt?: string | null;
  profilePictureUrl?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  description?: string | null;
  university?: string | null;
  speciality?: string | null;
}

// Define the context and updater types
interface UserContextType {
  userContext: User;
  setUserContext: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void; // New logout function
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Step 1: Retrieve user data from localStorage or use default
  const storedUserContext = JSON.parse(
    localStorage.getItem("userContext") || "{}"
  );

  const initialState: User = {
    userId: storedUserContext.userId || null,
    userName: storedUserContext.userName || null,
    userEmail: storedUserContext.userEmail || null,
    userToken: storedUserContext.userToken || null,
    userRole: storedUserContext.userRole || null,
    createdAt: storedUserContext.createdAt || null,
    profilePictureUrl: storedUserContext.profilePictureUrl || null,
    city: storedUserContext.city || null,
    state: storedUserContext.state || null,
    country: storedUserContext.country || null,
    description: storedUserContext.description || null,
    university: storedUserContext.university || null,
    speciality: storedUserContext.speciality || null,
  };

  const [userContext, setUserContext] = useState<User>(initialState);

  // Step 2: Keep localStorage in sync with userContext
  useEffect(() => {
    localStorage.setItem("userContext", JSON.stringify(userContext));
  }, [userContext]);

  // Step 3: Logout function to clear user context and localStorage
  const logout = () => {
    setUserContext({
      userId: null,
      userName: null,
      userEmail: null,
      userToken: null,
      userRole: null,
      createdAt: null,
      profilePictureUrl: null,
      city: null,
      state: null,
      country: null,
      description: null,
      university: null,
      speciality: null,
    });
    localStorage.removeItem("userContext");
  };

  return (
    <UserContext.Provider value={{ userContext, setUserContext, logout }}>
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
