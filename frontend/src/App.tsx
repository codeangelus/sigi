import "./global.css";

import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AppLayout from "@/components/layout/AppLayout";
import { DataProvider, useData } from "@/contexts/DataContext";


{/* PAGES */}
import Dashboard from "@/pages/Dashboard";
import Tracker from "@/pages/Tracker";
import CalendarPage from "@/pages/Calendar";
import NewProject from "@/pages/NewProject";
import Login from "@/pages/Login";
import ListaDv from "./pages/ListaDv";
import Table from "./pages/Table";


const queryClient = new QueryClient();

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useData();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tracker" element={<Tracker />} />
              <Route path="calendar" element={<CalendarPage />} /> 
              <Route path="new" element={<NewProject />} />
              <Route path="lista" element={<ListaDv />} />
              <Route path="table" element={<Table />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
