"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";

// 1. Create context
const ClerkUserContext = createContext<UserResource | null>(null);

// 2. Create provider component
export const ClerkUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [storedUser, setStoredUser] = useState<UserResource | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      setStoredUser(user);
    }
  }, [isLoaded, user]);

  return <ClerkUserContext.Provider value={storedUser}>{children}</ClerkUserContext.Provider>;
};

// 3. Create easy hook
export const useClerkUser = () => useContext(ClerkUserContext);
