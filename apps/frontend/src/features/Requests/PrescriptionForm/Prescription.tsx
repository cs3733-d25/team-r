import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import {PrescriptionForm} from "./PrescriptionForm";
import {PrescriptionPage} from "./PrescriptionPage";
import {Graphs} from "@/features/Requests/Graphs.tsx";

export function Prescription() {
    return(
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Prescription Request</h1>
            <Tabs defaultValue="prescriptionForm">
                <TabsList>
                    <TabsTrigger value="prescriptionForm" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}
                                 >
                        Prescription Request</TabsTrigger>
                    <TabsTrigger value="prescriptionPage" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}
                                 >
                        View All Requests</TabsTrigger>
                    <TabsTrigger value="prescriptionGraphs"
                    >
                        View Graphs</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="prescriptionForm" className="dark:bg-background dark:border-gray-600">
                        <PrescriptionForm/>
                    </TabsContent>
                    <TabsContent value="prescriptionPage" className="dark:bg-background dark:border-gray-600">
                        <PrescriptionPage />
                    </TabsContent>
                    <TabsContent value="prescriptionGraphs">
                        <Graphs requestType="Prescription"/>
                    </TabsContent>
            </div>
            </Tabs>

        </>
    )
}
export default Prescription;