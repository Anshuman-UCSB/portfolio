import { createContext, ReactNode, useContext, useState } from "react";

interface SelectedContextProps {
  selected: string;
  setSelected: (name: string) => void;
}

const SelectedContext = createContext<SelectedContextProps | undefined>(
  undefined
);

export const SelectedProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState("ABOUT");
  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("useSelected must be used within a SelectedProvider");
  }
  return context;
};
