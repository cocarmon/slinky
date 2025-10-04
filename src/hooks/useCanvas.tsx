import { useRef, useLayoutEffect } from 'react';

export const useCanvas = (
    containerRef: React.RefObject<HTMLDivElement | null> ,
) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);

        useLayoutEffect(() => {
            if (!canvasRef.current || !containerRef?.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }, [containerRef]);

        return canvasRef;
}
