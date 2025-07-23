import { useCallback, useMemo, useState } from "react";
import Canvas from "@/features/canvas/Canvas";
import Sidebar from "@/components/layout/Sidebar";
import { useMazeContext } from "@/context/MazeContext";
import { generateMaze } from "@/utils/mazeGenerator";

function App() {
    const { options } = useMazeContext();
    const [mazeMetrics,setMazeMetrics] = useState({steps:0,time:'0'});
    
    // used as a hard reset, unmount and remounts canvas
    const [resetKey, setResetKey] = useState(0);
    const [mazeSolverState, setMazeSolverState] = useState< 'idle' | 'running' | 'done'>('idle');
    const maze = useMemo(()=>generateMaze(options.size),[options.size]);

    const handleOnStart = useCallback(() => {
      setMazeSolverState((p) => {
        if (p == 'done' || p == 'running') setResetKey(p => p + 1);
        return 'running'
      });
    },[mazeSolverState]);

  return (
    <div className="flex h-screen">
      <Sidebar handleOnStart={handleOnStart} mazeMetrics={mazeMetrics}/>
      <Canvas key={resetKey} grid={maze} mazeSolverState={mazeSolverState} setMazeMetrics={setMazeMetrics} updateSolverToDone={()=>setMazeSolverState('done')}/>
    </div>
  )
}

export default App
