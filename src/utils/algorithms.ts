import type { Maze } from "@/types";

export function* bfsAlgorithm(maze:Maze) {
        const queue = [[0,0]];

        while (queue.length > 0) {
            const [x,y] = queue.shift();

            if (!maze[y][x].seen) {
                maze[y][x].seen = true;
                yield [x,y];
                // cells can be reached from multiple paths, make sure you're not overwriting an already set prev node 
                if(!maze[y][x].walls.left && !maze[y][x-1].seen){
                    maze[y][x-1].prev = [x,y];
                    queue.push([x-1,y]);
                }

                if(!maze[y][x].walls.right && !maze[y][x+1].seen){
                    maze[y][x+1].prev =  [x,y];
                    queue.push([x+1,y]);
                }

                if(!maze[y][x].walls.top && !maze[y-1][x].seen){
                    maze[y-1][x].prev =  [x,y];
                    queue.push([x,y-1]);
                }

                if(!maze[y][x].walls.bottom && !maze[y+1][x].seen){
                    maze[y+1][x].prev =  [x,y];
                    queue.push([x,y+1]);
                }
            }
            // found the maze exit
            if (x === maze[0].length - 1 && y === maze.length - 1) {
                break;
            }
        };

    };