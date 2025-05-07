import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import AnnouncementForm from './AnnouncementForm.tsx'
import {useState} from 'react';

export default function CreateAnnouncement() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const typeParam = searchParams.get('type') as 'urgent' | 'general' | 'bulletin' | null
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formKey, setFormKey] = useState(0)
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
            setFormKey(prev => prev + 1) // reset form
        } catch (error) {
            console.error('Error creating announcement:', error)
        }
    }

    const handleDismiss = () => {
        setIsSubmitted(false)
        setAnnouncement(null)
    }

    return (
        <div className="px-8 py-6">
            <AnnouncementForm
                key={formKey}
                defaultType={typeParam ?? 'general'}
                onSubmit={handleSubmit}
                isSubmitted={isSubmitted}
                announcement={announcement}
                onDismiss={handleDismiss}
                onViewAll={() => navigate('/announcements?tab=all')}
            />
        </div>
    )
}