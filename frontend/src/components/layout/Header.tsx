import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Drawer } from "./Drawer"; // Import Drawer
import { Menu } from "lucide-react"; // Hamburger icon
{/* import { SIGI }  from ".\public\SIGI.png"  */}

export default function Header() {
  const { usuarios, currentUser, setCurrentUser, filters, setFilters } = useData();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b md:text-center lg:text-left">
        <div className="mx-auto max-w-screen-xl px-4 py-3 flex items-center gap-1">
          {/* Drawer Button */}
          <button
            className="mr-2 p-2 rounded hover ₢:bg-muted"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menu"
          >
          

            <Menu className="h-6 w-6" />
          </button>

        {/*  <div className="flex-1 max-w-xl">
            <Input
              value={filters.query || ""}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              placeholder="Pesquisar por Código da Peça "
              className="h-10"
            />
          </div> */}
        



         {/* <div className="flex items-end gap-2 ">
            <Badge variant={currentUser.papel === "Admin" ? "default" : "secondary"}>{currentUser.papel}</Badge>
            <Select value={currentUser.email} onValueChange={(v) => setCurrentUser(v)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Selecionar usuário" />
              </SelectTrigger>
              <SelectContent>
                {usuarios.map((u) => (
                  <SelectItem key={u.email} value={u.email}>
                    {u.nome} — {u.papel} ({u.setor})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>  */}

          {/*<div className="flex items-right gap-2 min-w-[160px]">
            <div className="h-8 w-8 rounded-md bg-primary/10 grid place-items-center font-extrabold text-primary">
              {/*<img src={favicon} />
            </div>
            <div>
              <div className="font-semibold leading-none">Kanban de Peças</div>
              <div className="text-xs text-muted-foreground">Indústria • Controle de peças</div>
            </div>
          </div> */}    
        </div>
      </header>
      {/* Drawer */}
      {drawerOpen && (
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      )}
    </>
  );
}
