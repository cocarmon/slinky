import { Select, SelectMenu } from '@/components/ui/SelectMenu';

export default function Sidebar() {
    return (
        <div className="w-64 flex flex-col items-center p-8 space-y-2">
            <h1 className="text-3xl text-green-500 font-bold">SLINKY</h1>
            <Select name='Engine' width='w-48'>
                <SelectMenu id='Engine' defaultValue='WASM' options={['JS','WASM']}/>
            </Select>
            <Select name='Algorithm' width='w-48'>
                <SelectMenu id='Algorithm' defaultValue='JS' options={['A*','Dijkstra','Breadth-First Search']}/>
            </Select>
            <div className='flex justify-between items-end w-full'>
                <Select name='Maze Size' width='w-24'>
                    <SelectMenu id='Maze Width' defaultValue='JS' options={['20x20','40x40','60x60']}/>
                </Select>
                <button className="bg-green-500 h-8 w-16  text-white font-semibold rounded-md cursor-pointer">
                    Start
                </button>
            </div>
        </div>
    )
}
