import { Bar, BarChart } from "recharts"
import { Pie, PieChart } from "recharts"

import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import {useEffect, useState} from "react";
import {TableCell} from "@/components/ui/table.tsx";
import axios from "axios";
interface SanitationGraphProps {
    sanitation: {
        priority: string,
    }[]
}
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    }
}satisfies ChartConfig
export function SanitationGraphs(props: SanitationGraphProps) {
    const [priorityData, setPriorityData] = useState([{}])

    {props.sanitation.map((sanitation) => {
        setPriorityData((prev)=>[...prev, sanitation])
    })}
    console.log("priority data: ",priorityData)
    return(
        <ChartContainer config={chartConfig}>
            <BarChart data={priorityData}>
            <Bar dataKey ="desktop">
                <ChartTooltip content={<ChartTooltipContent />}>

                </ChartTooltip>
            </Bar>
            </BarChart>
        </ChartContainer>
    )
}

