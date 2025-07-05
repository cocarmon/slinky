

export const generateMaze = (size:number) => {
    const grid = Array.from({length: size}, () => Array.from({length: size}, () =>{}));
    return grid
};