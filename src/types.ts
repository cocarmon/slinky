export type Node = {
    x: number;
    y: number;
    visited: boolean;
    seen: boolean;
    prev: null | number[];
    walls: {
        top: boolean;
        right: boolean;
        bottom: boolean;
        left: boolean;
    };
};

export type Maze = Node[][]

export interface MazeOptions {
    size: 20 | 60 | 180 | 540;
    algorithm: "A*" | "Depth-First Search" | "Breadth-First Search";
    speed: 1 | 2 | 3 | 4 | 5;
    weight:1;
};