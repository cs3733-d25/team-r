import {Bar, BarChart, XAxis, YAxis} from "recharts"
import { Pie, PieChart } from "recharts"

import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx"
import {useEffect, useState} from "react";
import {TableCell} from "@/components/ui/table.tsx";
import axios from "axios";

const chartConfig = {
    desktop: {
        label: "count",
        color: "primary",
    }
}satisfies ChartConfig
export function Graphs(requestType:string) {
    const [priorityData, setPriorityData] = useState([])
    const priorityCount:Record<string, number> = {}
    const priorityOrder :{[key:string]:number}={Low:0, Medium:1, High:2, Urgent:3}
    const [locationData, setLocationData] = useState([])
    const locationCount:Record<string, number> = {}

    useEffect(() => {
        retrieveFromDatabase();
    }, []);
    useEffect(() => {
        if(priorityData && locationData) {
            retrieveFromDatabase();
        }
    }, [priorityData,locationData]);


    async function retrieveFromDatabase() {
        let priorityResponse = null
        let locationResponse = null
        switch (requestType) {
            case "Sanitation":
            try
            {
                priorityResponse = await axios.get("/api/sanitation/priority")
                console.log("response from / get", priorityResponse.data)
                locationResponse = await axios.get("/api/sanitation/location")
                console.log("response from / get", locationResponse.data)
            }
            catch
                (error)
            {
                console.log("error in retrieve:", error);
            }
            break;
            case "Device":
                try
                {
                    priorityResponse = await axios.get("/api/devicereq/priority")
                    console.log("response from / get", priorityResponse.data)
                    locationResponse = await axios.get("/api/devicereq/location")
                    console.log("response from / get", locationResponse.data)
                }
                catch
                    (error)
                {
                    console.log("error in retrieve:", error);
                }
                break;
            case "Nonemergent":
                try
                {
                    priorityResponse = await axios.get("/api/patientreq/priority")
                    console.log("response from / get", priorityResponse.data)
                    locationResponse = await axios.get("/api/patientreq/location")
                    console.log("response from / get", locationResponse.data)
                }
                catch
                    (error)
                {
                    console.log("error in retrieve:", error);
                }
                break;
            case "Transport":
                try
                {
                    priorityResponse = await axios.get("/api/transportreq/priority")
                    console.log("response from / get", priorityResponse.data)
                    locationResponse = await axios.get("/api/transportreq/location")
                    console.log("response from / get", locationResponse.data)
                }
                catch
                    (error)
                {
                    console.log("error in retrieve:", error);
                }
                break;
            case "Prescription":
                try
                {
                    priorityResponse = await axios.get("/api/pharmacy/priority")
                    console.log("response from / get", priorityResponse.data)
                    locationResponse = await axios.get("/api/pharmacy/location")
                    console.log("response from / get", locationResponse.data)
                }
                catch
                    (error)
                {
                    console.log("error in retrieve:", error);
                }
                break;
            case "Translate":
                try
                {
                    priorityResponse = await axios.get("/api/translate/priority")
                    console.log("response from / get", priorityResponse.data)
                    locationResponse = await axios.get("/api/translate/location")
                    console.log("response from / get", locationResponse.data)
                }
                catch
                    (error)
                {
                    console.log("error in retrieve:", error);
                }
                break;
        }
        if(priorityResponse!=null){
        setPriorityData(priorityResponse.data)
            }
        if(locationResponse!=null){
            setLocationData(locationResponse.data)
        }


    }

       priorityData.forEach((count)=>{
priorityCount[count] = (priorityCount[count] || 0) + 1;
console.log("priority Count: ",priorityCount);
       })
    const priorityChart = Object.entries(priorityCount).map(([priority,count])=>({
        priority,
            count
    }))
    locationData.forEach((count)=>{
        locationCount[count] = (locationCount[count] || 0) + 1;
    })
    const locationChart = Object.entries(locationCount).map(([location,counts])=>({
        location,
        counts
    }))
    const sortedPriority =[...priorityChart].sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority])
console.log("Priority Chart:",priorityChart);
    return(
        <div className ="h-64 flex flex-col justify-center mt-100 mb-100 w-200 mx-auto">
            <h1 className={"text-center text-2xl"}>Priority</h1>
        <ChartContainer config={chartConfig}>
            <BarChart data={sortedPriority}>
                <ChartTooltip content={<ChartTooltipContent />}>

                </ChartTooltip>
            <Bar dataKey ="count" fill = "#304269">

            </Bar>
                <XAxis
                    dataKey="priority"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                ></XAxis>
                <YAxis
                    dataKey="count"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                ></YAxis>
            </BarChart>
        </ChartContainer>
            <h1 className={"text-center text-2xl"}>Location</h1>
            <ChartContainer config={chartConfig} >
                <BarChart data={locationChart}>
                    <ChartTooltip content={<ChartTooltipContent />}>

                    </ChartTooltip>
                    <Bar dataKey ="counts" fill = "#304269">

                    </Bar>
                    <XAxis
                        dataKey="location"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 21)}

                    ></XAxis>
                    <YAxis
                        dataKey="counts"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    ></YAxis>
                </BarChart>
            </ChartContainer>
        </div>
    )
}


