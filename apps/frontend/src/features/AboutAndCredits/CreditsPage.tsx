import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import React from 'react'



export const CreditsPage = () => {
    const devTools = [
        {name: 'PostgresSQL', link: 'https://www.postgresql.org/', image: ''},
        {name: 'Express', link: 'https://expressjs.com/', image: ''},
        {name: 'React', link: 'https://react.dev/', image: 'react.svg'},
        {name: 'Node.js', link: 'https://nodejs.org/en', image: ''},
        {name: 'Vite', link: 'https://vite.dev/', image: 'vite.svg'},
        {name: 'Tailwind', link: 'https://nodejs.org/en', image: ''},
        {name: 'Shadcn', link: 'https://nodejs.org/en', image: ''},
        {name: 'Git', link: 'https://nodejs.org/en', image: ''},
        {name: 'Docker', link: 'https://nodejs.org/en', image: ''},
        {name: 'Webstorm', link: 'https://nodejs.org/en', image: ''},
        {name: 'Bruno', link: 'https://nodejs.org/en', image: ''},
        {name: 'Jira', link: 'https://nodejs.org/en', image: ''},
        {name: 'AWS', link: 'https://aws.amazon.com/', image: ''},
    ]
    
    return (
        <div>
            <h1 className='p-2 text-2xl font-bold font-trade mb-0 place-self-center'>Credits</h1>
            {/*<Label/>*/}
            <p className='max-w-3xl p-2 text-1xl font-bold font-trade mb-0 place-self-center'> This web application was developed using the PERN (PostgreSQL, Express, React, Node.js) stack with
                Typescript, Prisma ORM, Shadcn and Tailwind. Deployment on the cloud was accomplished using AWS EC, a
                Docker container, and AWS RDS to run the PostgreSQL server. </p>
            <div className='w-full flex flex-wrap justify-center gap-10 p-10'>
                {devTools.map((tool)  => (
                <Card key={tool.name} className='w-48 h-48'>
                    <a className='flex-grow flex items-end justify-center' href={tool.link}> <img src={tool.image} alt={tool.name} className='w-30 h-30'/> </a>
                    <CardHeader className='justify-center px-0'>
                        <CardTitle>{tool.name}</CardTitle>
                    </CardHeader>
                </Card>
            ))}
            </div>

        </div>
    )
}

export default CreditsPage
