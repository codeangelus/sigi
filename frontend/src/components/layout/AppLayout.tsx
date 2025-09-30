import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
