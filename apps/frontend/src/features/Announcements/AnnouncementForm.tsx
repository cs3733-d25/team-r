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
}

export default function AnnouncementForm({ initialData, defaultType, onSubmit }: AnnouncementFormProps) {
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

    return (
        <Tabs
            defaultValue={formData.type}
            value={formData.type}
            onValueChange={(value) => handleTypeChange(value)}
            className="mb-6"
        >
            <TabsList className="grid grid-cols-3">
                <TabsTrigger value="urgent">Urgent Announcements</TabsTrigger>
                <TabsTrigger value="general">General Announcements</TabsTrigger>
                <TabsTrigger value="bulletin">Bulletin Announcements</TabsTrigger>
            </TabsList>

            <TabsContent value="urgent">{renderForm(true)}</TabsContent>
            <TabsContent value="general">{renderForm()}</TabsContent>
            <TabsContent value="bulletin">{renderForm(false, true)}</TabsContent>
        </Tabs>
    );

    function renderForm(isUrgent = false, isBulletin = false) {
        return (
            <>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <div className={!isUrgent && !isBulletin ? '' : 'md:col-span-2'}>
                            <Label className="text-sm font-semibold mb-2">
                                Expiration Date
                                <span
                                    className={
                                        isUrgent
                                            ? 'text-accent'
                                            : 'text-xs text-secondary-foreground block'
                                    }
                                >
                                    {isUrgent ? '*' : 'Optional'}
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
                            rows={isUrgent ? 4 : 6}
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
                            variant="outline"
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
            </>
        );
    }
}
