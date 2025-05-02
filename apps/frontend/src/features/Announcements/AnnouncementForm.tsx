import {useEffect, useState} from 'react';
import axios from 'axios';
import {Label} from '@/components/ui/label.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import Dropdown from "@/components/Dropdowns/Dropdown.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ErrorCard} from "@/components/ServiceRequests/ErrorCard.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';

interface SubmittedAnnouncement {
    title: string;
    content: string;
    author: string;
    priority: string;
    type: string;
    expirationDate?: string;
    timestamp: string;
}

export const AnnouncementForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        priority: '',
        type: 'general',
        expirationDate: ''
    });

    //use auth0 to get the current user data
    const [userName, setUserName] = useState('');
    const {user} = useAuth0();

    //get the username from the database
    useEffect(() => {
        async function getEmployeeName(){
            const userName = await axios.post('/api/login/userInfo',
                {email: user!.email});
            setUserName(userName.data.firstName);
        }
        getEmployeeName();
    }, [user]);

    //set the form data with the username from the database
    useEffect(() => {
        if (userName) {
            setFormData(prev => ({
                ...prev,
                author: userName
            }));
        }
    }, [userName]);

    const [submitStatus, setSubmitStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

    //reset dropdowns on submit
    const [resetDropdowns, setResetDropdowns] = useState(false);

    //submittedAnnouncement holds info for confirmation card
    const [submittedAnnouncement, setSubmittedAnnouncement] = useState<SubmittedAnnouncement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null);

        try {
            const response = await axios.post('/api/announcements/', {
                ...formData,
                priority: formData.priority.toString(),
            });

            if (response.status === 201) {
                setSubmittedAnnouncement({
                    ...formData,
                    timestamp: new Date().toLocaleString(),
                });

                setSubmitStatus({
                    message: 'Announcement created successfully!',
                    isError: false,
                });

                setResetDropdowns(!resetDropdowns);

                setFormData({
                    title: '',
                    content: '',
                    author: userName,
                    priority: '',
                    type: formData.type,
                    expirationDate: ''
                });
            }
        } catch (error) {
            console.error('Error submitting announcement', error);
            setSubmitStatus({
                message: 'Failed to create announcement. Please try again.',
                isError: true,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDropdownChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTypeChange = (value: string) => {
        setFormData(prev => {
           const updatedData = {
               ...prev,
                type: value
           };

           if (value === 'urgent') {
               updatedData.priority = 'High';
           } else if (value === 'bulletin') {
               updatedData.priority = 'Low';
           }

           return updatedData;
        });
    };

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="rounded-lg mt-3">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-center mb-6">Create Announcement</h1>

                        <Tabs defaultValue="general" value={formData.type} onValueChange={handleTypeChange} className="mb-6">
                            <TabsList className="grid grid-cols-3">
                                <TabsTrigger value="urgent">Urgent Announcements</TabsTrigger>
                                <TabsTrigger value="general">General Announcements</TabsTrigger>
                                <TabsTrigger value="bulletin">Bulletin Announcements</TabsTrigger>
                            </TabsList>

                            <TabsContent value="urgent" className="border-2 border-red-500 p-4 rounded-b-lg">
                                <div className="bg-red-100 p-3 mb-4 rounded-mb text-red-800">
                                    <strong>Important:</strong> Urgent announcements are highly visible and should only be used for critical information.
                                </div>
                                {renderForm(true)}
                            </TabsContent>

                            <TabsContent value="general">
                                {renderForm(false)}
                            </TabsContent>

                            <TabsContent value="bulletin" className="border-2 border-blue-300 p-4 rounded-b-lg">
                                <div className="bg-blue-100 p-3 mb-4 rounded-md text-blue-800">
                                    <strong>Note:</strong> Bulletin board items are for general information and updates.
                                </div>
                                {renderForm(false, true)}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            {submitStatus && submitStatus.isError && (
                <ErrorCard message={submitStatus.message} />
            )}


            {submittedAnnouncement && !submitStatus?.isError && (
                <div className="mb-6 rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
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
                        {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Announcement Created
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Your announcement has been created successfully
                        </h3>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                            <div>
                                <span className="font-semibold">Title:</span>{' '}
                                {submittedAnnouncement.title}
                            </div>
                            <div>
                                <span className="font-semibold">Type:</span>{' '}
                                {submittedAnnouncement.type.charAt(0).toUpperCase() + submittedAnnouncement.type.slice(1)}
                            </div>
                            <div>
                                <span className="font-semibold">Priority:</span>{' '}
                                {submittedAnnouncement.priority}
                            </div>
                            <div>
                                <span className="font-semibold">Author:</span>{' '}
                                {submittedAnnouncement.author}
                            </div>
                            {submittedAnnouncement.expirationDate && (
                                <div>
                                    <span className="font-semibold">Expires:</span>{' '}
                                    {submittedAnnouncement.expirationDate}
                                </div>
                            )}
                            <div>
                                <span className="font-semibold">Content:</span>{' '}
                                <p className="mt-1 whitespace-pre-wrap">{submittedAnnouncement.content}</p>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-4">
                            <Button
                                onClick={() => navigate('/announcements')}
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition duration-200"
                            >
                                View All Announcements
                            </Button>
                            <Button
                                onClick={() => setSubmittedAnnouncement(null)}
                                className="px-4 py-2 bg-secondary text-foreground rounded hover:bg-secondary-foreground transition duration-200"
                            >
                                Create Another
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    function renderForm(isUrgent = false, isBulletin = false) {
        return (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* title */}
                    <div className="md:col-span-2">
                        <Label className="block text-sm font-semibold text-foreground mb-2">
                            Title
                            <span className="text-accent">*</span>
                        </Label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder={`Enter ${isUrgent ? 'urgent alert' : isBulletin ? 'bulletin' : 'announcement'} title`}
                            className={`w-full px-4 py-2 rounded-md border ${isUrgent ? 'border-red-500' : isBulletin ? 'border-blue-300' : 'border-border'} bg-input`}
                            required
                        />
                    </div>

                    {/* priority - only show if not urgent or bulletin */}
                    {!isUrgent && !isBulletin && (
                        <div>
                            <Label className="block text-sm font-semibold text-foreground mb-2">
                                Priority Level
                                <span className="text-accent">*</span>
                            </Label>
                            <Dropdown
                                tableName={"priority"}
                                fieldName={"priority"}
                                onChange={handleDropdownChange}
                                reset={resetDropdowns}
                            />
                        </div>
                    )}

                    {/* expiration */}
                    <div className={!isUrgent && !isBulletin ? "" : "md:col-span-2"}>
                        <Label className="block text-sm font-semibold text-foreground mb-2">
                            Expiration Date
                            <span className={isUrgent ? "text-accent" : "text-xs text-secondary-foreground block"}>
                                {isUrgent ? "*" : "Optional: When this announcement should expire"}
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
                    <Label className="block text-sm font-semibold text-foreground mb-2">
                        Content
                        <span className="text-accent">*</span>
                    </Label>
                    <Textarea
                        name="content"
                        value={formData.content}
                        onChange={handleTextAreaChange}
                        placeholder={`Enter ${isUrgent ? 'urgent alert' : isBulletin ? 'bulletin' : 'announcement'} content`}
                        rows={isUrgent ? 4 : 6}
                        className={`w-full px-4 py-2 rounded-md border ${isUrgent ? 'border-red-500' : isBulletin ? 'border-blue-300' : 'border-border'} bg-input`}
                        required
                    />
                </div>

                {/* submit */}
                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/announcements')}
                        className="px-6 py-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className={`px-6 py-2 text-white font-medium rounded-md transition duration-200 ${
                            isUrgent ? 'bg-red-600 hover:bg-red-700' :
                                isBulletin ? 'bg-blue-500 hover:bg-blue-600' :
                                    'bg-primary hover:bg-foreground'
                        }`}
                    >
                        Create {isUrgent ? 'Urgent Alert' : isBulletin ? 'Bulletin' : 'Announcement'}
                    </Button>
                </div>
            </form>
        );
    }
};

export default AnnouncementForm;