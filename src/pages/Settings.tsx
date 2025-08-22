import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, Bell, Shield, Palette, Globe, 
  Database, Users, Mail, Lock, Eye, EyeOff, Save, RefreshCw 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    attendanceReminders: true,
    salaryAlerts: true,
    leaveUpdates: true,
    systemUpdates: false,
  });

  // System settings state (admin only)
  const [systemSettings, setSystemSettings] = useState({
    companyName: 'CoreHR Nexus',
    timezone: 'UTC-5',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    workingHours: '8',
    workingDays: '5',
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSystemSettingChange = (key: string, value: string) => {
    setSystemSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
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
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' 
              ? 'Manage system settings and user preferences' 
              : 'Manage your account preferences and notifications'
            }
          </p>
        </div>
        
        <Button onClick={handleSaveSettings} className="gap-2 bg-gradient-primary">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            {user?.role === 'admin' && <TabsTrigger value="system">System</TabsTrigger>}
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  General Preferences
                </CardTitle>
                <CardDescription>
                  Customize your general account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-5">UTC-5 (Eastern)</SelectItem>
                        <SelectItem value="utc-6">UTC-6 (Central)</SelectItem>
                        <SelectItem value="utc-7">UTC-7 (Mountain)</SelectItem>
                        <SelectItem value="utc-8">UTC-8 (Pacific)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select defaultValue="mm-dd-yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Display Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable dark theme for better visibility</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Compact View</Label>
                        <p className="text-sm text-muted-foreground">Use more compact layout for tables and lists</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Sidebar by Default</Label>
                        <p className="text-sm text-muted-foreground">Keep sidebar expanded on page load</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Communication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch 
                        checked={notifications.emailNotifications}
                        onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.pushNotifications}
                        onCheckedChange={(value) => handleNotificationChange('pushNotifications', value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Work Updates</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Attendance Reminders</Label>
                        <p className="text-sm text-muted-foreground">Daily check-in/out reminders</p>
                      </div>
                      <Switch 
                        checked={notifications.attendanceReminders}
                        onCheckedChange={(value) => handleNotificationChange('attendanceReminders', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Salary Alerts</Label>
                        <p className="text-sm text-muted-foreground">Monthly salary processing updates</p>
                      </div>
                      <Switch 
                        checked={notifications.salaryAlerts}
                        onCheckedChange={(value) => handleNotificationChange('salaryAlerts', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Leave Updates</Label>
                        <p className="text-sm text-muted-foreground">Leave request status changes</p>
                      </div>
                      <Switch 
                        checked={notifications.leaveUpdates}
                        onCheckedChange={(value) => handleNotificationChange('leaveUpdates', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>System Updates</Label>
                        <p className="text-sm text-muted-foreground">System maintenance and updates</p>
                      </div>
                      <Switch 
                        checked={notifications.systemUpdates}
                        onCheckedChange={(value) => handleNotificationChange('systemUpdates', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <Button onClick={handlePasswordChange} className="bg-gradient-primary">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Account Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label>Login Sessions</Label>
                        <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                      </div>
                      <Button variant="outline">View Sessions</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label>Data Export</Label>
                        <p className="text-sm text-muted-foreground">Download your personal data</p>
                      </div>
                      <Button variant="outline">Export Data</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings (Admin Only) */}
          {user?.role === 'admin' && (
            <TabsContent value="system" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    System Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure system-wide settings and policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Company Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input 
                          value={systemSettings.companyName}
                          onChange={(e) => handleSystemSettingChange('companyName', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Default Timezone</Label>
                        <Select 
                          value={systemSettings.timezone}
                          onValueChange={(value) => handleSystemSettingChange('timezone', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-5">UTC-5 (Eastern)</SelectItem>
                            <SelectItem value="UTC-6">UTC-6 (Central)</SelectItem>
                            <SelectItem value="UTC-7">UTC-7 (Mountain)</SelectItem>
                            <SelectItem value="UTC-8">UTC-8 (Pacific)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Default Currency</Label>
                        <Select 
                          value={systemSettings.currency}
                          onValueChange={(value) => handleSystemSettingChange('currency', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Working Hours per Day</Label>
                        <Input 
                          type="number"
                          value={systemSettings.workingHours}
                          onChange={(e) => handleSystemSettingChange('workingHours', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">System Maintenance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <RefreshCw className="h-6 w-6" />
                        <span>Backup Data</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <Database className="h-6 w-6" />
                        <span>System Logs</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <Users className="h-6 w-6" />
                        <span>User Management</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </motion.div>
    </div>
  );
};