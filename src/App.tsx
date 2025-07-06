import Sidebar from "@/components/layout/Sidebar"
import Canvas from "./features/canvas/Canvas"

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <Canvas/>
    </div>
  )
}

export default App
