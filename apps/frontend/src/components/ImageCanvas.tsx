import { useEffect, useRef } from 'react';

/**
 * ImageCanvas component renders an image on a canvas and allows for drawing markers on it
 * x and y coordinates are relative to the canvas size
 * label is optional
 */
interface Marker {
    x: number;
    y: number;
    label?: string;
}

/**
 * Props for the ImageCanvas component
 * @property markers - Array of markers to be drawn on the canvas
 */
interface ImageCanvasProps {
    markers?: Marker[];
}

/**
 * ImageCanvas component
 * @param markers - Array of markers to be drawn on the canvas
 * @constructor
 */
function ImageCanvas({ markers }: ImageCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawMarker = (ctx: CanvasRenderingContext2D, x: number, y: number, label?: string) => {
        const markerRadius = 10;

        // Draw the circular marker
        ctx.beginPath();
        ctx.arc(x, y, markerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();

        // Add label if provided
        if (label) {
            ctx.font = 'bolder 25px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(label, x + 15, y + 5);
        }
    };

    // useEffect to draw the image and markers on the canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        // Use floor plan image as background of canvas
        img.src = '/FinalFloorPlan-It1.png';
        img.onload = () => {
            // Get the display dimensions from CSS
            const displayWidth = canvas.clientWidth;
            const aspectRatio = img.width / img.height;

            // Set canvas dimensions to match display size
            canvas.width = displayWidth;
            canvas.height = displayWidth / aspectRatio;


            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Draw all markers
            if (!markers) return;
            markers.forEach((marker) => {
                drawMarker(ctx, marker.x, marker.y, marker.label);
                console.log(marker.x, marker.y, marker.label);
            });
        };
    }, [markers]);

    // returning the drawn canvas with optional markers
    return (
        <canvas
            ref={canvasRef}
            className="mx-auto border border-gray-300 w-2/3 h-auto"
            style={{ display: 'block' }}
        ></canvas>
    );
}

export default ImageCanvas;