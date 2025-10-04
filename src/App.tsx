import { useMemo, useState } from "react";

import Canvas from "@/Canvas";
import Sidebar from "@/components/layout/Sidebar";
import { generateMaze } from "@/utils/mazeGenerator";

import type { MazeOptions } from "./types";

const defaultOptions: MazeOptions = {
  size: 20 ,
  algorithm: 'Breadth-First Search',
  speed:3,
  weight:1
};

function App() {
  const [isOn,setIsOn] = useState(false);
  const [mazeMetrics,setMazeMetrics] = useState({steps:0,time:'0'});
  const [options, setOptions] = useState<MazeOptions>(defaultOptions);

  // perserve maze during rerenders
  const maze = useMemo(()=>generateMaze(options.size),[options.size]);
  const handleStart = ()=>setIsOn(!isOn);

  return (
    <div className="flex h-screen">
      <Sidebar handleOnStart={handleStart} isOn={isOn} mazeMetrics={mazeMetrics} setOptions={setOptions} options={options}/>
      <Canvas grid={maze} isOn={isOn} options={options} setMazeMetrics={setMazeMetrics} setIsOn={setIsOn}/>
    </div>
  )
}

export default App;
