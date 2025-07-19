import { useCallback, useMemo, useState } from "react";
import Canvas from "./features/canvas/Canvas"
import Sidebar from "@/components/layout/Sidebar"
import { useMazeContext } from "./context/MazeContext";
import { generateMaze } from "./utils/mazeGenerator";

function App() {
    const { options } = useMazeContext();
    const [resetKey, setResetKey] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const maze = useMemo(()=>generateMaze(options.size),[options.size]);

    const handleOnStart = useCallback(() => {
      setIsStart(p => !p);
    },[]);

    const handleOnReset = useCallback(() => {
      setResetKey(p => p + 1);
    }, []);


  return (
    <div className="flex h-screen">
      <Sidebar handleOnStart={handleOnStart} handleOnReset={handleOnReset}/>
      <Canvas key={resetKey} size={options.size} name={options.algorithm} grid={maze} start={isStart} resetStart={handleOnStart}/>
    </div>
  )
}

export default App
