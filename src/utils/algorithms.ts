import type { Maze } from "@/types";

interface NextRectangleLogic { 
    maze: Maze;
    y: number;
    x:number;
    ds: number[][];
};

// cells can be reached from multiple paths, make sure you're not overwriting an already set prev node 
const nextRectangleLogic = ({maze,y,x,ds}:NextRectangleLogic) => {
        if(!maze[y][x].walls.left && !maze[y][x-1].seen){
            maze[y][x-1].prev = [x,y];
            ds.push([x-1,y]);
        }

        if(!maze[y][x].walls.right && !maze[y][x+1].seen){
            maze[y][x+1].prev =  [x,y];
            ds.push([x+1,y]);
        }

        if(!maze[y][x].walls.top && !maze[y-1][x].seen){
            maze[y-1][x].prev =  [x,y];
            ds.push([x,y-1]);
        }

        if(!maze[y][x].walls.bottom && !maze[y+1][x].seen){
            maze[y+1][x].prev =  [x,y];
            ds.push([x,y+1]);
        }
};

function* bfsAlgorithm(maze:Maze) {
        const queue = [[0,0]];

        while (queue.length > 0) {
            const [x,y] = queue.shift()!;

            if (!maze[y][x].seen) {
                maze[y][x].seen = true;
                yield [x,y];
                nextRectangleLogic({maze,y,x,ds:queue});
            }
            // found the maze exit
            if (x === maze[0].length - 1 && y === maze.length - 1) {
                break;
            }
        };

    };

function* dfsAlgorithm(maze:Maze) {
        const stack = [[0,0]];

        while (stack.length > 0) {
            const [x,y] = stack.pop()!;

            if (!maze[y][x].seen) {
                maze[y][x].seen = true;
                yield [x,y];
                nextRectangleLogic({maze,y,x,ds:stack});
            }
            // found the maze exit
            if (x === maze[0].length - 1 && y === maze.length - 1) {
                break;
            }
        };

    };


export const algorithms = {
    "Breadth-First Search": bfsAlgorithm,
    "Depth-First Search": dfsAlgorithm,
    "A*": () =>{},
};