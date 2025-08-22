export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  password: string;
  role: 'employee' | 'admin';
  department: string;
  designation: string;
  photo?: string;
  joiningDate: string;
  salary: number;
  phoneNumber?: string;
  address?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  checkIn?: string;
  checkOut?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  leaveType: 'sick' | 'personal' | 'vacation' | 'emergency';
}

export interface SalaryRecord {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'celebration';
  date: string;
  author: string;
}