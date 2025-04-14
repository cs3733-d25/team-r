import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import MedDeviceDropdown from "./MedDeviceDropdown.tsx";
import PriorityRequest from "../../../components/PriorityRequest.tsx";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form.tsx";

interface DeviceRequest {
    selectDevice: string;
    priority: string;
    room: string;
    department: string;
    timestamp: string;
    comment: string;
}

const DeviceReqForm: React.FC = () => {
    const [submittedData, setSubmittedData] = useState<DeviceRequest | null>(null)
    const form = useForm<DeviceRequest>({
        defaultValues: {
            selectDevice: "",
            priority: "",
            room: "",
            department: "",
            comment: "",
        },
    })

    const { setValue, watch, handleSubmit } = form;

    useEffect(() => {
        const savedDevice = localStorage.getItem("dropdownValue") || ""
        setValue("selectDevice", savedDevice)
    }, [setValue])

    const onSubmit = (data: Omit<DeviceRequest, "timestamp">) => {
        const timestamp = new Date().toLocaleString()
        setSubmittedData({ ...data, timestamp })
        form.reset()
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Medical Device Request</h2>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <MedDeviceDropdown
                        selectedValue={watch("selectDevice")}
                        onChange={(value) => setValue("selectDevice", value)}
                    />

                    <PriorityRequest
                        selectedValue={watch("priority")}
                        onChange={(value) => setValue("priority", value)}
                    />

                    <FormField
                        control={form.control}
                        name="room"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Room</FormLabel>
                                <FormControl>
                                    <input {...field} className="border p-1 rounded w-full bg-input" required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                    <input {...field} className="border p-1 rounded w-full bg-input" required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Additional Comment(s)</FormLabel>
                                <FormControl>
                                    <input {...field} className="border p-1 rounded w-full bg-input" required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </Form>

            {submittedData && (
                <div className="mt-4 p-2 border rounded bg-gray-100">
                    <h3 className="text-lg font-semibold">
                        Submitted Device Request For: {submittedData.selectDevice}
                    </h3>
                    <p>Priority Level: {submittedData.priority}</p>
                    <p>Room: {submittedData.room}</p>
                    <p>Department: {submittedData.department}</p>
                    <p>Request sent at: {submittedData.timestamp}</p>
                    <p>Comment(s): {submittedData.comment}</p>
                </div>
            )}
        </div>
    )
};

export default DeviceReqForm;