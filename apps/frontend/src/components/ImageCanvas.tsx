import { useEffect, useRef } from 'react';

interface Marker {
    x: number;
    y: number;
    label?: string;
}

interface ImageCanvasProps {
    markers?: Marker[];
}

function ImageCanvas({ markers }: ImageCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawMarker = (ctx: CanvasRenderingContext2D, x: number, y: number, label?: string) => {
        const markerRadius = 10;

        // Draw the circular marker
        ctx.beginPath();
        ctx.arc(x, y, markerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();

        // Optionally, add a label near the marker
        if (label) {
            ctx.font = 'bolder 25px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(label, x + 15, y + 5);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
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

    return (
        <canvas
            ref={canvasRef}
            className="mx-auto border border-gray-300 w-2/3 h-auto"
            style={{ display: 'block' }}
        ></canvas>
    );
}

export default ImageCanvas;