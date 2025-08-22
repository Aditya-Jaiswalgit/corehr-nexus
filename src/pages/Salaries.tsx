import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Download, Eye, Calendar, TrendingUp, Calculator, FileText, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { getSalariesByEmployee, mockSalaries, mockUsers } from '@/lib/mockData';
import { StatsCard } from '@/components/dashboard/StatsCard';

export const Salaries: React.FC = () => {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEmployee, setSelectedEmployee] = useState(user?.role === 'admin' ? 'all' : user?.id || '');

  const salaryRecords = user?.role === 'admin' && selectedEmployee === 'all' 
    ? mockSalaries 
    : getSalariesByEmployee(selectedEmployee);

  const yearRecords = salaryRecords.filter(record => record.year === selectedYear);
  
  const currentEmployee = selectedEmployee === 'all' ? null : mockUsers.find(u => u.id === selectedEmployee);
  
  // Calculate stats
  const totalPaid = yearRecords.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.netSalary, 0);
  const totalPending = yearRecords.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.netSalary, 0);
  const avgSalary = yearRecords.length > 0 ? totalPaid / yearRecords.filter(r => r.status === 'paid').length : 0;
  
  const getStatusBadge = (status: string) => {
    return status === 'paid' 
      ? <Badge className="bg-success text-success-foreground">Paid</Badge>
      : <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Salary Management</h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' 
              ? 'Manage employee salaries and payroll' 
              : 'View your salary details and payment history'
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Payroll
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Slip
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user?.role === 'admin' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Employee</label>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Employees</SelectItem>
                      {mockUsers.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name} - {employee.employeeId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-gradient-primary">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Paid"
          value={formatCurrency(totalPaid)}
          description="This year"
          icon={DollarSign}
          delay={0.2}
        />
        <StatsCard
          title="Pending Amount"
          value={formatCurrency(totalPending)}
          description="Upcoming payments"
          icon={Calendar}
          delay={0.3}
        />
        <StatsCard
          title="Average Salary"
          value={formatCurrency(avgSalary)}
          description="Monthly average"
          icon={Calculator}
          delay={0.4}
        />
        <StatsCard
          title="Annual Growth"
          value="8.5%"
          description="Year over year"
          icon={TrendingUp}
          trend={{ value: 8.5, isPositive: true }}
          delay={0.5}
        />
      </div>

      {/* Current Employee Details (for single employee view) */}
      {currentEmployee && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Employee Salary Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Employee Name</p>
                  <p className="text-lg font-semibold">{currentEmployee.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                  <p className="text-lg font-semibold">{currentEmployee.employeeId}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Base Salary</p>
                  <p className="text-lg font-semibold">{formatCurrency(currentEmployee.salary)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Department</p>
                  <p className="text-lg font-semibold">{currentEmployee.department}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Designation</p>
                  <p className="text-lg font-semibold">{currentEmployee.designation}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Joining Date</p>
                  <p className="text-lg font-semibold">
                    {new Date(currentEmployee.joiningDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Salary Records Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Salary Records - {selectedYear}</CardTitle>
            <CardDescription>
              Detailed monthly salary breakdown and payment history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {user?.role === 'admin' && <TableHead>Employee</TableHead>}
                    <TableHead>Month</TableHead>
                    <TableHead>Base Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearRecords.map((record) => {
                    const employee = mockUsers.find(u => u.id === record.employeeId);
                    return (
                      <TableRow key={record.id}>
                        {user?.role === 'admin' && (
                          <TableCell>
                            <div>
                              <p className="font-medium">{employee?.name}</p>
                              <p className="text-sm text-muted-foreground">{employee?.employeeId}</p>
                            </div>
                          </TableCell>
                        )}
                        <TableCell className="font-medium">{record.month}</TableCell>
                        <TableCell>{formatCurrency(record.basicSalary)}</TableCell>
                        <TableCell className="text-success">+{formatCurrency(record.allowances)}</TableCell>
                        <TableCell className="text-destructive">-{formatCurrency(record.deductions)}</TableCell>
                        <TableCell className="font-bold">{formatCurrency(record.netSalary)}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions for Admin */}
      {user?.role === 'admin' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Perform common payroll operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col gap-2 bg-gradient-primary">
                  <Calculator className="h-6 w-6" />
                  <span>Process Payroll</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Generate Reports</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <DollarSign className="h-6 w-6" />
                  <span>Salary Adjustments</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};