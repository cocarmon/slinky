import { useEffect, useMemo, useRef } from 'react';

import cloneDeep from "lodash.clonedeep";
import type { Maze } from '@/types';
import { useCanvas } from '@/hooks/useCanvas';
import { useMazeAnimator } from '@/hooks/useMazeAnimator';
import useMazeDrawer from '@/hooks/useMazeDrawer';

interface CanvasProps {
    size: number;
    name: string;
    grid: Maze;
    start:boolean;
    setStartToFalse: () => void;
};

export default function Canvas({size,grid,start, name, setStartToFalse}:CanvasProps) {
    const maze = useMemo(()=>cloneDeep(grid),[grid]);

    // occupies the avaible screen space so we can calculate the canvas's space for responsiveness
    const containerRef = useRef<HTMLDivElement | null>(null); 
    const canvasRef = useCanvas(containerRef);
    
    const { drawUnsolvedMaze } = useMazeDrawer({maze,size});
    const { solveMaze, numberOfSteps } = useMazeAnimator({maze, size, algorithmName: name});

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')!;
        drawUnsolvedMaze({width: canvasRef.current.width, height: canvasRef.current.height, ctx});
    },[grid,canvasRef,drawUnsolvedMaze]);

    useEffect(() => {
        if (!canvasRef.current || !start) return;
        const ctx = canvasRef.current.getContext('2d')!;
        solveMaze({width: canvasRef.current.width, height: canvasRef.current.height, ctx});
        setStartToFalse();
    },[start,canvasRef,solveMaze, setStartToFalse]);

    return (
        <div ref={containerRef} className="h-full w-full ">
            <canvas ref={canvasRef} />
        </div>

    )
}
