import { createContext, useContext, useState } from "react";


export type MazeOptionKey = 'engine' | 'size' | 'algorithm';

export interface MazeOptions {
  engine: 'JS' | 'WASM';
  size: '20' | '40' | '60' | '100';
  algorithm: "A*" | "Dijkstra" | "Breadth-First Search";
}

interface MazeContextType {
  options: MazeOptions;
  setOptions:React.Dispatch<React.SetStateAction<MazeOptions>>;
}

const defaultOptions: MazeOptions = {
  engine: 'JS',
  size: '20',
  algorithm: 'A*',
};

// eslint-disable-next-line react-refresh/only-export-components
export const MazeContext = createContext<MazeContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
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
