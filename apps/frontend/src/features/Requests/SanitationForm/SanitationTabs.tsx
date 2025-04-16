import { NavbarMGH } from '../../../components/NavbarMGH.tsx';
import {Link} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import SanitationRequestForm from "@/features/Requests/SanitationForm/SanitationRequestForm.tsx";
import SanitationRequestPage from "@/features/Requests/SanitationForm/SanitationRequestPage.tsx";

function SanitationRequestTabs() {
    return(
        <>
            <NavbarMGH />
            <h1 className="text-2xl font-bold mb-5">Sanitation Request System</h1>
            <Tabs defaultValue="sanitationRequestForm" className="items-center justify-center w-full px-50">
                <TabsList className="flex border-b border-gray-300 bg-gray-100 rounded-t-lg relative z-10 flex items-center">
                    <TabsTrigger value="sanitationRequestForm"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 bg-input data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        Sanitation Request Form</TabsTrigger>
                    <TabsTrigger value="sanitationRequestTable"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 bg-input data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        Sanitation Request Table</TabsTrigger>
                </TabsList>
                <div className="relative z-0 -mt-1 border border-gray-300 rounded-b-lg bg-white p-4 mb-10">
                    <TabsContent value="sanitationRequestForm">
                        <SanitationRequestForm/>
                    </TabsContent>
                    <TabsContent value="sanitationRequestTable">
                        <SanitationRequestPage />
                    </TabsContent>
                </div>

            </Tabs>

        </>
    )
}
export default SanitationRequestTabs;