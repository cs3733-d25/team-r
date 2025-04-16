import {NavbarMGH} from "@/components/NavbarMGH.tsx";
import {Link} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CSVPage from "@/features/CSVFiles/CSVPage.tsx";
import CSVTablePage from "@/features/CSVFiles/CSVTable.tsx";

function CSVTabPage() {
    return(
        <>
            <NavbarMGH />
            <Tabs defaultValue="CSVPage">
                <TabsList>
                    <TabsTrigger value="CSVPage"
                                 >
                        Import/Export CSV</TabsTrigger>
                    <TabsTrigger value="CSVTable"
                                 >
                        View DB Table</TabsTrigger>
                </TabsList>
                <div >
                    <TabsContent value="CSVPage">
                        <CSVPage/>
                    </TabsContent>
                    <TabsContent value="CSVTable">
                        <CSVTablePage />
                    </TabsContent>
                </div>

            </Tabs>

        </>
    )
}
export default CSVTabPage;