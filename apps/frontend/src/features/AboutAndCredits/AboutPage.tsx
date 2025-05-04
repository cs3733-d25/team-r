import React from 'react';

const AboutPage = () => {
    const root = './ProfilePics/'; //image link comes after this

    const lead = [
        {
            name: 'Sarayu Vijayanagaram',
            role: 'Lead Software Engineer',
            photoURL: root + '/sarayu.png',
        },
    ];

    const assistantLeads = [
        {
            name: 'Nora Cleary',
            role: 'Assistant Software Engineer / Back-End Developer',
            photoURL: root + '/nora.png',
        },
        {
            name: 'Akaash Walker',
            role: 'Assistant Software Engineer / Front-End Developer',
            photoURL: root + '/akaash.png',
        },
    ];

    const managementTop = [
        {
            name: 'Brian Grande',
            role: 'Project Manager / Back-End Developer',
            photoURL: root + '/brian.png',
        },
        {
            name: 'Alex Lowczyk',
            role: 'Front-End Developer / Product Owner',
            photoURL: root + '/alex.png',
        },
    ];

    const managementBottom = [
        {
            name: 'Keagan Hitt',
            role: 'Scrum Master / Front-End Developer',
            photoURL: root + '/keagan.jpg',
        },
        {
            name: 'Owen Miller',
            role: 'Documentation Analyst / Back-End Developer',
            photoURL: root + '/owen.png',
        },
    ];

    const developers = [
        { name: 'Daksh Gajaria', role: 'Back-End Developer', photoURL: root + '/daksh.png' },
        { name: 'Joshua Gifford', role: 'Front-End Developer', photoURL: root + '/joshua.jpg' },
        { name: 'Riley Meyers', role: 'Front-End Developer', photoURL: root + '/riley.png' },
    ];

    const Card = ({ name, role, photoURL }: { name: string; role: string; photoURL: string }) => (
        <div className="bg-white dark:bg-card shadow-md rounded-2xl p-4 flex flex-row items-center w-96 h-48 space-x-4 hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden">
                    <img
                        src={photoURL}
                        alt={name}
                        className="w-full h-full rounded-lg object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center text-left">
                <h3 className="text-[1.5em] font-bold">{name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-inherit">{role}</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center p-6 space-y-12">
            {/* AboutAndCredits Header */}
            <div className="text-center space-y-1">
                <h1 className="p-4 text-4xl font-bold">About Us</h1>
                <h2 className="text-xl font-bold font-trade">WPI Computer Science Department</h2>
                <h2 className="text-xl font-bold font-trade">CS3733-D25 Software Engineering</h2>
                <h2 className="text-xl font-bold font-trade">Professor: Wilson Wong</h2>
                <h2 className="text-xl font-bold font-trade">Team Coach: Keira Schoolcraft</h2>
            </div>

            {/* Team Sections */}
            <div className="flex flex-col w-full max-w-[1400px] space-y-16">
                {/* Lead */}
                <div className="flex flex-col items-center space-y-6">
                    <h2 className="text-2xl font-bold text-center">Lead Software Engineer</h2>
                    <div className="flex justify-center flex-wrap gap-8">
                        {lead.map((member, idx) => (
                            <Card
                                key={idx}
                                name={member.name}
                                role={member.role}
                                photoURL={member.photoURL}
                            />
                        ))}
                    </div>
                </div>

                {/* Assistant Leads */}
                <div className="flex flex-col items-center space-y-6">
                    <h2 className="text-2xl font-bold text-center">Assistant Software Engineers</h2>
                    <div className="flex justify-center flex-wrap gap-8">
                        {assistantLeads.map((member, idx) => (
                            <Card
                                key={idx}
                                name={member.name}
                                role={member.role}
                                photoURL={member.photoURL}
                            />
                        ))}
                    </div>
                </div>

                {/* Management */}
                <div className="flex flex-col items-center space-y-6">
                    <h2 className="text-2xl font-bold text-center">Management Team</h2>

                    {/* Top Management Row -> Product Owner/Project Manager*/}
                    <div className="flex justify-center gap-8">
                        {managementTop.map((member, idx) => (
                            <Card
                                key={idx}
                                name={member.name}
                                role={member.role}
                                photoURL={member.photoURL}
                            />
                        ))}
                    </div>

                    {/* Bottom Management Row -> Documentation/Scrum Master */}
                    <div className="flex justify-center gap-8">
                        {managementBottom.map((member, idx) => (
                            <Card
                                key={idx}
                                name={member.name}
                                role={member.role}
                                photoURL={member.photoURL}
                            />
                        ))}
                    </div>
                </div>

                {/* Developers */}
                <div className="flex flex-col items-center space-y-6">
                    <h2 className="text-2xl font-bold text-center">Developers</h2>
                    <div className="flex justify-center flex-wrap gap-8">
                        {developers.map((member, idx) => (
                            <Card
                                key={idx}
                                name={member.name}
                                role={member.role}
                                photoURL={member.photoURL}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-4 pt-8">
                <p className="text-lg font-semibold">
                    Special Thanks to Brigham and Women’s Hospital and Andrew Shinn
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    The Brigham & Women’s Hospital maps and data used in this application are
                    copyrighted and provided for the sole use of educational purposes.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
