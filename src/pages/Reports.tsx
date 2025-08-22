import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Download, Filter, Calendar, Users, 
  DollarSign, Clock, FileText, TrendingUp, Eye, RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsers, mockAttendance, mockSalaries } from '@/lib/mockData';
import { StatsCard } from '@/components/dashboard/StatsCard';

const reportTypes = [
  {
    id: 'attendance',
    name: 'Attendance Report',
    description: 'Employee attendance summary and details',
    icon: Clock,
    category: 'HR'
  },
  {
    id: 'salary',
    name: 'Salary Report',
    description: 'Payroll and salary distribution',
    icon: DollarSign,
    category: 'Finance'
  },
  {
    id: 'employee',
    name: 'Employee Report',
    description: 'Employee information and statistics',
    icon: Users,
    category: 'HR'
  },
  {
    id: 'performance',
    name: 'Performance Report',
    description: 'Employee performance metrics',
    icon: TrendingUp,
    category: 'Management'
  }
];

export const Reports: React.FC = () => {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedEmployee, setSelectedEmployee] = useState('all');

  // Calculate some basic stats for the reports
  const totalEmployees = mockUsers.length;
  const totalAttendanceRecords = mockAttendance.length;
  const totalSalaryRecords = mockSalaries.length;
  
  // Get current month attendance stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthAttendance = mockAttendance.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
  });
  
  const attendanceStats = {
    totalDays: currentMonthAttendance.length,
    presentDays: currentMonthAttendance.filter(r => r.status === 'present').length,
    lateDays: currentMonthAttendance.filter(r => r.status === 'late').length,
    absentDays: currentMonthAttendance.filter(r => r.status === 'absent').length,
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate and download the actual report
    console.log('Generating report:', { selectedReport, selectedPeriod, selectedEmployee });
  };

  const handleExportReport = (format: string) => {
    // In a real app, this would export in the specified format
    console.log('Exporting report in format:', format);
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
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate comprehensive reports and analyze organizational data
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
          <Button className="gap-2 bg-gradient-primary" onClick={handleGenerateReport}>
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Report Types Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {reportTypes.map((report, index) => (
          <Card 
            key={report.id} 
            className={`shadow-card cursor-pointer transition-all duration-300 hover:shadow-elegant ${
              selectedReport === report.id ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <CardContent className="p-6 text-center">
              <report.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{report.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{report.description}</p>
              <Badge variant="outline">{report.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Report Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Report Configuration
            </CardTitle>
            <CardDescription>
              Configure your report parameters and filters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((report) => (
                      <SelectItem key={report.id} value={report.id}>
                        {report.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="current-quarter">Current Quarter</SelectItem>
                    <SelectItem value="current-year">Current Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Employee</label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    {mockUsers.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-gradient-primary" onClick={handleGenerateReport}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={totalEmployees}
          description="Active employees"
          icon={Users}
          delay={0.3}
        />
        <StatsCard
          title="Attendance Records"
          value={totalAttendanceRecords}
          description="Total records"
          icon={Clock}
          delay={0.4}
        />
        <StatsCard
          title="Salary Records"
          value={totalSalaryRecords}
          description="Total processed"
          icon={DollarSign}
          delay={0.5}
        />
        <StatsCard
          title="Reports Generated"
          value="47"
          description="This month"
          icon={FileText}
          delay={0.6}
        />
      </div>

      {/* Report Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Report Preview - {reportTypes.find(r => r.id === selectedReport)?.name}</CardTitle>
                <CardDescription>
                  Preview of your selected report with current filters
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExportReport('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportReport('excel')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportReport('csv')}>
                  <FileText className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedReport === 'attendance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-success">{attendanceStats.presentDays}</p>
                    <p className="text-sm text-muted-foreground">Present Days</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-warning">{attendanceStats.lateDays}</p>
                    <p className="text-sm text-muted-foreground">Late Days</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-destructive">{attendanceStats.absentDays}</p>
                    <p className="text-sm text-muted-foreground">Absent Days</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {attendanceStats.totalDays > 0 ? 
                        Math.round((attendanceStats.presentDays / attendanceStats.totalDays) * 100) : 0}%
                    </p>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Late</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.slice(0, 5).map((employee) => {
                        const employeeAttendance = currentMonthAttendance.filter(r => r.employeeId === employee.id);
                        const present = employeeAttendance.filter(r => r.status === 'present').length;
                        const late = employeeAttendance.filter(r => r.status === 'late').length;
                        const absent = employeeAttendance.filter(r => r.status === 'absent').length;
                        const total = employeeAttendance.length;
                        const rate = total > 0 ? Math.round((present / total) * 100) : 0;
                        
                        return (
                          <TableRow key={employee.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-success font-medium">{present}</TableCell>
                            <TableCell className="text-warning font-medium">{late}</TableCell>
                            <TableCell className="text-destructive font-medium">{absent}</TableCell>
                            <TableCell>
                              <Badge variant={rate >= 90 ? "default" : rate >= 75 ? "secondary" : "destructive"}>
                                {rate}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {selectedReport === 'salary' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">$485,000</p>
                    <p className="text-sm text-muted-foreground">Total Payroll</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-success">$65,000</p>
                    <p className="text-sm text-muted-foreground">Average Salary</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-warning">$48,500</p>
                    <p className="text-sm text-muted-foreground">Total Deductions</p>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Salary report preview will be generated here</p>
                </div>
              </div>
            )}

            {selectedReport === 'employee' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{mockUsers.length}</p>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-success">
                      {[...new Set(mockUsers.map(u => u.department))].length}
                    </p>
                    <p className="text-sm text-muted-foreground">Departments</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-warning">
                      {mockUsers.filter(u => u.role === 'admin').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Administrators</p>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Employee report preview will be generated here</p>
                </div>
              </div>
            )}

            {selectedReport === 'performance' && (
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Performance report preview will be generated here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};