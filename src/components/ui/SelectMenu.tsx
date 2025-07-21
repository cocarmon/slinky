import { type PropsWithChildren } from 'react';


interface SelectProps extends PropsWithChildren{
    name: string;
    width: string;
};

export const SelectWrapper = ({name, width, children}: SelectProps) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-zinc-500 ">
                {name}
            </label>
            <div className={`grid grid-cols-1 ${width}`}>
                {children}
            </div>
        </div>
    )
}
