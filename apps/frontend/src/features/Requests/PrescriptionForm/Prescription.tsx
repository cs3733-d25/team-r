import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import {PrescriptionForm} from "./PrescriptionForm";
import {PrescriptionPage} from "./PrescriptionPage";

export function Prescription() {
    return(
        <>
            <h1 className="text-3xl font-bold font-trade text-black py-2 pt-6 mb-4 text-center">Prescription Request</h1>
            <Tabs defaultValue="prescriptionForm">
                <TabsList>
                    <TabsTrigger value="prescriptionForm"
                                 >
                        Prescription Request</TabsTrigger>
                    <TabsTrigger value="prescriptionPage"
                                 >
                        View All Requests</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="prescriptionForm">
                        <PrescriptionForm/>
                    </TabsContent>
                    <TabsContent value="prescriptionPage">
                        <PrescriptionPage />
                    </TabsContent>
            </div>
            </Tabs>

        </>
    )
}
export default Prescription;