import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const salaryData = [
  { month: 'Jul', salary: 65000, bonus: 5000 },
  { month: 'Aug', salary: 65000, bonus: 3000 },
  { month: 'Sep', salary: 65000, bonus: 7000 },
  { month: 'Oct', salary: 67000, bonus: 4000 },
  { month: 'Nov', salary: 67000, bonus: 6000 },
  { month: 'Dec', salary: 67000, bonus: 8000 },
];

const chartConfig = {
  salary: {
    label: "Base Salary",
    color: "hsl(var(--primary))",
  },
  bonus: {
    label: "Bonus & Allowances",
    color: "hsl(var(--success))",
  },
};

export const SalaryChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Salary Breakdown</CardTitle>
          <CardDescription>
            Monthly salary and bonus distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="salary" 
                  fill="var(--color-salary)" 
                  radius={[0, 0, 4, 4]}
                />
                <Bar 
                  dataKey="bonus" 
                  fill="var(--color-bonus)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};