import { NavbarMGH } from '../../../components/NavbarMGH.tsx';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import {PrescriptionForm} from "./PrescriptionForm";
import {PrescriptionPage} from "./PrescriptionPage";

export function Prescription() {
    return(
        <>
            <NavbarMGH />
            <Tabs defaultValue="prescriptionForm" className="w-full">
                <TabsList className="flex border-b border-gray-300 bg-white rounded-t-lg relative z-10">
                    <TabsTrigger value="prescriptionForm"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 border border-b-transparent data-[state=active]:bg-background data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        Prescription Request</TabsTrigger>
                    <TabsTrigger value="prescriptionPage"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 border border-b-transparent data-[state=active]:bg-background data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        All Requests</TabsTrigger>
                </TabsList>
                <div className="relative z-0 -mt-1 border border-gray-300 rounded-b-lg bg-background p-4">
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