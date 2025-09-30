import { NavLink } from "react-router-dom";
import { CalendarDays, KanbanSquare, PlusSquare, BarChart2, CopyPlus } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { cn } from "@/lib/utils";


export default function BottomNav() {
  const { currentUser } = useData();
  const isAdmin = currentUser.papel === "Admin";
  const base = "flex-1 flex flex-col items-center justify-center py-2 text-xs";
  const active = "text-primary";

  return (
    <nav   className="fixed bottom-0 inset-x-0 w-full z-40 border-t bg-card/80 backdrop-blur
             supports-[backdrop-filter]:bg-card/60 bottom-nav">
      <div className={cn("mx-auto max-w-screen-md grid", isAdmin ? "grid-cols-4" : "grid-cols-3 ")}>
        {isAdmin && (
          /// NOVO PROJETO
          <NavLink to="/new" className={({ isActive }) => cn(base, isActive && active)}>
            <PlusSquare className="h-5 w-5" />
            <span>Novo Projeto</span>
          </NavLink>
        )}
        {/* LISTA DVs  
        <NavLink to="/Dv" className={({ isActive }) => cn(base, isActive && active)}>
          <BarChart2 className="h-5 w-5" />
          <span>DV</span>
        </NavLink> */}  

        {/* TRACKER  */}     
        <NavLink to="/tracker" className={({ isActive }) => cn(base, isActive && active)}>
          <KanbanSquare className="h-5 w-5" />
          <span>Kanban</span>
        </NavLink>

        {/* CALENDARIO  
        <NavLink to="/calendar" className={({ isActive }) => cn(base, isActive && active)}>
          <CalendarDays className="h-5 w-5" />
          <span>Calendário</span> 
        </NavLink> */}

        {/*  DASHBOARD  */}
        <NavLink to="/dashboard" className={({ isActive }) => cn(base, isActive && active)}>
          <BarChart2 className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        
        {/*  Novo Dv  
        <NavLink to="/newDv" className={({ isActive }) => cn(base, isActive && active)}>
          <CopyPlus className="h-5 w-5" />
          <span>Novo DV</span>
        </NavLink>        */}

      </div>
    </nav>
  );
}
