import { useMazeContext } from '@/context/MazeContext';
import { generateMaze } from '@/utils/mazeGenerator';

export default function GeneratedMaze() {
    const {options} = useMazeContext();
    const grid = generateMaze(Number(options.size));
    return (
            <div
                className="grid w-full h-full border-b border-r border-zinc-500"
                style={{
                    gridTemplateColumns: `repeat(${options.size}, 1fr)`,
                    gridTemplateRows: `repeat(${options.size}, 1fr)`,
                }}
                >
                {grid.flat().map((cell, i) => (
                    <div key={i} className={`${
                        cell.walls.top ? 'border-t border-zinc-500' : ''
                      } ${
                        cell.walls.left ? 'border-l border-zinc-500' : ''
                      }`}
                      ></div>
                ))}
            </div>
    )
}
