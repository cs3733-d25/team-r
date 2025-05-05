import React, {useState, useEffect } from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {useNavigate, useSearchParams} from 'react-router-dom';
import axios from 'axios';
import {TourAlertDialog, TourStep, useTour} from "@/components/tour.tsx";
import {TOUR_STEPS_IDS_ANNS} from "@/lib/tour-constants.ts";
import {Calendar} from "@/components/ui/calendar.tsx";
import Dashboard from "@/features/calendar/calendarDashboard.tsx";

interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    type: 'urgent' | 'general' | 'bulletin';
    expirationDate?: string;
}

export function AnnouncementPage({ defaultTab }: { defaultTab?: string }) {
    const [searchParams] = useSearchParams();
    const paramTab = searchParams.get('tab') as 'overview' | 'all' | 'urgent' | 'general' | 'bulletin' | null;
    const [activeTab, setActiveTab] = useState(paramTab ?? defaultTab ?? 'overview');
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const navigate = useNavigate();
    const [searchTerm] = useState('');
    const {setSteps} = useTour();
    const [openTour, setOpenTour] = useState(true);

    useEffect(() => {
        const p = searchParams.get('tab');
        if (p) setActiveTab(p as typeof activeTab);
    }, [searchParams]);

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

    const filtered = announcements.filter((a) =>
        [a.title, a.content].some((text) =>
            text.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const announcementCategories = [
        {
            name: 'Urgent',
            description: 'Critical hospital announcements that require immediate attention',
            tab: 'urgent' as const,
            filter: (a: Announcement) => a.type === 'urgent',
        },
        {
            name: 'General',
            description: 'Regular hospital updates and information',
            tab: 'general' as const,
            filter: (a: Announcement) => a.type === 'general',
        },
        {
            name: 'Bulletin',
            description: 'Non-critical hospital information and updates',
            tab: 'bulletin' as const,
            filter: (a: Announcement) => a.type === 'bulletin',
        },
    ];

    const typeBadgeColor = (type: string) => {
        switch (type) {
            case 'urgent':
                return 'bg-red-500 hover:bg-red-600';
            case 'general':
                return 'bg-yellow-500 hover:bg-yellow-600';
            case 'bulletin':
                return 'bg-blue-500 hover:bg-blue-600';
            default:
                return '';
        }
    };

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    //tour component steps
    const steps: TourStep[] = [
        { content: <div>On this page you can create and view hospital announcements.</div>, selectorId: TOUR_STEPS_IDS_ANNS.CLICK_START, position: "bottom" },
        { content: <div>Click on this button to be taken to a page where you can create an announcement. </div>, selectorId: TOUR_STEPS_IDS_ANNS.CREATE, position: "bottom" },
        { content: <div>Click on this tab to view all current announcements.</div>, selectorId: TOUR_STEPS_IDS_ANNS.ALL, position: "right" },
        { content: <div>Click on any of the remaining tabs to view specific types of announcements.</div>, selectorId: TOUR_STEPS_IDS_ANNS.TYPES, position: "right" },
    ];

    //tour displaying
    useEffect(() => {
        setSteps(steps);

        // check if user has already seen the tour
        const hasSeenTour = localStorage.getItem('hasSeenCSVTour') === 'true';

        if (!hasSeenTour) {
            const timer = setTimeout(() => {
                setOpenTour(true);
                // mark that user has seen the tour
                localStorage.setItem('hasSeenCSVTour', 'true');
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [setSteps]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto pt-12 pb-8">
                <div className="relative mb-6">
                    <h1
                        className="text-3xl font-bold mb-6 text-center"
                        id={TOUR_STEPS_IDS_ANNS.CLICK_START}
                    >
                        Hospital Announcements Dashboard
                    </h1>

                    <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as 'overview' | 'all' | 'urgent' | 'general' | 'bulletin')} className="w-full">
                        <TabsList className="mb-0 border-l border-gray-300 shadow-none">
                            <TabsTrigger value="overview" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">Overview</TabsTrigger>
                            <TabsTrigger value="all" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300" id={TOUR_STEPS_IDS_ANNS.ALL}>
                                All Announcements
                            </TabsTrigger>
                            {announcementCategories.map((cat) => (
                                <TabsTrigger key={cat.tab} value={cat.tab} id={TOUR_STEPS_IDS_ANNS.TYPES}  className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">
                                    {cat.name}
                                </TabsTrigger>
                            ))}
                            <TabsTrigger value="calendar" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">
                                Calendar
                            </TabsTrigger>
                        </TabsList>

                        {/* Overview */}
                        <TabsContent value="overview" className="space-y-6 dark:border-grey-600 dark:bg-background">

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {announcementCategories.map((cat) => (
                                    <Card
                                        key={cat.tab}
                                        className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-primary"
                                    >
                                        <CardHeader className="text-primary-foreground bg-primary rounded-t-lg px-6">
                                            <CardTitle>{cat.name} Announcements</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6 px-6 pb-6 bg-white h-full flex flex-col dark:border-gray-600 dark:bg-background">
                                            <p className="text-muted-foreground mb-4 min-h-[3rem]">
                                                {cat.description}
                                            </p>
                                            <div className="flex flex-col space-y-2 mt-auto">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => setActiveTab(cat.tab)}
                                                >
                                                    View {cat.name} Announcements
                                                </Button>
                                                <Button onClick={() => navigate(`/announcementform?type=${cat.tab}`)} id={TOUR_STEPS_IDS_ANNS.CREATE}>
                                                    Create New Announcement
                                                </Button>
                                            </div>

                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* All */}
                        <TabsContent value="all" className="dark:bg-background dark:border-grey-600">
                            {filtered.length === 0 ? (
                                <p className="text-center py-8 text-gray-500">
                                    No announcements found.
                                </p>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filtered.map((ann) => (
                                        <AnnouncementCard
                                            key={ann.id}
                                            announcement={ann}
                                            onDelete={deleteAnnouncement}
                                            badgeColor={typeBadgeColor}
                                            formatDate={formatDate}
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Type-specific */}
                        {announcementCategories.map((cat) => (
                            <TabsContent key={cat.tab} value={cat.tab} className="dark:bg-background dark:border-grey-600">
                                {filtered.filter(cat.filter).length === 0 ? (
                                    <p className="text-center py-8 text-gray-500">
                                        No {cat.name.toLowerCase()} announcements found.
                                    </p>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {filtered.filter(cat.filter).map((ann) => (
                                            <AnnouncementCard
                                                key={ann.id}
                                                announcement={ann}
                                                onDelete={deleteAnnouncement}
                                                badgeColor={typeBadgeColor}
                                                formatDate={formatDate}
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                        <TabsContent value="calendar" className="dark:bg-background dark:border-grey-600">
                            <div className="flex flex-col lg:flex-row gap-6 justify-center">
                                {/*/!* Left Side: Matching Announcements *!/*/}
                                {/*<div className="flex-1">*/}
                                {/*    <h2 className="text-lg font-semibold mb-4 text-center lg:text-left">*/}
                                {/*        Announcements for {selectedDate ? formatDate(selectedDate.toISOString()) : "Selected Date"}*/}
                                {/*    </h2>*/}
                                {/*    {selectedDate ? (*/}
                                {/*        filtered.filter(a => {*/}
                                {/*            return a.expirationDate &&*/}
                                {/*                new Date(a.expirationDate).toDateString() === selectedDate.toDateString();*/}
                                {/*        }).length > 0 ? (*/}
                                {/*            <div className="grid gap-4">*/}
                                {/*                {filtered.filter(a => {*/}
                                {/*                    return a.expirationDate &&*/}
                                {/*                        new Date(a.expirationDate).toDateString() === selectedDate.toDateString();*/}
                                {/*                }).map(ann => (*/}
                                {/*                    <AnnouncementCard*/}
                                {/*                        key={ann.id}*/}
                                {/*                        announcement={ann}*/}
                                {/*                        onDelete={deleteAnnouncement}*/}
                                {/*                        badgeColor={typeBadgeColor}*/}
                                {/*                        formatDate={formatDate}*/}
                                {/*                    />*/}
                                {/*                ))}*/}
                                {/*            </div>*/}
                                {/*        ) : (*/}
                                {/*            <p className="text-center text-gray-500">No announcements for this date.</p>*/}
                                {/*        )*/}
                                {/*    ) : (*/}
                                {/*        <p className="text-center text-gray-500">Select a date to view announcements.</p>*/}
                                {/*    )}*/}
                                {/*</div>*/}

                                {/*/!* Right Side: Calendar *!/*/}
                                {/*<div className="flex justify-center">*/}
                                {/*    <Calendar selected={selectedDate} onSelect={setSelectedDate} />*/}
                                {/*</div>*/}
                                <Dashboard></Dashboard>
                            </div>
                        </TabsContent>

                    </Tabs>

                    <TourAlertDialog isOpen={openTour} setIsOpen={setOpenTour} />
                </div>
            </div>
        </div>
    );
}

interface AnnouncementCardProps {
    announcement: Announcement;
    onDelete: (id: string) => void;
    badgeColor: (type: string) => string;
    formatDate: (date: string) => string;
}

function AnnouncementCard({announcement, onDelete, badgeColor, formatDate}: AnnouncementCardProps) {
    return (
        <Card className="border-gray-200">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    <Badge className={badgeColor(announcement.type)}>
                        {announcement.type.charAt(0).toUpperCase() +
                            announcement.type.slice(1)}
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
                <Button variant="destructive" size="sm" onClick={() => onDelete(announcement.id)}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}