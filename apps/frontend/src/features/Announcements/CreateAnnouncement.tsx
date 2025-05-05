import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import AnnouncementForm from './AnnouncementForm.tsx'
import {Button} from '@/components/ui/button.tsx'
import {useState} from 'react';

export default function CreateAnnouncement() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const typeParam = searchParams.get('type') as 'urgent' | 'general' | 'bulletin' | null
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [announcement, setAnnouncement] = useState<{
        title: string;
        content: string;
        author: string;
        type: string;
        date: string;
        expirationDate?: string;
    } | null>(null)

    const handleSubmit = async (data: {
        title: string
        content: string
        author: string
        type: string
        expirationDate?: string
    }) => {
        try {
            const response = await axios.post('/api/announcements', data)
            setAnnouncement(response.data.announcement)
            setIsSubmitted(true)
        } catch (error) {
            console.error('Error creating announcement:', error)
        }
    }

    if (isSubmitted) {
        return (
            <div className="px-8 py-6">
                {/* Confirmation Card */}
                <div className="mb-6 rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
                    <div className="bg-primary text-primary-foreground font-bold px-4 py-2 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Announcement Confirmation
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Your announcement has been published
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="font-semibold">Title:</span>{' '}
                                {announcement?.title}
                            </div>
                            <div>
                                <span className="font-semibold">Type:</span>{' '}
                                {announcement?.type}
                            </div>
                            <div>
                                <span className="font-semibold">Author:</span>{' '}
                                {announcement?.author}
                            </div>
                            <div>
                                <span className="font-semibold">Date:</span>{' '}
                                {announcement && new Date(announcement.date).toLocaleString()}
                            </div>
                            {announcement?.expirationDate && (
                                <div>
                                    <span className="font-semibold">Expires:</span>{' '}
                                    {new Date(announcement.expirationDate).toLocaleString()}
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <span className="font-semibold">Content:</span>{' '}
                            <p className="mt-1 p-2 bg-background/50 rounded">{announcement?.content}</p>
                        </div>
                        <div className="mt-3 text-sm text-secondary-foreground">
                            The announcement has been published and is now visible to all users.
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Button
                                onClick={() => {
                                    setIsSubmitted(false)
                                    setAnnouncement(null)
                                }}
                                variant="outline"
                            >
                                Create Another Announcement
                            </Button>
                            <Button
                                onClick={() => navigate('/announcements')}
                                variant="default"
                            >
                                View All Announcements
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="px-8 py-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Create Announcement</h1>
            <AnnouncementForm defaultType={typeParam ?? 'general'} onSubmit={handleSubmit} />
        </div>
    )
}