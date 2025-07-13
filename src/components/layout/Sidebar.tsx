import { Select, SelectMenu } from '@/components/ui/SelectMenu';

const MAZE_OPTIONS = {
    SIZE: ['20' , '40' , '60' , '150'],
    ALGORITHM: ["A*" , "Dijkstra" , "Breadth-First Search"],
    ENGINE: ['JS' , 'WASM'],
};

interface SidebarProps {
    handleOnStart: () =>void;
    handleOnReset: () =>void;
};

export default function Sidebar({handleOnStart,handleOnReset}:SidebarProps) {

    return (
        <div className="w-64 flex flex-col items-center p-8 space-y-2">
            <h1 className="text-3xl text-green-500 font-bold">SLINKY</h1>
            <Select name='Engine' width='w-48'>
                <SelectMenu id='Engine' values={MAZE_OPTIONS.ENGINE}/>
            </Select>
            <Select name='Algorithm' width='w-48'>
                <SelectMenu id='Algorithm'  values={MAZE_OPTIONS.ALGORITHM}/>
            </Select>
            <div className='flex justify-between items-end w-full'>
                <Select name='Maze' width='w-24'>
                    <SelectMenu id='Size' values={MAZE_OPTIONS.SIZE}/>
                </Select>
                <button onClick={handleOnStart} className="bg-green-500 h-8 w-16  text-white font-semibold rounded-md cursor-pointer">
                    Start
                </button>

            </div>
            <button onClick={handleOnReset} className="bg-green-500 h-8 w-16  text-white font-semibold rounded-md cursor-pointer">
                    Reset
            </button>
        </div>
    )
}
