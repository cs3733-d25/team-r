import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface Notification {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    isRead: boolean;
    type: string;
    sourceId: string;
    expiresAt: string | null;
}

export function Notifications() {
    const { user } = useAuth0();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        if (!user?.email) {
            console.log("No user email available");
            return;
        }

        try {
            setLoading(true);
            console.log("Fetching notifications for:", user.email);
            const response = await axios.post('/api/notifications/user', { email: user.email });
            console.log("Notifications response:", response.data);
            setNotifications(response.data);
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();

        // polling for new notifications every minute
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [user?.email]);

    const markAsRead = async (id: string) => {
        try {
            await axios.put(`/api/notifications/${id}/read`);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, isRead: true } : n
            ));
        } catch (error) {
            console.error('Failed to mark notification as read', error);
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-xs">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="p-2 font-medium border-b">Notifications</div>
                <div className="max-h-80 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-muted-foreground">Loading...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">No notifications</div>
                    ) : (
                        notifications.map(notification => (
                            <DropdownMenuItem
                                key={notification.id}
                                className={`p-3 cursor-pointer border-b ${!notification.isRead ? 'bg-muted/50' : ''}`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="font-medium">{notification.title}</div>
                                    <div className="text-sm text-muted-foreground">{notification.content}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {new Date(notification.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}