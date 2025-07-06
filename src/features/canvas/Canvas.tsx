import { useEffect, useRef } from 'react'
import { generateMaze } from '@/utils/mazeGenerator';
import { useMazeContext } from '@/context/MazeContext';

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null); // occupies the avaible screen space so we can calculate the canvas's space for responsiveness
    const {options} = useMazeContext();
    const grid = generateMaze(Number(options.size));

    const draw  = (ctx:CanvasRenderingContext2D ) => {
        const cellWidth = canvasRef.current.width / options.size;
        const cellHeight = canvasRef.current.height / options.size;
        // Starting Cell
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(0, 0, cellWidth, cellHeight);
        // End Cell
        ctx.fillStyle = '#ef4444';
        ctx.fillRect((grid[0].length - 1) * cellWidth, (grid.length-1) * cellHeight, cellWidth, cellHeight);

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const xStart = col* cellWidth;
                const xEnd = (col * cellWidth) + cellWidth;
                const yStart = row * cellHeight;
                const yEnd = (row * cellHeight) + cellHeight;

                ctx.strokeStyle = '#71717a';
                ctx.beginPath();
                ctx.moveTo(xStart,yStart);

                if (grid[row][col].walls.left) {
                    ctx.lineTo(xStart,yEnd);
                }
                if (grid[row][col].walls.top) {
                    ctx.moveTo(xStart,yStart);
                    ctx.lineTo(xEnd,yStart);
                }
                // we only draw the left and top wall of each cell 
                
                // add right boudnary to last column
                if(col == grid[row].length - 1) {
                    ctx.moveTo(xEnd,yStart);
                    ctx.lineTo(xEnd,yEnd);
                }
                // add bottom boundary to last row
                if(row == grid.length - 1) {
                    ctx.moveTo(xStart,yEnd);
                    ctx.lineTo(xEnd,yEnd);
                }
                
                ctx.stroke()
            };
        };

    };


    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const { width, height } = container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        draw(ctx!)

    },[grid]);
    
  return (
    <div ref={containerRef} className="h-full w-full ">
        <canvas ref={canvasRef} />
    </div>

  )
}
