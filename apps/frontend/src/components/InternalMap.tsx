import React from 'react';

interface InternalMapProps {
    parkingLot: "" | 'p1' | 'p2' | 'p3';
    reception: "" | 'r2' | 'r3';
}

const InternalMap: React.FC<InternalMapProps> = ({ parkingLot, reception }) => {
    const imageMap: Record<string, Record<string, string>> = {
        p1: {
            r2: '/p1_e1_r2.png',
            r3: '/p1_e3_r3.png',
        },
        p2: {
            r2: '/p2_e1_r2.png',
            r3: '/p2_e1_r3.png',
        },
        p3: {
            r2: '/p3_e1_r2.png',
            r3: '/p3_e1_r3.png',
        },
    };

    const imagePath = imageMap[parkingLot]?.[reception];

    return (
        <div className="flex flex-col items-center gap-2">
            {imagePath ? (
                <img
                    src={imagePath}
                    alt={`Map for ${parkingLot.toUpperCase()} - ${reception.toUpperCase()}`}
                    className="rounded-xl shadow-md max-w-full"
                />
            ) : (
                <img
                    src="/FinalFloorPlan-It1-resize.png"
                    alt="Default Map"
                    className="rounded-xl shadow-md max-w-full"
                />
            )}
        </div>
    );
};

export default InternalMap;
