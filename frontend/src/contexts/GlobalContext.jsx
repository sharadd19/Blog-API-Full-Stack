import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (state) => setLoading(state);

  return (
    <GlobalContext.Provider value={{ loading, setLoadingState }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
