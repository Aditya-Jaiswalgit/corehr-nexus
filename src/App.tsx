import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Attendance } from "./pages/Attendance";
import { Salaries } from "./pages/Salaries";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { HelpSupport } from "./pages/HelpSupport";
import { Reports } from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="salaries" element={<Salaries />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="help" element={<HelpSupport />} />
              <Route path="employees" element={<div className="p-8 text-center text-muted-foreground">Employee Management page coming soon...</div>} />
              <Route path="leaves" element={<div className="p-8 text-center text-muted-foreground">Leave Management page coming soon...</div>} />
              <Route path="reports" element={<Reports />} />
              <Route path="departments" element={<div className="p-8 text-center text-muted-foreground">Departments page coming soon...</div>} />
              <Route path="roles" element={<div className="p-8 text-center text-muted-foreground">Roles & Permissions page coming soon...</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
