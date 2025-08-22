import { User, AttendanceRecord, SalaryRecord, Announcement, LeaveRequest } from '@/types';

export const generateEmployeeId = (): string => {
  const prefix = 'EMP';
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `${prefix}${year}${random}`;
};

export const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'EMP240001',
    name: 'Admin User',
    email: 'admin@company.com',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
    designation: 'HR Manager',
    joiningDate: '2020-01-15',
    salary: 75000,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    phoneNumber: '+1-555-0101',
    address: '123 Admin Street, Corporate City, CC 12345'
  },
  {
    id: '2',
    employeeId: 'EMP240002',
    name: 'John Smith',
    email: 'john@company.com',
    password: 'john123',
    role: 'employee',
    department: 'Engineering',
    designation: 'Senior Developer',
    joiningDate: '2022-03-10',
    salary: 65000,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    phoneNumber: '+1-555-0102',
    address: '456 Tech Avenue, Developer City, DC 67890'
  },
  {
    id: '3',
    employeeId: 'EMP240003',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    password: 'sarah123',
    role: 'employee',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    joiningDate: '2023-01-20',
    salary: 55000,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    phoneNumber: '+1-555-0103',
    address: '789 Creative Lane, Marketing Plaza, MP 13579'
  },
  {
    id: '4',
    employeeId: 'EMP240004',
    name: 'Michael Brown',
    email: 'michael@company.com',
    password: 'michael123',
    role: 'employee',
    department: 'Sales',
    designation: 'Sales Manager',
    joiningDate: '2021-07-15',
    salary: 60000,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    phoneNumber: '+1-555-0104',
    address: '321 Sales Street, Commerce City, SC 24680'
  }
];

// Generate mock attendance data for the last 6 months
export const generateMockAttendance = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const employees = mockUsers;
  const today = new Date();
  
  employees.forEach(employee => {
    for (let i = 0; i < 180; i++) { // Last 6 months
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const random = Math.random();
      let status: AttendanceRecord['status'];
      let checkIn: string | undefined;
      let checkOut: string | undefined;
      
      if (random > 0.05) { // 95% attendance rate
        status = random > 0.1 ? 'present' : 'late';
        const baseHour = status === 'late' ? 9 + Math.floor(Math.random() * 2) : 9;
        const baseMinute = Math.floor(Math.random() * 60);
        checkIn = `${baseHour.toString().padStart(2, '0')}:${baseMinute.toString().padStart(2, '0')}`;
        
        const outHour = 17 + Math.floor(Math.random() * 3);
        const outMinute = Math.floor(Math.random() * 60);
        checkOut = `${outHour.toString().padStart(2, '0')}:${outMinute.toString().padStart(2, '0')}`;
      } else {
        status = 'absent';
      }
      
      records.push({
        id: `${employee.id}-${date.toISOString().split('T')[0]}`,
        employeeId: employee.id,
        date: date.toISOString().split('T')[0],
        status,
        checkIn,
        checkOut
      });
    }
  });
  
  return records;
};

export const mockAttendance = generateMockAttendance();

// Generate mock salary records
export const generateMockSalaries = (): SalaryRecord[] => {
  const records: SalaryRecord[] = [];
  const employees = mockUsers;
  const currentYear = new Date().getFullYear();
  
  employees.forEach(employee => {
    for (let month = 1; month <= 12; month++) {
      const allowances = employee.salary * 0.2;
      const deductions = employee.salary * 0.1;
      const netSalary = employee.salary + allowances - deductions;
      
      records.push({
        id: `${employee.id}-${currentYear}-${month}`,
        employeeId: employee.id,
        month: new Date(currentYear, month - 1).toLocaleString('default', { month: 'long' }),
        year: currentYear,
        basicSalary: employee.salary,
        allowances,
        deductions,
        netSalary,
        status: month <= new Date().getMonth() + 1 ? 'paid' : 'pending'
      });
    }
  });
  
  return records;
};

export const mockSalaries = generateMockSalaries();

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Holiday Notice - Christmas Week',
    content: 'The office will be closed from December 24th to December 26th for Christmas holidays. Regular operations will resume on December 27th.',
    type: 'general',
    date: '2024-12-15',
    author: 'HR Department'
  },
  {
    id: '2',
    title: 'New Employee Welcome',
    content: 'Please join us in welcoming our new team members who joined this month. Welcome to the family!',
    type: 'celebration',
    date: '2024-12-10',
    author: 'Admin User'
  },
  {
    id: '3',
    title: 'System Maintenance - This Weekend',
    content: 'IT systems will undergo maintenance this Saturday from 10 PM to 2 AM Sunday. Some services may be temporarily unavailable.',
    type: 'urgent',
    date: '2024-12-08',
    author: 'IT Department'
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '2',
    startDate: '2024-12-20',
    endDate: '2024-12-22',
    reason: 'Family vacation during holidays',
    status: 'pending',
    leaveType: 'vacation'
  },
  {
    id: '2',
    employeeId: '3',
    startDate: '2024-12-18',
    endDate: '2024-12-18',
    reason: 'Medical appointment',
    status: 'approved',
    leaveType: 'sick'
  }
];

// Helper functions for data manipulation
export const getAttendanceByEmployee = (employeeId: string) => {
  return mockAttendance.filter(record => record.employeeId === employeeId);
};

export const getSalariesByEmployee = (employeeId: string) => {
  return mockSalaries.filter(record => record.employeeId === employeeId);
};

export const getAttendanceStats = (employeeId: string) => {
  const records = getAttendanceByEmployee(employeeId);
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  
  const thisMonthRecords = records.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate.getMonth() === thisMonth && recordDate.getFullYear() === thisYear;
  });
  
  const presentDays = thisMonthRecords.filter(r => r.status === 'present' || r.status === 'late').length;
  const totalDays = thisMonthRecords.length;
  
  return {
    attendancePercentage: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0,
    presentDays,
    totalDays,
    lateDays: thisMonthRecords.filter(r => r.status === 'late').length,
    absentDays: thisMonthRecords.filter(r => r.status === 'absent').length
  };
};