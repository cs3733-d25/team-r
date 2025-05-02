import React, {useState, useEffect } from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    priority: 'low' | 'medium' | 'high';
    expirationDate?: string;
}

interface AnnouncementPageProps {
    userType?: string;
    userName?: string;
    defaultTab?: string;
}

export function AnnouncementPage(props: AnnouncementPageProps) {
    const [activeTab, setActiveTab] = useState(props.defaultTab || 'overview');
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const announcementCategories = [
        { name: 'Urgent', description: 'Critical hospital announcements that require immediate attention', tab: 'urgent', filter: (announcement: Announcement) => announcement.priority === 'high' },
        { name: 'General', description: 'Regular hospital updates and information', tab: 'general', filter: (announcement: Announcement) => announcement.priority === 'medium' },
        { name: 'Bulletin', description: 'Non-critical hospital information and updates', tab: 'bulletin', filter: (announcement: Announcement) => announcement.priority === 'low' },
    ];

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get('/api/announcements');
            setAnnouncements(response.data);
        } catch (err) {
            console.error("Failed to fetch announcements", err);
        }
    };

    const deleteAnnouncement = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;

        try {
            await axios.delete(`/api/announcements/${id}`);
            setAnnouncements(announcements.filter(a => a.id !== id));
        } catch (err) {
            console.error("Failed to delete announcement", err);
        }
    };

    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const priorityBadgeColor = (priority: string) => {
        switch(priority) {
            case 'high': return 'bg-red-500 hover:bg-red-600';
            case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
            case 'low': return 'bg-blue-500 hover:bg-blue-600';
            default: return '';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto pt-12 pb-8">
                <div className="relative mb-6">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Hospital Announcements Dashboard
                    </h1>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="mb-0 border-b border-gray-200 shadow-none">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="all">All Announcements</TabsTrigger>
                            {announcementCategories.map((category) => (
                                <TabsTrigger key={category.name.toLowerCase()} value={category.name.toLowerCase()}>
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* Overview Tab Content */}
                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {announcementCategories.map((category, index) => (
                                    <Card key={category.name} className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-primary">
                                        <CardHeader className="text-primary-foreground bg-primary rounded-t-lg px-6">
                                            <CardTitle>{category.name} Announcements</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6 px-6 pb-6 bg-white h-full flex flex-col">
                                            <p className="text-muted-foreground mb-4 min-h-[3rem]">{category.description}</p>
                                            <div className="flex flex-col space-y-2 mt-auto">
                                                <Button variant="secondary" onClick={() => setActiveTab(category.name.toLowerCase())}>
                                                    View {category.name} Announcements
                                                </Button>
                                                <Button onClick={() => navigate('/announcementform')}>
                                                    Create New Announcement
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* All Announcements Tab */}
                        <TabsContent value="all">
                            {filteredAnnouncements.length === 0 ? (
                                <p className="text-center py-8 text-gray-500">No announcements found.</p>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredAnnouncements.map(announcement => (
                                        <AnnouncementCard
                                            key={announcement.id}
                                            announcement={announcement}
                                            onDelete={deleteAnnouncement}
                                            priorityBadgeColor={priorityBadgeColor}
                                            formatDate={formatDate}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Priority-specific Tabs */}
                        {announcementCategories.map((category) => (
                            <TabsContent key={category.name.toLowerCase()} value={category.name.toLowerCase()}>
                                {filteredAnnouncements.filter(category.filter).length === 0 ? (
                                    <p className="text-center py-8 text-gray-500">No {category.name.toLowerCase()} announcements found.</p>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {filteredAnnouncements.filter(category.filter).map(announcement => (
                                            <AnnouncementCard
                                                key={announcement.id}
                                                announcement={announcement}
                                                onDelete={deleteAnnouncement}
                                                priorityBadgeColor={priorityBadgeColor}
                                                formatDate={formatDate}
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>

                </div>


            </div>
        </div>
    );
}

interface AnnouncementCardProps {
    announcement: Announcement;
    onDelete: (id: string) => void;
    priorityBadgeColor: (priority: string) => string;
    formatDate: (date: string) => string;
}

function AnnouncementCard({ announcement, onDelete, priorityBadgeColor, formatDate }: AnnouncementCardProps) {
    return (
        <Card className={announcement.priority === 'high' ? 'border-red-500 shadow-md' : ''}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    <Badge className={priorityBadgeColor(announcement.priority)}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                    </Badge>
                </div>
                <CardDescription>
                    Posted by {announcement.author} on {formatDate(announcement.date)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{announcement.content}</p>
                {announcement.expirationDate && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        Valid until: {formatDate(announcement.expirationDate)}
                    </p>
                )}
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" asChild>
                    <a href={`/edit-announcement/${announcement.id}`}>Edit</a>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(announcement.id)}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AnnouncementPage;