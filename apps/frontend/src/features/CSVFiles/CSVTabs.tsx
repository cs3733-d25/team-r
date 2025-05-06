import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CSVPage from "@/features/CSVFiles/CSVPage.tsx";
import CSVTablePage from "@/features/CSVFiles/CSVTable.tsx";
import { TOUR_STEPS_IDS_CSV } from '@/lib/tour-constants.ts';
import {Label} from "@/components/ui/label";

function CSVTabPage() {
    return(
        <div className="container mx-auto pt-12 pb-8">
            <Label className="text-3xl font-bold mb-2 justify-center" id={TOUR_STEPS_IDS_CSV.CLICK_START}>
                Import/Export CSV Files
            </Label>

            <Tabs defaultValue="CSVPage" className={"py-5"}>
                <TabsList>
                    <TabsTrigger value="CSVPage" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">
                        Import/Export CSV</TabsTrigger>
                    <TabsTrigger value="CSVTable" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"
                                 id={TOUR_STEPS_IDS_CSV.VIEW_DB_TABLE}>
                        View DB Table</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="CSVPage" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">
                        <CSVPage/>
                    </TabsContent>
                    <TabsContent value="CSVTable" className="border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300">
                        <CSVTablePage />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
export default CSVTabPage;