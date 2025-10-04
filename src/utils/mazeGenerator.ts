import type { Maze } from "@/types";

interface ChooseWallTypes {
    x: number;
    y: number;
    grid: Maze
}


export const generateMaze = (size:number) => {
    const grid = Array.from({length: size}, (_,y) => Array.from({length: size}, (_,x) =>({x:x, y:y, visited:false,seen:false, prev: null, walls: { top: true, right: true, bottom: true, left: true }})));
    const maze = iterativeDFS(grid);
    return maze;
};


// chooses only a valid next cell, if no other valid cells exists returns a boolean to backtrack
const chooseWall = ({x,y,grid}:ChooseWallTypes) => {
    let keepGoing = true;
    
    const offsets = {left:[-1,0], right:[1,0], up:[0,-1], down:[0,1]};
    const possibleDirections = {left:x > 0, right:x < grid.length - 1, up:y > 0, down:y < grid.length - 1};
    const validMoves = Object.keys(possibleDirections).filter((direction) => possibleDirections[direction as "left" | "right" | "up" | "down"]);

    let newX=0,newY=0,shouldBackTrack = false,randomMove=0;
    while(keepGoing) {
        randomMove = Math.floor(Math.random() * validMoves.length);
        const [dx,dy] = offsets[validMoves[randomMove as number] as "left" | "right" | "up" | "down"];
        newX = dx + x;
        newY = dy + y;

        
        if (!grid[newY][newX].visited) {
            keepGoing = false;
        } else{
            validMoves.splice(randomMove,1);
        };

        if (validMoves.length == 0) {
            shouldBackTrack = true;
            keepGoing = false;
        }
    };
    // including direction as a string makes it easier to know what walls to adjsut
    return {x:newX,y:newY, direction: validMoves[randomMove],shouldBackTrack};
};

// will rewrite at some point

// Start at 0,0
// Grab valid next cell
// remove walls
// if no valid options, backtrack
const iterativeDFS = (grid:Maze) => {
    const stack = [[0,0]];
    grid[0][0].visited = true;
    let currentY = 0;
    let currentX = 0;

    // if stack length is zero it means we are back at the start and everyone cell has been visited
    while (stack.length != 0) {
        const { x,y,direction,shouldBackTrack } = chooseWall({x:currentX,y:currentY,grid});
        // easy way to keep chooseWall parameters up to date
        currentX = x;
        currentY = y;

        if (!shouldBackTrack) {
            grid[y][x].visited = true;
            stack.push([x,y]);
            if (direction == 'left') {
                grid[y][x].walls.right = false;
                grid[y][x+1].walls.left = false;
            }
            if (direction == 'right') {
                grid[y][x].walls.left = false;
                grid[y][x-1].walls.right = false;
            }
            if (direction == 'up') {
                grid[y][x].walls.bottom = false;
                grid[y+1][x].walls.top = false;
            }
            if (direction == 'down') {
                grid[y][x].walls.top = false;
                grid[y-1][x].walls.bottom = false;
            }
        } else {
            const popped = stack.pop();
            if (popped) {
                const [oldX, oldY] = popped;
                currentX = oldX;
                currentY = oldY;
            }
        };
    }
    return grid;
};