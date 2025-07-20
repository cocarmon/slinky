import { useCallback, useEffect, useMemo, useState } from "react";
import Canvas from "@/features/canvas/Canvas";
import Sidebar from "@/components/layout/Sidebar";
import { useMazeContext } from "@/context/MazeContext";
import { generateMaze } from "@/utils/mazeGenerator";

function App() {
    const { options } = useMazeContext();
    // used as a hard reset, unmount and remounts canvas
    const [resetKey, setResetKey] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const maze = useMemo(()=>generateMaze(options.size),[options.size]);

    const handleOnStart = useCallback(() => {
      setIsStart(p => !p);
      if (!isStart) setResetKey(p => p + 1);
    },[isStart]);

  return (
    <div className="flex h-screen">
      <Sidebar handleOnStart={handleOnStart} />
      <Canvas key={resetKey} size={options.size} name={options.algorithm} grid={maze} start={isStart} setStartToFalse={()=>setIsStart(false)}/>
    </div>
  )
}

export default App
