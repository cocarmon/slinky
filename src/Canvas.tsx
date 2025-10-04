import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { useMazeAnimator } from '@/hooks/useMazeAnimator';

import type { Maze, MazeOptions } from '@/types';
import useMazeDrawer from '@/hooks/useMazeDrawer';
import { useCanvas } from '@/hooks/useCanvas';

interface CanvasProps {
    grid: Maze;
    isOn: Boolean;
    options: MazeOptions;
    setMazeMetrics: Dispatch<SetStateAction<{steps:number, time: string}>>;
    setIsOn: Dispatch<SetStateAction<boolean>>;
};

export default function Canvas({grid,options,isOn,setMazeMetrics,setIsOn}:CanvasProps) {
    // Used to scale the canvas to the users screen
    const containerRef = useRef<HTMLDivElement>(null);  
    // I use 2 seperate canvas's, one for the walls and one for the path
    // This makes it easy and efficient to clear the path without mutating or deep copying the maze
    const pathCanvasRef = useCanvas(containerRef);
    const wallsCanvasRef = useCanvas(containerRef);

    // Writes on the walls canvas
    const { drawUnsolvedMaze } = useMazeDrawer({maze:grid,size:grid.length});
    // Writes on the path canvas
    const { solveMaze } = useMazeAnimator({grid, size: options.size, algorithmName: options.algorithm});

    useEffect(() => {
        if (!containerRef?.current || !wallsCanvasRef?.current || !pathCanvasRef?.current) return;
        const wallsCanvasCtx = wallsCanvasRef.current.getContext('2d');
        const pathCanvasCtx = pathCanvasRef.current.getContext('2d');

        if (!wallsCanvasCtx || !pathCanvasCtx) return;
        // We want to always make sure that when there is a new maze drawn, that we clear any previous path
        pathCanvasCtx.clearRect(0, 0, pathCanvasRef.current!.width, pathCanvasRef.current!.height);
        drawUnsolvedMaze({width: wallsCanvasRef.current.width, height: wallsCanvasRef.current.height, ctx:wallsCanvasCtx});
    },[grid,wallsCanvasRef,drawUnsolvedMaze]);

    useEffect(()=> {
        if(!pathCanvasRef.current || !isOn) return;
        const pathCanvasCtx = pathCanvasRef.current.getContext('2d');

        if (!pathCanvasCtx) return;
        setMazeMetrics({steps:0,time:'0'});

        const {width: pathCanvasWidth, height: pathCanvasHeight} = pathCanvasRef.current;
        // Makes sure we stop any work and clears the canvas if the user changes a parameter
        const controller = new AbortController();
        pathCanvasCtx.clearRect(0, 0, pathCanvasWidth, pathCanvasHeight);

        const func = async () =>  {
            try {
                const mazeParameters = {
                    width: pathCanvasWidth, 
                    height: pathCanvasHeight,
                    speed:options.speed, 
                    weight: options.weight, 
                    ctx:pathCanvasCtx,
                    signal: controller.signal
                };
                const stepsAndTime = await solveMaze(mazeParameters);
                setMazeMetrics(stepsAndTime);
            }
            catch(err) {
                if (err instanceof DOMException && err.name === "AbortError") return; 
                throw err;
            } finally {
                setIsOn(false);
            }
        }
        func();

        return () => {
            controller.abort();
        }
    },[isOn,JSON.stringify(options)])

    return (
        <div  className="h-full w-full p-4 rounded-md ">
            <div ref={containerRef} className="h-full w-full bg-zinc-800">
                <canvas ref={wallsCanvasRef}  className="absolute" />
                <canvas ref={pathCanvasRef} className="absolute z-0" />
            </div>
        </div>

    )
}
