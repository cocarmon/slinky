import type { Maze } from "@/types";

interface NextRectangleLogic { 
    maze: Maze;
    y: number;
    x:number;
    ds: number[][];
};

interface Heap {
    cord: number[],
    g: number;
    h:number;
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
// distance as the crow flies
const manhattanDistance = (size:number,x1:number,y1:number) => {
    return  Math.abs(size-x1) + Math.abs(size-y1)
};
// used when the root node is removed 
const heapifyDown = (heap:Heap[],weight:number) => {
    const rootNode = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    if (heap.length == 0) return rootNode;
    // used to determine the current index of the current node
    let counter = 0;
    while(true) {
        // refactor this at some point
        let left = {g: Infinity,h:Infinity};
        let right = {g: Infinity,h:Infinity};
        if(heap[2*counter + 1] != undefined) {
            left = heap[2*counter + 1];
        }
        if(heap[2*counter + 2] != undefined) {
            right = heap[2*counter + 2];
        }

        if(left.g == Infinity && right.g == Infinity) break;
        // chooses the child node with the lowest cost
        let nextNodeIndex = left.g + left.h*weight > right.g + right.h*weight ? 2*counter + 2 : 2*counter + 1;
        // if child nodes cost are equal choose the one with the lower h value
        if (left.g + left.h === right.g + right.h) {
            if (left.h < right.h) {
                nextNodeIndex = 2*counter + 1
            } else {
                nextNodeIndex = 2*counter + 2
            }
        }
        // node has found it's place in the heap
        if ((heap[counter].g + heap[counter].h) < (heap[nextNodeIndex].g + heap[nextNodeIndex].h)) break;
        [heap[counter], heap[nextNodeIndex]] = [heap[nextNodeIndex], heap[counter]];
        counter = nextNodeIndex;
    }
    return rootNode;
};
// used whenever a node is added to the heap to find its correct position
const heapifyUp = (heap:Heap[],weight:number) => {
    let counter = heap.length - 1;
    while(true) {
        const parentIndex = Math.floor((counter - 1)/2);
        if (parentIndex < 0) break;
        if ((heap[parentIndex].g +heap[parentIndex].h*weight)  < (heap[counter].g+heap[counter].h*weight)) break;
        [heap[counter], heap[parentIndex]] = [heap[parentIndex],heap[counter]];

        counter = parentIndex;
    }
};

// f = g + wh
function* aStarAlgorithm(maze:Maze, weight:number) {
    const size = maze.length - 1;
    // here g is distance between the current node and the start
    const heap = [{cord:[0,0], h:manhattanDistance(size,0,0)*weight,g:0}];
    while (heap.length > 0) {
        // cord = [x,y]
        const {cord,g} = heapifyDown(heap,weight);
        if (!maze[cord[1]][cord[0]].seen) {
            maze[cord[1]][cord[0]].seen = true
            if (cord[0] ==size && cord[1] == size) {
                break;
            };
        if(!maze[cord[1]][cord[0]].walls.left && !maze[cord[1]][cord[0]-1].seen){
            heap.push({cord:[cord[0]-1,cord[1]], h: manhattanDistance(size,cord[0]-1,cord[1])*weight,g:g+1});
            heapifyUp(heap,weight)
            maze[cord[1]][cord[0]-1].prev = [cord[0],cord[1]];
        }

        if(!maze[cord[1]][cord[0]].walls.right && !maze[cord[1]][cord[0]+1].seen){
            heap.push({cord:[cord[0]+1,cord[1]], h: manhattanDistance(size,cord[0]+1,cord[1])*weight,g:g+1});
            heapifyUp(heap,weight)
            maze[cord[1]][cord[0]+1].prev = [cord[0],cord[1]];
        }

        if(!maze[cord[1]][cord[0]].walls.top && !maze[cord[1]-1][cord[0]].seen){
            heap.push({cord:[cord[0],cord[1]-1], h: manhattanDistance(size,cord[0],cord[1]-1)*weight,g:g+1});
            heapifyUp(heap,weight)
            maze[cord[1]-1][cord[0]].prev = [cord[0],cord[1]];
        }

        if(!maze[cord[1]][cord[0]].walls.bottom && !maze[cord[1]+1][cord[0]].seen){
            heap.push({cord:[cord[0],cord[1]+1], h: manhattanDistance(size,cord[0],cord[1]+1)*weight,g:g+1});
            heapifyUp(heap,weight)
            maze[cord[1]+1][cord[0]].prev = [cord[0],cord[1]];
        }
            yield [cord[0],cord[1]];
        }
        // found the maze exit
        if (cord[0] === maze[0].length - 1 && cord[1] === maze.length - 1) {
            break;
        }
    };

};

export const algorithms = {
    "Breadth-First Search": bfsAlgorithm,
    "Depth-First Search": dfsAlgorithm,
    "A*": aStarAlgorithm,
};