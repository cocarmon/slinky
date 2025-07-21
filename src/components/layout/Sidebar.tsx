import { SelectWrapper } from '@/components/ui/SelectMenu';
import { useMazeContext } from '@/context/MazeContext';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import type { ChangeEvent } from 'react';

const MAZE_OPTIONS = {
    SIZE: ['20' , '60' , '180' , '540'],
    ALGORITHM: ["Breadth-First Search", "Depth-First Search", "A*" ],
    ENGINE: ['JS'],
    SPEED: [1,2,3,4,5],
};

interface SidebarProps {
    handleOnStart: () =>void;
    mazeMetrics: {steps: number, time:number}
};

export default function Sidebar({handleOnStart,mazeMetrics}:SidebarProps) {
    const {options,setOptions} = useMazeContext();

    const handleOptions = (e:ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;
        let value: string | number = e.target.value;

        if (name == 'Size') {
            value = Number(value);
        };

        setOptions((prev) => ({
            ...prev,
            [name.toLowerCase()]:value
        }))
    };


    return (
        <div className="w-64 flex flex-col items-center p-8 space-y-3">
            <h1 className="text-3xl text-green-500 font-bold">SLINKY</h1>
            
            <SelectWrapper name='Engine' width='w-48'>
                <select
                    id={'Engine'}
                    name={'Engine'}
                    defaultValue={MAZE_OPTIONS.ENGINE[0]}
                    onChange={handleOptions}
                    className="col-start-1 bg-transparent row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-zinc-500 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 hover:bg-green-500 focus:outline-green-500 sm:text-sm/6 cursor-pointer"
                >
                    {MAZE_OPTIONS.ENGINE.map((cur) => <option className='bg-zinc-900 cursor-pointer outline-zinc-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' key={cur} value={cur}>{cur}</option>)}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
            </SelectWrapper>
            <SelectWrapper name='Algorithm' width='w-48'>
                <select
                    id={'Algorithm'}
                    name={'Algorithm'}
                    defaultValue={MAZE_OPTIONS.ALGORITHM[0]}
                    onChange={handleOptions}
                    className="col-start-1 bg-transparent row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-zinc-500 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 hover:bg-green-500 focus:outline-green-500 sm:text-sm/6 cursor-pointer"
                >
                    {MAZE_OPTIONS.ALGORITHM.map((cur) => <option className='bg-zinc-900 cursor-pointer outline-zinc-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' key={cur} value={cur}>{cur}</option>)}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
            </SelectWrapper>
            {options.algorithm == 'A*' &&
                <SelectWrapper name='Weight (1.0-2.0)' width='w-48'>
                    <input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="1.00"
                    min={1}
                    max={2}
                    step="0.05"
                    aria-describedby="h-weight"
                        className="col-start-1 bg-transparent row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-zinc-500 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 hover:bg-green-500 focus:outline-green-500 sm:text-sm/6 cursor-pointer"
                    />    
                </SelectWrapper>
            }
            <div className='flex justify-between items-end w-full'>
                <SelectWrapper name='Size' width='w-18'>
                    <select
                        id={'Size'}
                        name={'Size'}
                        defaultValue={MAZE_OPTIONS.SIZE[0]}
                        onChange={handleOptions}
                        className="col-start-1 bg-transparent row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-zinc-500 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 hover:bg-green-500 focus:outline-green-500 sm:text-sm/6 cursor-pointer"
                    >
                        {MAZE_OPTIONS.SIZE.map((cur) => <option className='bg-zinc-900 cursor-pointer outline-zinc-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' key={cur} value={cur}>{cur}</option>)}
                    </select>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                </SelectWrapper>
                <SelectWrapper name='Speed' width='w-18'>
                    <select
                        id={'Speed'}
                        name={'Speed'}
                        defaultValue={MAZE_OPTIONS.SPEED[2]}
                        onChange={handleOptions}
                        className="col-start-1 bg-transparent row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-zinc-500 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 hover:bg-green-500 focus:outline-green-500 sm:text-sm/6 cursor-pointer"
                    >
                        {MAZE_OPTIONS.SPEED.map((cur) => <option className='bg-zinc-900 cursor-pointer outline-zinc-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' key={cur} value={cur}>{cur}</option>)}
                    </select>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                </SelectWrapper>
            </div>
            <button onClick={handleOnStart} className="bg-green-500 h-8 text-white font-semibold rounded-md cursor-pointer w-full ">
                Start
            </button>
            <div className='text-zinc-500 outline-1 py-1.5 pl-2 -outline-offset-1 outline-gray-500 rounded-sm w-full flex '>
                <p className="text-base pr-2">Time: </p>
                <p>{mazeMetrics.time} sec.</p>
            </div>
            <div className='text-zinc-500 outline-1 py-1.5 pl-2 -outline-offset-1 outline-gray-500 rounded-sm w-full flex '>
                <p className="text-base pr-2">Total Steps: </p>
                <p>{mazeMetrics.steps}</p>
            </div>
        </div>
    )
}
