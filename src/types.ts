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