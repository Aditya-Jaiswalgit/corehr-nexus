import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const attendanceData = [
  { month: 'Jul', attendance: 95, target: 90 },
  { month: 'Aug', attendance: 87, target: 90 },
  { month: 'Sep', attendance: 92, target: 90 },
  { month: 'Oct', attendance: 96, target: 90 },
  { month: 'Nov', attendance: 89, target: 90 },
  { month: 'Dec', attendance: 94, target: 90 },
];

const chartConfig = {
  attendance: {
    label: "Attendance %",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Target %",
    color: "hsl(var(--muted-foreground))",
  },
};

export const AttendanceChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Attendance Trend</CardTitle>
          <CardDescription>
            Your attendance percentage over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="var(--color-attendance)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-attendance)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--color-attendance)", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="var(--color-target)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};