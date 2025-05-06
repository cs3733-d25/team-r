import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';

export interface AnnouncementFormProps {
    initialData?: {
        id: string | number;
        title: string;
        content: string;
        author: string;
        type: 'urgent' | 'general' | 'bulletin';
        expirationDate?: string;
        timestamp: string;
    };
    defaultType?: 'urgent' | 'general' | 'bulletin';
    onSubmit: (data: {
        title: string;
        content: string;
        author: string;
        type: 'urgent' | 'general' | 'bulletin';
        expirationDate?: string;
    }) => Promise<void>;
    isSubmitted?: boolean;
    announcement?: {
        title: string;
        content: string;
        author: string;
        type: string;
        date: string;
        expirationDate?: string;
    } | null;
    onDismiss?: () => void;
    onViewAll?: () => void;
}

export default function AnnouncementForm({ initialData, defaultType, onSubmit, isSubmitted, announcement, onDismiss, onViewAll }: AnnouncementFormProps) {
    const navigate = useNavigate();
    const {user} = useAuth0();
    const [userName, setUserName] = useState('');
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        content: initialData?.content || '',
        author: initialData?.author || '',
        type: initialData?.type || defaultType || 'general',
        expirationDate: initialData?.expirationDate || '',
    });

    // in create mode, fetch current user's name
    useEffect(() => {
        if (!initialData && user) {
            axios
                .post('/api/login/userInfo', { email: user.email })
                .then((res) => setUserName(res.data.firstName));
        }
    }, [initialData, user]);

    useEffect(() => {
        if (!initialData && userName) {
            setFormData(prev => ({...prev, author: userName}))
        }
    }, [initialData, userName]);

    const handleTypeChange = (value: string) => {
        const type = value as 'urgent' | 'general' | 'bulletin';
        setFormData(prev => ({...prev, type}))
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmit({...formData})
    };

    function renderConfirmation() {
        if (!isSubmitted || !announcement) return null;

        return (
            <div className="mt-8 mb-6 rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
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
                    <Label className="text-lg font-semibold mb-2">
                        Your announcement has been published
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="font-semibold">Title:</span>{' '}
                            {announcement.title}
                        </div>
                        <div>
                            <span className="font-semibold">Type:</span>{' '}
                            {announcement.type}
                        </div>
                        <div>
                            <span className="font-semibold">Author:</span>{' '}
                            {announcement.author}
                        </div>
                        <div>
                            <span className="font-semibold">Date:</span>{' '}
                            {new Date(announcement.date).toLocaleString()}
                        </div>
                        {announcement.expirationDate && (
                            <div>
                                <span className="font-semibold">Expires:</span>{' '}
                                {new Date(announcement.expirationDate).toLocaleString()}
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <span className="font-semibold">Content:</span>{' '}
                        <Label className="mt-1 p-2 bg-background/50 rounded">{announcement.content}</Label>
                    </div>
                    <div className="mt-3 text-sm text-secondary-foreground">
                        The announcement has been published and is now visible to all users.
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button
                            onClick={onDismiss}
                            variant="outline"
                        >
                            Dismiss
                        </Button>
                        <Button
                            onClick={onViewAll}
                            variant="default"
                        >
                            View All Announcements
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Create an Announcement</h1>

            <Tabs
            defaultValue={formData.type}
            value={formData.type}
            onValueChange={(value) => handleTypeChange(value)}
            className="mb-6"
        >
            <TabsList className="grid grid-cols-3">
                <TabsTrigger value="urgent" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">Urgent Announcements</TabsTrigger>
                <TabsTrigger value="general" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">General Announcements</TabsTrigger>
                <TabsTrigger value="bulletin" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">Bulletin Announcements</TabsTrigger>
            </TabsList>

            <TabsContent value="urgent" className={"dark:border-gray-600 dark:bg-background"}>{renderForm(true)}</TabsContent>
            <TabsContent value="general" className={"dark:border-gray-600 dark:bg-background"}>{renderForm()}</TabsContent>
            <TabsContent value="bulletin" className={"dark:border-gray-600 dark:bg-background"}>{renderForm(false, true)}</TabsContent>
        </Tabs>
        </>
    );

    function renderForm(isUrgent = false, isBulletin = false) {
        return (
            <>
                <form onSubmit={handleSubmit} className="space-y-6 dark:bg-background">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <Label className="text-sm font-semibold mb-2">
                                Title<span className="text-accent">*</span>
                            </Label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder={`Enter ${isUrgent ? 'urgent alert' : isBulletin ? 'bulletin' : 'announcement'} title`}
                                className={`w-full px-4 py-2 rounded-md border ${
                                    isUrgent
                                        ? 'border-red-500'
                                        : isBulletin
                                          ? 'border-blue-300'
                                          : 'border-border'
                                } bg-input`}
                                required
                            />
                        </div>
                      
                        {/* Expiration */}
                        <div className={'md:col-span-2'}>
                            <Label className="text-sm font-semibold mb-2">
                                Expiration Date
                                <span
                                    className={
                                        isUrgent
                                            ? 'text-accent'
                                            : 'text-xs text-secondary-foreground block'
                                    }
                                >
                                    {isUrgent ? '*' : '(Optional)'}
                                </span>
                            </Label>
                            <Input
                                type="date"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                required={isUrgent}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <Label className="text-sm font-semibold mb-2">
                            Content<span className="text-accent">*</span>
                        </Label>
                        <Textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder={`Enter ${isUrgent ? 'urgent alert' : isBulletin ? 'bulletin' : 'announcement'} content`}
                            // rows={isUrgent ? 4 : 6} // not sure if this is good since it doesn't follow the design
                            className={`w-full px-4 py-2 rounded-md border ${
                                isUrgent
                                    ? 'border-red-500'
                                    : isBulletin
                                      ? 'border-blue-300'
                                      : 'border-border'
                            } bg-input`}
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="unselected"
                            onClick={() => navigate('/announcements')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className={`px-6 py-2 text-white font-medium rounded-md ${
                                isUrgent
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : isBulletin
                                      ? 'bg-blue-500 hover:bg-blue-600'
                                      : 'bg-primary hover:bg-foreground'
                            }`}
                        >
                            {initialData
                                ? 'Save Changes'
                                : `Create ${isUrgent ? 'Urgent Alert' : isBulletin ? 'Bulletin' : 'Announcement'}`}
                        </Button>
                    </div>
                </form>

                {renderConfirmation()}
            </>
        );
    }
}
