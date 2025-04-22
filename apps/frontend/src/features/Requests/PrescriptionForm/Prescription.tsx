import { NavbarMGH } from '@/components/NavBarMGH/NavbarMGH.tsx';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import {PrescriptionForm} from "./PrescriptionForm";
import {PrescriptionPage} from "./PrescriptionPage";

export function Prescription() {
    return(
        <>
            <NavbarMGH />
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Prescription Request System</h1>
            <h2 className="text-xl font-bold font-trade mb-6 place-self-center">Owen Miller & Keagan Hitt</h2>
            <Tabs defaultValue="prescriptionForm" className="items-center justify-center w-full px-50">
                <TabsList className="flex bg-hidden rounded-t-lg relative z-10">
                    <TabsTrigger value="prescriptionForm"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 bg-input data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        Prescription Request</TabsTrigger>
                    <TabsTrigger value="prescriptionPage"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 bg-input data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        All Requests</TabsTrigger>
                </TabsList>
                <div className={"mb-6"}>
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