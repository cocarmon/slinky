import type { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { Select,InputWrapper, MetricsOutput } from '@/components/ui/SelectMenu';

import type { MazeOptions } from '@/types';

interface SidebarProps {
    isOn: boolean;
    options:MazeOptions;
    mazeMetrics: {steps: number, time:string}
    handleOnStart: MouseEventHandler<HTMLButtonElement>;
    setOptions:Dispatch<SetStateAction<MazeOptions>>;
};

export default function Sidebar({handleOnStart,mazeMetrics,setOptions,options,isOn}:SidebarProps) {

    const handleOptions = (e:ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        let {name, value} = e.target;
        const key = name.toLowerCase() as keyof MazeOptions;
        const nextValue = key === 'weight'
                ? Number(value)
                : value;
        setOptions((prev) => ({
            ...prev,
            [key]: nextValue
        }))
    };


    return (
        <div className="w-64 flex flex-col  p-8 space-y-3">
            <h1 className="text-3xl text-green-500 font-bold">SLINKY</h1>

            <Select name='Algorithm' width='w-48' onChange={handleOptions}/>
            {options.algorithm === 'A*' && <InputWrapper name='Weight' width='w-48' onChange={handleOptions}/>}

            <div className=' flex justify-between items-end w-full'>
                <Select name='Size' width='w-18' onChange={handleOptions}/>
                <Select name='Speed' width='w-18' onChange={handleOptions}/>
            </div>
            <button onClick={handleOnStart}  className={`h-8 text-white font-semibold rounded-md cursor-pointer w-full ${
                isOn ? 'bg-red-500' : 'bg-green-500'}`}>
                {isOn ? 'Clear' : 'Start'}
            </button>
            <MetricsOutput name={"Time"} metric={mazeMetrics.time}/> 
            <MetricsOutput name={"Total Steps"} metric={mazeMetrics.steps}/> 
            
        </div>
    )
}
