import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { type ChangeEvent, type PropsWithChildren } from 'react';
import { useMazeContext, type MazeOptionKey } from '@/context/MazeContext';


interface SelectProps extends PropsWithChildren{
    name: string;
    width: string;
};

interface MenuProps {
    id:string;
    values: string[];
};

export const SelectMenu = ({values, id}:MenuProps) => {
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

    return <>
        <select
            id={id}
            name={id}
            defaultValue={options[id.toLowerCase() as MazeOptionKey]}
            onChange={handleOptions}
            className="col-start-1 bg-transparent row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3 text-base text-zinc-500 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 hover:bg-green-500 focus:outline-green-500 sm:text-sm/6 cursor-pointer"
        >
            {values.map((cur) => <option className='bg-zinc-900 outline-zinc-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' key={cur} value={cur}>{cur}</option>)}
        </select>
        <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
    </>
};

export const Select = ({name, width, children}: SelectProps) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-zinc-500 ">
                {name}
            </label>
            <div className={`mt-1 grid grid-cols-1 ${width}`}>
                {children}
            </div>
        </div>
    )
}
