import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import React from 'react'



export const CreditsPage = () => {

    const softwareTools = ['PostgresSQL', 'Express', 'React', 'Node.js']
    const images = ['https://www.postgresql.org/', 'https://expressjs.com/', 'https://react.dev/', 'https://nodejs.org/en']


    return (
        <div>
            <h1 className='p-2 text-2xl font-bold font-trade mb-0 place-self-center'>Credits</h1>
            {/*<Label/>*/}
            <p className='max-w-3xl p-2 text-1xl font-bold font-trade mb-0 place-self-center'> This web application was developed using the PERN (PostgreSQL, Express, React, Node.js) stack with
                Typescript, Prisma ORM, Shadcn and Tailwind. Deployment on the cloud was accomplished using AWS EC, a
                Docker container, and AWS RDS to run the PostgreSQL server. </p>
            <div className='w-full flex flex-wrap justify-center gap-6 p-6'>
                {softwareTools.map((tool) => (
                <Card key={tool} className='w-48 h-48'>
                    <a className='flex-grow flex items-end justify-center' href='https://react.dev/'> <img src="/react.svg" alt={tool} className='w-30 h-30'/> </a>
                    <CardHeader className='justify-center px-0'>
                        <CardTitle>{tool}</CardTitle>
                    </CardHeader>

                </Card>
            ))}
            </div>

        </div>
    )
}

export default CreditsPage
