import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const TranslateRequestForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Card className="max-w-2xl mx-auto mt-8 p-6">
            <CardContent>
                <h2 className="text-2xl font-semibold mb-4">Translator Request Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="requestorName">Requestor Name</Label>
                        <Input id="requestorName" name="requestorName" required />
                    </div>

                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" required />
                    </div>

                    <div>
                        <Label htmlFor="language">Language Needed</Label>
                        <Input id="language" name="language" required />
                    </div>

                    <div>
                        <Label htmlFor="urgency">Urgency</Label>
                        <Select name="urgency" required>
                            <SelectTrigger id="urgency">
                                <SelectValue placeholder="Select urgency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea id="notes" name="notes" rows={4} />
                    </div>

                    <Button type="submit" className="w-full">Submit Request</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default TranslateRequestForm;
