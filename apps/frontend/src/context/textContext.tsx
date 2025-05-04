import {useContext, useEffect, useState, createContext, ReactNode} from "react";
//
//
// interface TextSizeType {
//     scale: number;
//     increase: () => void;
//     decrease: () => void;
// };
//
// const TextSizeContext = createContext<TextSizeType | undefined>(undefined);
//
// export const TextContextProvider = ({ children }: { children: ReactNode }) => {
//     const [scale, setScale] = useState(() => {
//         const saved = localStorage.getItem('textScale');
//         return saved ? parseFloat(saved) : 1;
//     });
//     //increase and decrease scale until max or min reached
//     const increase = () => setScale((scale) => Math.min(scale + 0.1, 2));
//     const decrease = () => setScale((scale) => Math.max(scale - 0.1, 0.5));
//
//     useEffect(() => {
//         localStorage.setItem('textScale', scale.toString());
//     }, [scale]);
//
//     return (
//         <TextSizeContext.Provider value={{ scale, increase, decrease }}>
//             <div style={{ fontSize: `${scale}em` }}>
//                 {children}
//             </div>
//         </TextSizeContext.Provider>
//     );
// }
//
// export const useTextSize = (): TextSizeType => {
//     const context = useContext(TextSizeContext);
//     if(!context){
//         throw new Error ("useTextSize must be defined");
//     }
//     return context;
// };

// TextSizeContext.tsx
const TEXT_SIZE_CLASSES = ['text-sm', 'text-base', 'text-lg', 'text-xl', "text-2xl"];

interface TextSizeContextType {
    index: number;
    increase: () => void;
    decrease: () => void;
    className: string;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

export const TextContextProvider = ({ children }: { children: ReactNode }) => {
    const [index, setIndex] = useState(() => {
        const saved = localStorage.getItem("textSizeIndex");
        return saved ? parseInt(saved) : 1; // default to 'text-base'
    });

    const increase = () => setIndex((i) => Math.min(i + 1, TEXT_SIZE_CLASSES.length - 1));
    const decrease = () => setIndex((i) => Math.max(i - 1, 0));

    useEffect(() => {
        localStorage.setItem("textSizeIndex", index.toString());
    }, [index]);

    const className = TEXT_SIZE_CLASSES[index];

    return (
        <TextSizeContext.Provider value={{ index, increase, decrease, className }}>
            <div className={className}>
                {children}
            </div>
        </TextSizeContext.Provider>
    );
};

export const useTextSize = () => {
    const context = useContext(TextSizeContext);
    if (!context) throw new Error("useTextSize must be used within a TextSizeProvider");
    return context;
};
