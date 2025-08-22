import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, DollarSign, TrendingUp, Calendar, Bell, Activity, Building } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { SalaryChart } from '@/components/dashboard/SalaryChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { mockAnnouncements, getAttendanceStats, mockUsers } from '@/lib/mockData';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const attendanceStats = user ? getAttendanceStats(user.id) : null;

  // Mock data for dashboard
  const upcomingEvents = [
    { id: '1', title: 'Team Meeting', date: '2024-12-22', type: 'meeting' },
    { id: '2', title: 'Christmas Holiday', date: '2024-12-25', type: 'holiday' },
    { id: '3', title: 'Year End Review', date: '2024-12-30', type: 'review' },
  ];

  const recentActivities = [
    { id: '1', action: 'Checked in', time: '09:15 AM', date: 'Today' },
    { id: '2', action: 'Submitted report', time: '02:30 PM', date: 'Yesterday' },
    { id: '3', action: 'Leave approved', time: '11:45 AM', date: 'Dec 18' },
  ];

  const employeeStats = user?.role === 'admin' ? {
    totalEmployees: mockUsers.length,
    activeEmployees: mockUsers.filter(u => u.role === 'employee').length,
    departments: [...new Set(mockUsers.map(u => u.department))].length,
  } : null;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-hero rounded-2xl p-6 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-white/80 mb-4">
                Here's what's happening with your work today
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {user?.employeeId}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {user?.department}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {user?.designation}
                </Badge>
              </div>
            </div>
            <Avatar className="h-20 w-20 ring-4 ring-white/30">
              <AvatarImage src={user?.photo} alt={user?.name} />
              <AvatarFallback className="text-xl bg-white/20 text-white">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.role === 'admin' ? (
          <>
            <StatsCard
              title="Total Employees"
              value={employeeStats?.totalEmployees || 0}
              description="Active employees"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
              delay={0.1}
            />
            <StatsCard
              title="Departments"
              value={employeeStats?.departments || 0}
              description="Active departments"
              icon={Building}
              delay={0.2}
            />
            <StatsCard
              title="Avg Attendance"
              value="92%"
              description="This month"
              icon={Clock}
              trend={{ value: 5, isPositive: true }}
              delay={0.3}
            />
            <StatsCard
              title="Total Payroll"
              value="$485K"
              description="This month"
              icon={DollarSign}
              trend={{ value: 8, isPositive: true }}
              delay={0.4}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Attendance"
              value={`${attendanceStats?.attendancePercentage || 0}%`}
              description="This month"
              icon={Clock}
              trend={{ value: 5, isPositive: true }}
              delay={0.1}
            />
            <StatsCard
              title="Leave Balance"
              value="12 days"
              description="Remaining this year"
              icon={Calendar}
              delay={0.2}
            />
            <StatsCard
              title="Last Salary"
              value="$5,500"
              description="Credited on Dec 1"
              icon={DollarSign}
              delay={0.3}
            />
            <StatsCard
              title="Performance"
              value="4.8/5"
              description="Current rating"
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
              delay={0.4}
            />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <SalaryChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Announcements
              </CardTitle>
              <CardDescription>
                Latest updates and notices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAnnouncements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    announcement.type === 'urgent' ? 'bg-destructive' :
                    announcement.type === 'celebration' ? 'bg-success' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{announcement.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Announcements
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Important dates and events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your recent actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.action}</h4>
                    <p className="text-xs text-muted-foreground">
                      {activity.time} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};