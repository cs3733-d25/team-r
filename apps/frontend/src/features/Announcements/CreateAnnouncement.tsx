import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import AnnouncementForm from './AnnouncementForm.tsx'

export default function CreateAnnouncement() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const typeParam = searchParams.get('type') as 'urgent' | 'general' | 'bulletin' | null

    const handleSubmit = async (data: {
        title: string
        content: string
        author: string
        type: string
        expirationDate?: string
    }) => {
        await axios.post('/api/announcements', data)
        navigate('/announcements')
    }

    return(
        <div className="px-8 py-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Create Announcement</h1>
            <AnnouncementForm defaultType={typeParam ?? 'general'} onSubmit={handleSubmit} />
        </div>
    )
}