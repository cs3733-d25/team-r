import React from "react";

const Footer = () => {
    return (
        <footer className="w-full border-t border-border text-foreground py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center text-sm">
                <p className="mb-3 font-trade text-muted-foreground">
                    This website is a term project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and is not to be confused with the actual Brigham & Women’s Hospital website.
                </p>
                <div className="mb-3 text-muted-foreground">
                    <span>WPI Computer Science Department</span> |
                    <span className="mx-2">CS3733-D25 Software Engineering</span> |
                    <span className="mx-2">Prof. Wilson Wong</span>
                </div>
                <p className="mb-3 text-muted-foreground">
                    Visit the real{" "}
                    <a
                        href="https://www.massgeneral.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                    >
                        Massachusetts General Hospital website
                    </a>
                    .
                </p>
                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Team D25. For educational purposes only.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
