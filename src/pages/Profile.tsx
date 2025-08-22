import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building, Briefcase, Calendar, Edit, Save, X, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    department: user?.department || '',
    designation: user?.designation || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      address: user?.address || '',
      department: user?.department || '',
      designation: user?.designation || '',
    });
    setIsEditing(false);
  };

  const profileStats = [
    { label: 'Employee Since', value: user?.joiningDate ? new Date(user.joiningDate).getFullYear() : 'N/A' },
    { label: 'Department', value: user?.department || 'N/A' },
    { label: 'Role', value: user?.role === 'admin' ? 'Administrator' : 'Employee' },
    { label: 'Employee ID', value: user?.employeeId || 'N/A' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Profile Management</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="gap-2 bg-gradient-primary">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="gap-2 bg-gradient-primary">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                  <AvatarImage src={user?.photo} alt={user?.name} />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
                <p className="text-muted-foreground mb-3">{user?.designation}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Badge variant="secondary">{user?.employeeId}</Badge>
                  <Badge variant="outline">{user?.department}</Badge>
                  <Badge variant={user?.role === 'admin' ? "default" : "secondary"}>
                    {user?.role === 'admin' ? 'Administrator' : 'Employee'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {profileStats.map((stat, index) => (
                    <div key={index} className="text-center md:text-left">
                      <p className="text-muted-foreground">{stat.label}</p>
                      <p className="font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-lg font-medium">{user?.name || 'Not provided'}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-lg font-medium">{user?.email || 'Not provided'}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-lg font-medium">{user?.phoneNumber || 'Not provided'}</p>
                )}
              </div>

              {/* Employee ID (Read-only) */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Employee ID
                </Label>
                <p className="text-lg font-medium text-muted-foreground">{user?.employeeId}</p>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address"
                  rows={3}
                />
              ) : (
                <p className="text-lg font-medium">{user?.address || 'Not provided'}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Work Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Work Information
            </CardTitle>
            <CardDescription>
              Your employment details and organization information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Department
                </Label>
                <p className="text-lg font-medium">{user?.department}</p>
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Designation
                </Label>
                <p className="text-lg font-medium">{user?.designation}</p>
              </div>

              {/* Joining Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joining Date
                </Label>
                <p className="text-lg font-medium">
                  {user?.joiningDate ? new Date(user.joiningDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Not provided'}
                </p>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Role
                </Label>
                <p className="text-lg font-medium">
                  {user?.role === 'admin' ? 'Administrator' : 'Employee'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>
              Manage your account security and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};