// Dashboard.tsx or wherever you're using the Calendar
import React, {useEffect, useState} from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios';

type Announcement = {
    id: string
    title: string
    content: string
    date: string
    author: string
    type: string
    expirationDate: string

}
async function getAnnouncements(){
    try{
        const announcements = await axios.get("/:selectedDate");
        return announcements;
    } catch (error) {
        console.log(error);
        return "no announcements found";
    }
}

export default function Dashboard() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAnnouncements() {
            try {
                const res = await axios.get("/api/announcements") // Update the endpoint!
                setAnnouncements(res.data)
            } catch (error) {
                console.error("Error fetching announcements:", error)
                setAnnouncements([])
            } finally {
                setLoading(false)
            }
        }

        fetchAnnouncements()
    }, [])

    const eventsForSelectedDate = announcements.filter(event =>
        new Date(event.date).toDateString() === selectedDate?.toDateString()
    )
    const eventDates = announcements.map(event => new Date(event.date))

    return (
        <div className="flex gap-6">
            {/* Calendar */}
            <Calendar selected={selectedDate} onSelect={setSelectedDate} modifiers={{ event: eventDates }}
                      modifiersClassNames={{ event: "bg-white text-primary-foreground" }}/>

            {/* Events Card */}
            <div className="flex-1">
                {eventsForSelectedDate.length > 0 ? (
                    eventsForSelectedDate.map(event => (
                        <Card key={event.id} className="mb-4">
                            <CardHeader>
                                <CardTitle>{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{event.content}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="p-4">No announcements for this date.</CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}


