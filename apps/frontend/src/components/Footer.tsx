import React from 'react';

interface FooterTextProps {
    children: React.ReactNode;
    className?: string;
}

const FooterText = ({ children, className = '' }: FooterTextProps) => (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

const Footer = () => {
    return (
        <footer className="w-full border-t border-border text-foreground py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
                <FooterText className="mb-3 font-trade">
                    This website is a term project exercise for WPI CS 3733 Software Engineering
                    (Prof. Wong) and is not to be confused with the actual Brigham & Women's
                    Hospital website.
                </FooterText>

                <FooterText className="mb-3">
                    <span>WPI Computer Science Department</span> |
                    <span> CS3733-D25 Software Engineering </span> |<span> Prof. Wilson Wong </span>
                </FooterText>

                <FooterText>
                    Visit the real{' '}
                    <a
                        href="https://www.massgeneral.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                    >
                        Massachusetts General Hospital website
                    </a>
                    .
                </FooterText>
            </div>
        </footer>
    );
};

export default Footer;
