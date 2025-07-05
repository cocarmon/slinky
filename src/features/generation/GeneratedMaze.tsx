import { generateMaze } from '@/utils/mazeGenerator';

const size = 20;

export default function GeneratedMaze() {
    const grid = generateMaze(size);
    return (
            <div
                className="grid w-full h-full border-b border-r border-zinc-500"
                style={{
                    gridTemplateColumns: `repeat(${size}, 1fr)`,
                    gridTemplateRows: `repeat(${size}, 1fr)`,
                }}
                >
                {grid.flat().map((_, i) => (
                    <div key={i} className="border-l border-t border-zinc-500"></div>
                ))}
            </div>
    )
}
