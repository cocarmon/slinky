import { ChevronDownIcon } from '@heroicons/react/16/solid';
import type { ChangeEventHandler } from 'react';


interface OptionProps {
    name: string;
    width: string;
    onChange: ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
};

interface MetricsOutputProps {
    name: string;
    metric: string | number;
}

const MAZE_OPTIONS = {
    SIZE: ['20' , '60' , '180' , '540'],
    ALGORITHM: ["Breadth-First Search", "Depth-First Search", "A*" ],
    SPEED: [1,2,3,4,5],
};

const KEY_MAP = {
    Algorithm: "ALGORITHM",
    Size: "SIZE",
    Speed: "SPEED",
};


export const Select = ({name, width,onChange}:OptionProps) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-zinc-500 ">
                {name}
            </label>
            <div className={`grid grid-cols-1 ${width}`}>
                <select
                    id={name}
                    name={name}
                    onChange={onChange}
                    className="col-start-1 bg-transparent row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-zinc-500 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 hover:bg-green-500 focus:outline-green-500 sm:text-sm/6 cursor-pointer"
                >
                    {MAZE_OPTIONS[KEY_MAP[name as keyof typeof KEY_MAP] as keyof typeof MAZE_OPTIONS].map((cur) => <option key={cur} value={cur} className='bg-zinc-900 cursor-pointer outline-zinc-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' >{cur}</option>)}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
            </div>
        </div>
    )
};

export const InputWrapper = ({name, width, onChange}:OptionProps) => {
    return (
        <>
            <label htmlFor={name} className="block text-sm/6 font-medium text-zinc-500 ">
                {name}
            </label>
            <div className={`grid grid-cols-1 ${width}`}>
                <input
                    id={name}
                    name={name}
                    type="number"
                    placeholder="1.00"
                    onChange={onChange}
                    defaultValue={1}
                    min={0}
                    required
                    step="0.05"
                    aria-describedby="h-weight"
                    className="col-start-1 bg-transparent row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-zinc-500 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 hover:bg-green-500 focus:outline-green-500 sm:text-sm/6 cursor-pointer"
                />    
            </div>
        </>
    )
};

export const MetricsOutput = ({name, metric}:MetricsOutputProps) => {
    return <>
        <div className='text-zinc-500 outline-1 py-1.5 pl-2 -outline-offset-1 outline-gray-500 rounded-sm w-full flex '>
            <p className="text-base pr-2">{name}: </p>
            <p>{metric}</p>
        </div>
    </>
}