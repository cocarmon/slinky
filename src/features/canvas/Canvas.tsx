import { useEffect, useMemo, useRef } from 'react';

import cloneDeep from "lodash.clonedeep";
import type { Maze } from '@/types';
import { useCanvas } from '@/hooks/useCanvas';
import { useMazeAnimator } from '@/hooks/useMazeAnimator';
import useMazeDrawer from '@/hooks/useMazeDrawer';
import { useMazeContext } from '@/context/MazeContext';

interface CanvasProps {
    grid: Maze;
    mazeSolverState: "idle" | "running" | "done";
    updateSolverToDone: () => void;
    setMazeMetrics: (x:{time:string,steps:number}) => void;
};

export default function Canvas({grid,mazeSolverState,setMazeMetrics, updateSolverToDone}:CanvasProps) {
    const {options} = useMazeContext();
    const maze = useMemo(()=>cloneDeep(grid),[grid]);

    // occupies the avaible screen space so we can calculate the canvas's space for responsiveness
    const containerRef = useRef<HTMLDivElement | null>(null); 
    const canvasRef = useCanvas(containerRef);
    
    const { drawUnsolvedMaze } = useMazeDrawer({maze,size:options.size});
    const { solveMaze } = useMazeAnimator({maze, size: options.size, algorithmName: options.algorithm});

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')!;
        drawUnsolvedMaze({width: canvasRef.current.width, height: canvasRef.current.height, ctx});
    },[grid,canvasRef,drawUnsolvedMaze]);

    useEffect(() => {
        if (!canvasRef.current || mazeSolverState == "done" || mazeSolverState == "idle") return;
        const ctx = canvasRef.current.getContext('2d')!;
        const runMazeSolver = async () => {
            const stepsAndTime = await solveMaze({width: canvasRef.current!.width, height: canvasRef.current!.height,speed:options.speed, weight: options.weight, ctx});
            setMazeMetrics(stepsAndTime);
            updateSolverToDone();
        };
        runMazeSolver();
    },[mazeSolverState]);

    return (
        <div ref={containerRef} className="h-full w-full ">
            <canvas ref={canvasRef} />
        </div>

    )
}
