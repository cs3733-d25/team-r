import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
    title: string;
    homelabel?: string;
    homelabelLink?: string;
    formlabel?: string;
    formlabelLink?: string;
}

const HomeHeader: React.FC<HeaderProps> = ({ title, homelabel, homelabelLink, formlabel, formlabelLink }) => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <h1 className="text-2xl font-bold">{title}</h1>
            {homelabel && homelabelLink ? (
                <Link to={homelabelLink} className="text-blue-500 hover:text-blue-700 underline">
                    {homelabel}
                </Link>
                ) : (
                homelabel && <p className="text-sm">{homelabel}</p>
            )}
            {formlabel && formlabelLink ? (
                <Link to={formlabelLink} className="text-blue-500 hover:text-blue-700 underline">
                    {formlabel}
                </Link>
            ) : (
                formlabel && <p className="text-sm">{formlabel}</p>
            )}
        </header>
    );
};

export default HomeHeader;
