import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CSVPage from "@/features/CSVFiles/CSVPage.tsx";
import CSVTablePage from "@/features/CSVFiles/CSVTable.tsx";

function CSVTabPage() {
    return(
        <>
            <Tabs defaultValue="CSVPage" className={"py-5"}>
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