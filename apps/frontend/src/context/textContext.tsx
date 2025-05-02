import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface TextSizeType {
    scale: number;
    increase: () => void;
    decrease: () => void;
};

const TextSizeContext = createContext<TextSizeType | undefined>(undefined);

export const TextContextProvider = ({ children }: { children: ReactNode }) => {
    const [scale, setScale] = useState(() => {
        const saved = localStorage.getItem('textScale');
        return saved ? parseFloat(saved) : 1;
    });
    //increase and decrease scale until max or min reached
    const increase = () => setScale((scale) => Math.min(scale + 0.1, 2));
    const decrease = () => setScale((scale) => Math.max(scale - 0.1, 0.5));

    useEffect(() => {
        localStorage.setItem('textScale', scale.toString());
    }, [scale]);

    return (
        <TextSizeContext.Provider value={{ scale, increase, decrease }}>
            <div style={{ fontSize: `${scale}em` }}>
                {children}
            </div>
        </TextSizeContext.Provider>
    );
}

export const useTextSize = (): TextSizeType => {
    const context = useContext(TextSizeContext);
    if(!context){
        throw new Error ("useTextSize must be defined");
    }
    return context;
};
