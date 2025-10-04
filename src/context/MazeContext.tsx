import { createContext, useContext, useState } from "react";


interface MazeOptions {
  size: 20 | 60 | 180 | 540;
  algorithm: "A*" | "Depth-First Search" | "Breadth-First Search";
  speed: 1 | 2 | 3 | 4 | 5;
  weight:1;
}

interface MazeContextType {
  options: MazeOptions;
  setOptions:React.Dispatch<React.SetStateAction<MazeOptions>>;
}

const defaultOptions: MazeOptions = {
  size: 20,
  algorithm: 'Breadth-First Search',
  speed:3,
  weight:1
};

const MazeContext = createContext<MazeContextType | null>(null);

export const useMazeContext = () => {
  const maze = useContext(MazeContext);
  if (!maze) throw Error('ctx not defined.');
  return maze;
};

export const MazeProvider = ({ children }: { children: React.ReactNode }) => {
  const [options, setOptions] = useState<MazeOptions>(defaultOptions);
  return (
    <MazeContext.Provider value={{ options, setOptions }}>
      {children}
    </MazeContext.Provider>
  );
};
