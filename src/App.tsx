import { useState } from "react";
import Canvas from "./features/canvas/Canvas"
import Sidebar from "@/components/layout/Sidebar"
import { useMazeContext } from "./context/MazeContext";

function App() {
    const [resetKey, setResetKey] = useState(0);
    const { options,setOptions } = useMazeContext();


    const handleStartChange = () => {
      setOptions((prev)=> ({
          ...prev,
          start: !prev.start
      }));
    };

    const handleOnReset = () => {
      setResetKey(p => p + 1);
    };

  return (
    <div className="flex h-screen">
      <Sidebar handleOnStart={handleStartChange} handleOnReset={handleOnReset}/>
      <Canvas key={resetKey} size={Number(options.size)} start={options.start} resetStart={handleStartChange}/>
    </div>
  )
}

export default App
