import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <div className="h-[60vh] grid place-items-center text-muted-foreground">
        <div className="text-center space-y-2">
          <CalendarIcon className="h-10 w-10 mx-auto" />
          <div className="text-lg font-semibold">Calendário</div>
          <div className="text-sm">Visões Upcoming e Month. Usaremos a DataConclusaoPrevista para eventos. Toque em um evento para ver detalhes e comentar.</div>
        </div>
      </div>
      <Link to="/new">
        <Button className="fixed bottom-20 right-4 rounded-full h-12 w-12 p-0 shadow-lg" title="Nova Peça">
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
