import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AnnouncementForm from './AnnouncementForm.tsx';

interface Announcement {
    id: string | number;
    title: string;
    content: string;
    author: string;
    priority: string;
    type: string;
    expirationDate?: string;
    timestamp: string;
}

export default function AnnouncementEdit() {
    const { id } = useParams<'id'>();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState<Announcement | null>(null);

    useEffect(() => {
        axios
            .get(`/api/announcements/${id}`)
            .then(res => setInitialData(res.data))
            .catch(() => navigate('/announcements'));
    }, [id]);

    const handleSubmit = async (data: {
        title: string;
        content: string;
        author: string;
        priority: string;
        type: string;
        expirationDate?: string;
    }) => {
        await axios.put(`/api/announcements/${id}`, {
            ...initialData,
            ...data,
        })
        navigate('/announcements');
    };

    // render the same form, but pre-filled and using PUT on submit
    return initialData
        ? <AnnouncementForm initialData={initialData} onSubmit={handleSubmit} />
        : null;
}