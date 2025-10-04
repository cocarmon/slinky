import { useCallback } from 'react'
import { algorithms } from '@/utils/algorithms'; 
import type { Maze } from '@/types';


interface Context {ctx: CanvasRenderingContext2D;};

interface WidthAndHeight {
    width: number;
    height: number;
}
interface Rectangle extends WidthAndHeight, Context{
    x: number;
    y: number;
};

type MazeDimensions = WidthAndHeight & Context;
type MazeParams = MazeDimensions & {speed:number,weight:number, signal: AbortSignal};

interface UseMazeAnimator {
    grid: Maze;
    size: number;
    algorithmName: string;
};

export const useMazeAnimator = ({grid, size, algorithmName}:UseMazeAnimator) =>{
    let maze = structuredClone(grid);

    const drawRect = ({x,y,ctx,width, height}:Rectangle)  => {
        const padding = 3;
        const cellWidth = width / size;
        const cellHeight = height / size;
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

    const drawShortestPath = useCallback(({ height, width, ctx}:MazeDimensions) => {
        // the maze is always a square
        let matrixNode = maze[maze.length - 1][maze.length - 1];

        ctx.fillStyle = '#ff6467';

        do {
            drawRect({x:matrixNode.x,y:matrixNode.y, height, width, ctx});
            if(!matrixNode.prev) break;
            const [x,y] = matrixNode.prev;
            matrixNode = maze[y][x];
        } while (matrixNode);

    },[maze]);


    const solveMaze = useCallback(async ({height, width,speed,weight, ctx,signal}:MazeParams) => {
        const currentSpeed = 5-speed;
        let numberOfSteps = 0;

        const onAbort = () => {
            ctx.clearRect(0, 0, width, height);
            // exit the solve immediately
            throw new DOMException("Aborted", "AbortError");
        };

        const startTime = performance.now();
        for (const [x, y] of algorithms[algorithmName as "A*" | "Depth-First Search" | "Breadth-First Search"](maze,weight)) {
                ctx.fillStyle = '#fafafa';
                if (signal?.aborted) onAbort();
                await new Promise(resolve => setTimeout(resolve, currentSpeed * 100));
                // resolves happens at the start of the frame, giving a smoother aniimation
                await new Promise(resolve => requestAnimationFrame(resolve));
                drawRect({ x, y, height, width, ctx });
            numberOfSteps+=1
        };
        const endTime = performance.now();

        drawShortestPath({ height, width, ctx});
        return {time: ((endTime-startTime)/1000).toFixed(2),steps:numberOfSteps}
    },[maze,algorithmName])

    return {solveMaze};
}
