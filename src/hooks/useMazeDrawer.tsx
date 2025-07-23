import type { Maze } from '@/types';
import { useCallback } from 'react'

interface Context {ctx: CanvasRenderingContext2D;};

interface WidthAndHeight {
    width: number;
    height: number;
}

type MazeDimensions = WidthAndHeight & Context;

interface useMazeDrawer {
    maze: Maze;
    size: number;
};

const useMazeDrawer = ({ maze, size}:useMazeDrawer) => {
    const drawUnsolvedMaze = useCallback(({width, height, ctx }: MazeDimensions) => {
        const cellWidth = width / size;
        const cellHeight = height / size;
        ctx.clearRect(0,0,width, height);

        // Wall width
        ctx.lineWidth = 1;
        // wall color
        ctx.strokeStyle = '#22c55e';

        // starting cell
        ctx.fillStyle = "#008236";
        ctx.fillRect(0, 0, cellWidth, cellHeight);

        // end cell
        ctx.fillStyle = '#82181a';
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
    return {drawUnsolvedMaze}
}

export default useMazeDrawer