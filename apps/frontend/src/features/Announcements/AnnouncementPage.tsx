import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {useAuth0} from "@auth0/auth0-react";

interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    priority: 'low' | 'medium' | 'high';
    expirationDate?: string;
}

export function AnnouncementPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth0();
    // access a custom claim/attribute from the Auth0 user profile
    // const isAdmin = user?.['...']?.includes('Admin');

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/announcements');
            setAnnouncements(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch announcements", err);
            setError("Unable to load announcements. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const deleteAnnouncement = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;

        try {
            await axios.delete(`/api/announcements/${id}`);
            setAnnouncements(announcements.filter(a => a.id !== id));
        } catch (err) {
            console.error("Failed to delete announcement", err);
            setError("Failed to delete announcement. Please try again.");
        }
    };

    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const priorityAnnouncements = filteredAnnouncements.filter(a => a.priority === 'high');
    const regularAnnouncements = filteredAnnouncements.filter(a => a.priority !== 'high');

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

    if (loading) return <div className="flex justify-center p-8">Loading announcements...</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Hospital Announcements</h1>
                {isAdmin && (
                    <Button asChild>
                        <a href="/create-announcement">New Announcement</a>
                    </Button>
                )}
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="mb-6">
                <Input
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                />
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="urgent">Urgent</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    {filteredAnnouncements.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">No announcements found.</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {[...priorityAnnouncements, ...regularAnnouncements].map(announcement => (
                                <AnnouncementCard
                                    key={announcement.id}
                                    announcement={announcement}
                                    isAdmin={isAdmin}
                                    onDelete={deleteAnnouncement}
                                    priorityBadgeColor={priorityBadgeColor}
                                    formatDate={formatDate}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="urgent">
                    {priorityAnnouncements.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">No urgent announcements.</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {priorityAnnouncements.map(announcement => (
                                <AnnouncementCard
                                    key={announcement.id}
                                    announcement={announcement}
                                    isAdmin={isAdmin}
                                    onDelete={deleteAnnouncement}
                                    priorityBadgeColor={priorityBadgeColor}
                                    formatDate={formatDate}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

interface AnnouncementCardProps {
    announcement: Announcement;
    isAdmin: boolean;
    onDelete: (id: string) => void;
    priorityBadgeColor: (priority: string) => string;
    formatDate: (date: string) => string;
}

function AnnouncementCard({ announcement, isAdmin, onDelete, priorityBadgeColor, formatDate }: AnnouncementCardProps) {
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
            {isAdmin && (
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <a href={`/edit-announcement/${announcement.id}`}>Edit</a>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(announcement.id)}>
                        Delete
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}

export default AnnouncementPage;