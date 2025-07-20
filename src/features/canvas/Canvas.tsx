import { useCallback, useEffect, useMemo, useRef } from 'react';
import { algorithms } from '@/utils/algorithms'; 
import cloneDeep from "lodash.clonedeep";
import type { Maze } from '@/types';

interface CanvasProps {
    size: number;
    start:boolean;
    name: string;
    grid: Maze;
    resetStart: () => void
};

interface Rectangle {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
};


export default function Canvas({size,grid, name, start,resetStart}:CanvasProps) {
    const maze = useMemo(()=>cloneDeep(grid),[grid]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null); // occupies the avaible screen space so we can calculate the canvas's space for responsiveness
    
    const drawRect = ({x,y,ctx}:Rectangle)  => {
        const padding = 3;
        const cellWidth = canvasRef.current!.width / size;
        const cellHeight = canvasRef.current!.height / size;
        const leftPad = maze[y][x].walls.left ? padding : 0;
        const rightPad = maze[y][x].walls.right ? padding : 0;
        const topPad = maze[y][x].walls.top ? padding : 0;
        const bottomPad = maze[y][x].walls.bottom ? padding : 0;
    
        ctx.fillRect(
            x * cellWidth + leftPad,
            y * cellHeight + topPad,
            cellWidth - leftPad - rightPad,
            cellHeight - topPad - bottomPad
        );

    };

    const drawShortestPath = useCallback((ctx:CanvasRenderingContext2D) => {
        // the maze is always a square
        let matrixNode = maze[maze.length - 1][maze.length - 1];
        ctx.fillStyle = '#dc2626';

        do {
            drawRect({x:matrixNode.x,y:matrixNode.y,ctx});
            if(!matrixNode.prev) break;
            const [x,y] = matrixNode.prev;
            matrixNode = maze[y][x];
        } while (matrixNode);

    },[maze])

    const drawMaze = useCallback((ctx:CanvasRenderingContext2D ) => {
        const cellWidth = canvasRef.current!.width / size;
        const cellHeight = canvasRef.current!.height / size;
        ctx.clearRect(0,0,canvasRef.current!.width,canvasRef.current!.height);

        // wall color
        ctx.strokeStyle = '#22c55e';

        // starting cell
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(0, 0, cellWidth, cellHeight);

        // end cell
        ctx.fillStyle = '#ef4444';
        ctx.fillRect((maze[0].length - 1) * cellWidth, (maze.length-1) * cellHeight, cellWidth, cellHeight);

        ctx.beginPath();

        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[row].length; col++) {

                const xStart = col* cellWidth;
                const xEnd = (col * cellWidth) + cellWidth;

                const yStart = row * cellHeight;
                const yEnd = (row * cellHeight) + cellHeight;

                ctx.moveTo(xStart,yStart);
                if (maze[row][col].walls.left) {
                    ctx.lineTo(xStart,yEnd);
                }
                if (maze[row][col].walls.top) {
                    ctx.moveTo(xStart,yStart);
                    ctx.lineTo(xEnd,yStart);
                }
                // we only draw the left and top wall of each cell 
                
                // add right boudnary to last column
                if(col == maze[row].length - 1) {
                    ctx.moveTo(xEnd,yStart);
                    ctx.lineTo(xEnd,yEnd);
                }
                // add bottom boundary to last row
                if(row == maze.length - 1) {
                    ctx.moveTo(xStart,yEnd);
                    ctx.lineTo(xEnd,yEnd);
                }
                
            };
        };
        ctx.stroke();
    },[maze,size]);

    const handleOnStart = useCallback(async (ctx:CanvasRenderingContext2D) => {
        let counter = 0;
        const start = performance.now();
        for (const [x, y] of algorithms[name](maze)) {
            ctx.fillStyle = '#f87171';
            drawRect({ x, y, ctx });
            // returns once the rectangle has been drawn on screen
            await new Promise(requestAnimationFrame);
            counter++;
        };
        const end = performance.now();

        alert(`Number of steps: ${counter}, time:${((end-start)/1000).toFixed(2)} sec`)
        drawShortestPath(ctx);
    },[maze,name])

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const { width, height } = container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        drawMaze(ctx);
    },[grid,drawMaze]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || !start) return;
        const ctx = canvas.getContext('2d')!;
        handleOnStart(ctx);
        resetStart();
    },[start]);

    return (
        <div ref={containerRef} className="h-full w-full ">
            <canvas ref={canvasRef} />
        </div>

    )
}
