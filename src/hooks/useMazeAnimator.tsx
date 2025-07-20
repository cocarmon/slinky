import { useCallback, useState } from 'react'
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

interface UseMazeAnimator {
    maze: Maze;
    size: number;
    algorithmName: string;
};

export const useMazeAnimator = ({maze, size, algorithmName}:UseMazeAnimator) =>{
    const [numberOfSteps,setNumberOfSteps] = useState(0);
    
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

        ctx.fillStyle = '#dc2626';

        do {
            drawRect({x:matrixNode.x,y:matrixNode.y, height, width, ctx});
            if(!matrixNode.prev) break;
            const [x,y] = matrixNode.prev;
            matrixNode = maze[y][x];
        } while (matrixNode);

    },[maze]);


    const solveMaze = useCallback(async ({height, width, ctx}:MazeDimensions) => {
        for (const [x, y] of algorithms[algorithmName](maze)) {
            ctx.fillStyle = '#f87171';
            drawRect({ x, y, height, width, ctx });
            // returns once the rectangle has been drawn on screen
            await new Promise(requestAnimationFrame);
            setNumberOfSteps(p=>p++);
        };
        // alert(`Number of steps: ${counter}, time:${((end-start)/1000).toFixed(2)} sec`)
        drawShortestPath({ height, width, ctx});
    },[maze,algorithmName])

    return {solveMaze, numberOfSteps};
}
