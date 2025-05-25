"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  visitors: {
    label: "Filings",
  },
  regular: {
    label: "Regular",
    color: "hsl(var(--chart-2))",
  },
  composition: {
    label: "Composition",
    color: "hsl(var(--chart-3))",
  }
}

export function PieComponent({ regular, composition }) {

  const chartData = [
    { browser: "regular", visitors: regular, fill: "#E4BDA9" },
    { browser: "composition", visitors: composition, fill: "#DE999F" },
  ]

  return (
    <Card className="flex flex-col rounded-4xl bg-gradient-to-tr from-[#F1765B] to-[#F25CA0] text-[#EEECE8]">
      <CardHeader className="items-center pb-0">
        <CardTitle className=' text-2xl'>Pie Chart</CardTitle>
        <CardDescription className='text-neutral-300'>This chart shows the filing preference of Customers</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background pointer-events-none"
                stroke="none"
                fontSize={16}
                formatter={(value) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
