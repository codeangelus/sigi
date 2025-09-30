import React, { useMemo } from "react";
import { useData, Status, Workstream } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Peca } from "@/contexts/DataContext";

const workstreams: Workstream[] = ["Usinagem", "Inox", "Policarbonato", "Montagem"];
const statuses: Status[] = ["Não iniciado", "Em progresso", "Concluído"];
export default function Tracker() {
  const { pecas, updateStatus, filters, setFilters, usuarios, currentUser, deletePeca } = useData();
  const docs: number[] = pecas.map(p => p.doc).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
  const responsaveis = useMemo(() => {
    const emails = Array.from(new Set(pecas.map(p => p.responsavelEmail)));
    return usuarios.filter(u => emails.includes(u.email));
  }, [pecas, usuarios]);

  const filteredPecas = pecas.filter(p => {
    const workstreamMatch = filters.workstream === "Todos" || p.workstream === filters.workstream;
    const docMatch = filters.doc === "Todos" || p.doc.toString() === filters.doc;
    const responsavelMatch = filters.responsavelEmail === "Todos" || p.responsavelEmail === filters.responsavelEmail;
    return workstreamMatch && docMatch && responsavelMatch;
  });

  const columns = statuses.map((s) => ({
    status: s,
    items: filteredPecas.filter(p => p.status === s),
  }));

  const canEdit = (field: "status") => {
    if (currentUser.papel === "Admin") return true;
    return field === "status"; // Operador pode alterar status
  };

  return (

    //FILTRO POR WORKSTREAM
    <div className="mx-auto max-w-screen-xl p-4 space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
          <Select value={filters.workstream as any} onValueChange={(v) => setFilters({ ...filters, workstream: v as any })}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Setor" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {workstreams.map(ws => (
                <SelectItem key={ws} value={ws}>{ws}</SelectItem>
              ))}
            </SelectContent>
          </Select>

              {/*FILTRO POR DV*/}
          <Select value={filters.doc as any} onValueChange={(v) => setFilters({ ...filters, doc: v as any })}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Documento de Venda" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {docs.map(dv => (
                <SelectItem key={dv} value={dv.toString()}>{dv}</SelectItem>
              ))}
            </SelectContent>
          </Select>
      
              


              {/*FILTRO POR RESPONSÁVEL */}
          <Select value={filters.responsavelEmail as any} onValueChange={(v) => setFilters({ ...filters, responsavelEmail: v as any })}>
            <SelectTrigger className="w-[220px]"><SelectValue placeholder="Responsável" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                {responsaveis.map(r => (
                  <SelectItem key={r.nome} value={r.email}>{r.nome}</SelectItem>
                ))}
              </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <Card key={col.status}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{col.status}</span>
                <span className="text-sm text-muted-foreground">{col.items.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {col.items.map((p) => (
                  <div
                    key={p.id}
                    className={cn(
                      "rounded-md border p-3 bg-card",
                      p.atrasada && "border-red-500/60 bg-red-50 dark:bg-red-950/20"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">
                        <span className="text-red-600">{p.codigoPeca}</span>
                        <span className="text-xs text-muted-foreground ml-2">Issue #{p.id}</span>
                      </div>
                    </div>

                    {/* !*! TRANSFORMAR EM UM BOTÃO QUE FILTRA A PÁGINA TRACKER PARA A DV SELECIONADA  */} 
                    <div className="text-xs text-muted-foreground">Dv.: {p.doc}</div>
                    <div className="text-xs text-muted-foreground">Resp.: {p.responsavel?.nome || p.responsavelEmail}</div>
                    <div className="mt-2 flex gap-2">
                      {p.status === "Não iniciado" && (
                        <Button size="sm" onClick={() => canEdit("status") && updateStatus(p.id, "Em progresso")}>
                          Iniciar
                        </Button>
                      )}
                      {p.status !== "Concluído" && (
                        <Button style={{backgroundColor: "#90EE90"}} size="sm" variant="secondary" onClick={() => canEdit("status") && updateStatus(p.id, "Concluído")}>Concluir</Button>
                      )}
                      {p.status === "Concluído" && (
                        <Button size="sm" variant="outline" onClick={() => canEdit("status") && updateStatus(p.id, "Em progresso")}>Reabrir</Button>
                      )}
                      {currentUser.papel === "Admin" && (
                        <Button size="sm" variant="destructive" className="ml-auto" onClick={() => deletePeca(p.id)}>Excluir</Button>
                      )}
                    </div>
                  </div>
                ))}
                {col.items.length === 0 && (
                  <div className="text-sm text-muted-foreground">Sem itens.</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
