import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AnnouncementForm from './AnnouncementForm.tsx'

export default function CreateAnnouncement() {
    const navigate = useNavigate()

    const handleSubmit = async (data: {
        title: string
        content: string
        author: string
        priority: string
        type: string
        expirationDate?: string
    }) => {
        await axios.post('/api/announcements', data)
        navigate('/announcements')
    }

    return <AnnouncementForm onSubmit={handleSubmit} />
}