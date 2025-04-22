import { NavbarMGH } from '../../../components/NavbarMGH.tsx';
import {Link} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../../../components/ui/tabs.tsx';
import SanitationRequestForm from "@/features/Requests/SanitationForm/SanitationRequestForm.tsx";
import SanitationRequestPage from "@/features/Requests/SanitationForm/SanitationRequestPage.tsx";

function SanitationRequestTabs() {
    return(
        <>
            <NavbarMGH />
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Sanitation Request System</h1>
            <Tabs defaultValue="sanitationRequestForm" >
                <TabsList>
                    <TabsTrigger value="sanitationRequestForm">
                        Sanitation Request Form</TabsTrigger>
                    <TabsTrigger value="sanitationRequestTable">
                        View All Requests</TabsTrigger>
                </TabsList>
                <div >
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