import {Tabs, TabsContent, TabsList, TabsTrigger} from '../../../components/ui/tabs.tsx';
import {PrescriptionForm} from "./PrescriptionForm";
import {PrescriptionPage} from "./PrescriptionPage";

export function Prescription() {
    return(
        <>
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Prescription Request System</h1>
            <h2 className="text-xl font-bold font-trade mb-6 place-self-center">Owen Miller & Keagan Hitt</h2>
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