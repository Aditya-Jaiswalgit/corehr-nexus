import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { getAttendanceByEmployee, getAttendanceStats, mockUsers } from '@/lib/mockData';
import { StatsCard } from '@/components/dashboard/StatsCard';

export const Attendance: React.FC = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEmployee, setSelectedEmployee] = useState(user?.role === 'admin' ? 'all' : user?.id || '');

  const attendanceRecords = user?.role === 'admin' && selectedEmployee === 'all' 
    ? [] // Show aggregated data for all employees
    : getAttendanceByEmployee(selectedEmployee);

  const currentMonthRecords = attendanceRecords.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate.getMonth() === selectedMonth && recordDate.getFullYear() === selectedYear;
  });

  const attendanceStats = getAttendanceStats(selectedEmployee);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'half-day':
        return <Clock className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-success text-success-foreground">Present</Badge>;
      case 'absent':
        return <Badge className="bg-destructive text-destructive-foreground">Absent</Badge>;
      case 'late':
        return <Badge className="bg-warning text-warning-foreground">Late</Badge>;
      case 'half-day':
        return <Badge className="bg-primary text-primary-foreground">Half Day</Badge>;
      default:
        return null;
    }
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
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' ? 'Manage employee attendance records' : 'Track your attendance and working hours'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Month</label>
                <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
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
          title="Present Days"
          value={attendanceStats.presentDays}
          description="This month"
          icon={CheckCircle}
          delay={0.2}
        />
        <StatsCard
          title="Attendance Rate"
          value={`${attendanceStats.attendancePercentage}%`}
          description="This month"
          icon={Calendar}
          trend={{ value: 5, isPositive: true }}
          delay={0.3}
        />
        <StatsCard
          title="Late Days"
          value={attendanceStats.lateDays}
          description="This month"
          icon={AlertCircle}
          delay={0.4}
        />
        <StatsCard
          title="Absent Days"
          value={attendanceStats.absentDays}
          description="This month"
          icon={XCircle}
          delay={0.5}
        />
      </div>

      {/* Attendance Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Attendance Calendar - {months[selectedMonth]} {selectedYear}
            </CardTitle>
            <CardDescription>
              Daily attendance records for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, index) => {
                const date = new Date(selectedYear, selectedMonth, index - 6);
                const isCurrentMonth = date.getMonth() === selectedMonth;
                const dateString = date.toISOString().split('T')[0];
                const attendanceRecord = currentMonthRecords.find(r => r.date === dateString);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                
                return (
                  <div
                    key={index}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-lg border text-xs
                      ${!isCurrentMonth ? 'text-muted-foreground/50 border-transparent' : 
                        isWeekend ? 'bg-muted/30 text-muted-foreground' :
                        attendanceRecord ? 
                          (attendanceRecord.status === 'present' ? 'bg-success/20 border-success/30 text-success-foreground' :
                           attendanceRecord.status === 'late' ? 'bg-warning/20 border-warning/30 text-warning-foreground' :
                           attendanceRecord.status === 'absent' ? 'bg-destructive/20 border-destructive/30 text-destructive-foreground' :
                           'bg-primary/20 border-primary/30 text-primary-foreground') :
                        'bg-muted/10 border-border hover:bg-muted/20 transition-colors'}
                    `}
                  >
                    <span className="font-medium">{date.getDate()}</span>
                    {attendanceRecord && (
                      <div className="mt-1">
                        {getStatusIcon(attendanceRecord.status)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-sm">Late</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Half Day</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Records Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Attendance Records</CardTitle>
            <CardDescription>
              Latest attendance entries with detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentMonthRecords.slice(0, 10).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {record.checkIn && record.checkOut ? 
                          `${record.checkIn} - ${record.checkOut}` : 
                          record.status === 'absent' ? 'No attendance' : 'Partial record'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {record.checkIn && record.checkOut && (
                      <div className="text-right text-sm">
                        <p className="font-medium">8h 30m</p>
                        <p className="text-muted-foreground">Working hours</p>
                      </div>
                    )}
                    {getStatusBadge(record.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};