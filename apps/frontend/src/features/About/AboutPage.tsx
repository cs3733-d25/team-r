// src/features/About/AboutPage.tsx
import React from 'react';

const AboutPage = () => {
    const teamMembers = [
        { name: 'Nora Cleary', role: 'Assistant Software Engineer / Back-End Developer' },
        { name: 'Daksh Gajaria', role: 'Back-End Developer' },
        { name: 'Joshua Gifford', role: 'Front-End Developer' },
        { name: 'Brian Grande', role: 'Project Manager / Back-End Developer' },
        { name: 'Keagan Hitt', role: 'Scrum Master / Front-End Developer' },
        { name: 'Alex Lowczyk', role: 'Front-End Developer / Product Owner' },
        { name: 'Riley Meyers', role: 'Front-End Developer' },
        { name: 'Owen Miller', role: 'Documentation Analyst / Back-End Developer' },
        { name: 'Sarayu Vijayanagaram', role: 'Lead Software Engineer' },
        { name: 'Akaash Walker', role: 'Assistant Software Engineer / Front-End Developer' },
    ];

    return (
        <div className="flex flex-col items-center p-6 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold place-self-center">About Us</h1>
                <h2 className="text-xl font-bold font-trade place-self-center">WPI Computer Science Department</h2>
                <h2 className="text-xl font-bold font-trade place-self-center">CS3733-D25 Software Engineering</h2>
                <h2 className="text-xl font-bold font-trade place-self-center">Professor: Wilson Wong</h2>
                <h2 className="text-xl font-bold font-trade place-self-center">Team Coach: Keira Schoolcraft</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers.map((member, idx) => (
                    <div key={idx} className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full text-center text-xs">
                            Photo
                        </div>
                        <h2 className="text-xl font-semibold text-center">{member.name}</h2>
                        <p className="text-gray-600 text-center">{member.role}</p>
                    </div>
                ))}
            </div>

            <div className="text-center space-y-4 pt-8">
                <p className="text-lg font-semibold">
                    Special Thanks to Brigham and Women’s Hospital and Andrew Shinn
                </p>
                <p className="text-sm text-gray-500">
                    The Brigham & Women’s Hospital maps and data used in this application are copyrighted and provided for the sole use of educational purposes.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
