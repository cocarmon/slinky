import Sidebar from "@/components/layout/Sidebar"
import GeneratedMaze from "./features/generation/GeneratedMaze"

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <GeneratedMaze/>
    </div>
  )
}

export default App
