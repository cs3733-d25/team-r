import { AboutCard } from '@/components/AboutCard';
import React from 'react';
import { HeadingLabel } from '@/components/ui/heading-label.tsx';

export default function AboutPage() {
    const root = './ProfilePics/'; //image link comes after this

    const lead = [
        {
            name: 'Sarayu Vijayanagaram',
            role: 'Lead Software Engineer',
            photoURL: root + '/sarayu.png',
            quote: 'I would rather die of passion than boredom.',
            quoteAuthor: 'Vincent van Gogh'
        },
    ];

    const assistantLeads = [
        {
            name: 'Nora Cleary',
            role: 'Assistant Software Engineer / Back-End Developer',
            photoURL: root + '/nora.png',
            quote: 'Disastrous.',
            quoteAuthor: 'Dr. Wilson Wong'
        },
        {
            name: 'Akaash Walker',
            role: 'Assistant Software Engineer / Front-End Developer',
            photoURL: root + '/akaash.png',
            quote: 'lgtm',
            quoteAuthor: 'Akaash Walker'
        },
    ];

    const managementTop = [
        {
            name: 'Brian Grande',
            role: 'Project Manager / Back-End Developer',
            photoURL: root + '/brian.png',
            quote: "It never ceases to amaze me: we all love themselves more than other people, but care more about their opinions than our own.",
            quoteAuthor: 'Marcus Aurelius'
        },
        {
            name: 'Alex Lowczyk',
            role: 'Front-End Developer / Product Owner',
            photoURL: root + '/alex.png',
            quote: "Life isn’t about waiting for the storm to pass. It’s about learning how to dance in the rain.",
            quoteAuthor: 'Vivian Greene'
        },
    ];

    const managementBottom = [
        {
            name: 'Keagan Hitt',
            role: 'Scrum Master / Front-End Developer',
            photoURL: root + '/keagan.jpg',
            quote: 'Happy coding! 🗾',
            quoteAuthor: 'Keagan Hitt'
        },
        {
            name: 'Owen Miller',
            role: 'Documentation Analyst / Back-End Developer',
            photoURL: root + '/owen.png',
            quote: "Great things are done by a series of small things brought together.",
            quoteAuthor: 'Vincent van Gogh'
        },
    ];

    const developers = [
        { name: 'Daksh Gajaria', role: 'Back-End Developer', photoURL: root + '/daksh.png', quote: "What we think, we become.", quoteAuthor: 'Buddha' },
        { name: 'Joshua Gifford', role: 'Front-End Developer', photoURL: root + '/joshua.jpg', quote: 'Perfection is not attainable, but if we chase perfection we can catch excellence.', quoteAuthor: 'Vincent Lombardi' },
        { name: 'Riley Meyers', role: 'Front-End Developer', photoURL: root + '/riley.png', quote: "Keep your eyes to the sky, never glued to your shoes.", quoteAuthor: 'Mac Miller' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 py-8">
            <HeadingLabel className="text-4xl mb-6">About Us</HeadingLabel>
            <HeadingLabel className="text-4xl mb-6">Lead Software Engineer</HeadingLabel>
            {/* Lead section - special case for single card */}
            <div className="flex justify-center w-full max-w-7xl mx-auto px-4">
                {lead.map((member) => (
                    <AboutCard key={member.name} {...member} />
                ))}
            </div>

            <HeadingLabel className="text-4xl mt-12 mb-6">Assistant Leads</HeadingLabel>
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto px-4">
                {assistantLeads.map((member) => (
                    <AboutCard key={member.name} {...member} />
                ))}
            </div>

            <HeadingLabel className="text-4xl mt-12 mb-6">Management</HeadingLabel>
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto px-4">
                {managementTop.map((member) => (
                    <AboutCard key={member.name} {...member} />
                ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto mt-6 px-4">
                {managementBottom.map((member) => (
                    <AboutCard key={member.name} {...member} />
                ))}
            </div>

            <HeadingLabel className="text-4xl mt-12 mb-6">Developers</HeadingLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4 place-items-center">
                {developers.map((member) => (
                    <AboutCard key={member.name} {...member} />
                ))}
            </div>
        </div>
    )
}
