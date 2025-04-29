import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import React from 'react'



export const CreditsPage = () => {
    const root = './DevTools/'; //image link comes after this
    const devTools = [
        {name: 'PostgresSQL', link: 'https://www.postgresql.org/', image: 'PostgreSQL.svg'},
        {name: 'Express', link: 'https://expressjs.com/', image: 'express1.png'},
        {name: 'React', link: 'https://react.dev/', image: 'react.svg'},
        {name: 'Node.js', link: 'https://nodejs.org/en', image: 'node-js.svg'},
        {name: 'Vite', link: 'https://vite.dev/', image: 'vite.svg'},
        {name: 'Tailwind', link: 'https://tailwindcss.com/', image: 'tailwind.svg'},
        {name: 'Shadcn', link: 'https://ui.shadcn.com/', image: 'shadcn-ui.svg'},
        {name: 'GitHub', link: 'https://github.com/', image: 'github.svg'},
        {name: 'Docker', link: 'https://www.docker.com/', image: 'docker.svg'},
        {name: 'Webstorm', link: 'https://www.jetbrains.com/webstorm/', image: 'WebStorm.svg'},
        {name: 'Bruno', link: 'https://www.usebruno.com/', image: 'bruno.png'},
        {name: 'Jira', link: 'https://www.atlassian.com/software/jira', image: 'Jira.svg'},
        {name: 'AWS', link: 'https://aws.amazon.com/', image: 'aws.svg'},
    ]
    
    return (
        <div>
            <h1 className='p-2 text-2xl font-bold font-trade mb-0 place-self-center'>Credits</h1>
            {/*<Label/>*/}
            <p className='max-w-3xl p-2 text-1xl font-bold font-trade mb-0 place-self-center'> This web application was developed using the PERN (PostgreSQL, Express, React, Node.js) stack with
                Typescript, Prisma ORM, Shadcn and Tailwind. Deployment on the cloud was accomplished using AWS EC, a
                Docker container, and AWS RDS to run the PostgreSQL server. Click on any of the icons below to learn more. </p>
            <div className='w-full flex flex-wrap justify-center gap-10 p-10'>
                {devTools.map((tool)  => (
                <Card key={tool.name} className='w-48 h-48'>
                    <a className='flex-grow flex items-end justify-center' href={tool.link}> <img src={root + tool.image} alt={tool.name} className='w-30 h-30'/> </a>
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
