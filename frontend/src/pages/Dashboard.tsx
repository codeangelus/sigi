import { useMemo } from "react";
import { useData, Workstream, Status } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const workstreams: Workstream[] = ["Usinagem", "Inox", "Policarbonato", "Montagem"];
const statuses: Status[] = ["Não iniciado", "Em progresso", "Concluído"];

export default function Dashboard() {
  const { pecasForCurrentUserAll, filters, setFilters, usuarios } = useData();

  const kpi = useMemo(() => {
    const now = new Date();
    const atrasadas = pecasForCurrentUserAll.filter(p => p.atrasada).length;
    const emProgressoHoje = pecasForCurrentUserAll.filter(p => p.status === "Em progresso" && p.dataInicioReal && new Date(p.dataInicioReal).toDateString() === now.toDateString()).length;
    const concluidasNoMes = pecasForCurrentUserAll.filter(p => p.status === "Concluído" && p.dataConclusaoReal && new Date(p.dataConclusaoReal).getMonth() === now.getMonth() && new Date(p.dataConclusaoReal).getFullYear() === now.getFullYear()).length;
    return { atrasadas, emProgressoHoje, concluidasNoMes };
  }, [pecasForCurrentUserAll]);

  const chartData = useMemo(() => {
    return workstreams.map(ws => {
      const inWs = pecasForCurrentUserAll.filter(p => p.workstream === ws);
      return {
        workstream: ws,
        naoIniciado: inWs.filter(p => p.status === "Não iniciado").length,
        emProgresso: inWs.filter(p => p.status === "Em progresso").length,
        concluido: inWs.filter(p => p.status === "Concluído").length,
      };
    });
  }, [pecasForCurrentUserAll]);

  const atrasadas = useMemo(() => {
    return pecasForCurrentUserAll
      .filter(p => p.atrasada)
      .slice()
      .sort((a, b) => {
        const prioOrder: Record<string, number> = { Alta: 0, Média: 1, Baixa: 2 };
        const aDate = a.dataConclusaoPrevista ? new Date(a.dataConclusaoPrevista).getTime() : Infinity;
        const bDate = b.dataConclusaoPrevista ? new Date(b.dataConclusaoPrevista).getTime() : Infinity;
        if (prioOrder[a.prioridade] !== prioOrder[b.prioridade]) return prioOrder[a.prioridade] - prioOrder[b.prioridade];
        return aDate - bDate;
      });
  }, [pecasForCurrentUserAll]);

  const exportCsv = () => {
    const header = ["ID","CodigoPeca","Cliente","Workstream","Status","Responsavel","Prioridade","DataConclusaoPrevista"].join(",");
    const rows = atrasadas.map(p => [
      p.id,
      p.codigoPeca,
      p.cliente || "",
      p.workstream,
      p.status,
      p.responsavel?.nome || p.responsavelEmail,
      p.prioridade,
      p.dataConclusaoPrevista ? new Date(p.dataConclusaoPrevista).toISOString() : ""
    ].map(x => `"${String(x).replace(/\"/g, '\\\"').replace(/"/g, '\\"')}"`).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pecas-atrasadas.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const responsaveis = useMemo(() => {
    const emails = Array.from(new Set(pecasForCurrentUserAll.map(p => p.responsavelEmail)));
    return usuarios.filter(u => emails.includes(u.email));
  }, [pecasForCurrentUserAll, usuarios]);

  return (
    <div
  className="
    mx-auto p-4 space-y-6 
    max-w-screen-sm  /* padrão: celulares/tablets pequenos */
    sm:py-8 flex flex-col  /* em telas médias: layout flexível */
    md:px-6  /* em telas médias: mais padding horizontal */
    lg:max-w-screen-xl lg:py-10 /* em telas grandes: largura maior + mais padding */
  "
>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Peças atrasadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-destructive">{kpi.atrasadas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Em progresso hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{kpi.emProgressoHoje}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Concluídas no mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-primary">{kpi.concluidasNoMes}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Peças</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <XAxis dataKey="workstream" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="naoIniciado" name="Não iniciado" stackId="s" fill="#94a3b8" />
                <Bar dataKey="emProgresso" name="Em progresso" stackId="s" fill="#60a5fa" />
                <Bar dataKey="concluido" name="Concluído" stackId="s" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Atrasadas</h2>
        <div className="flex gap-2">
          <Select value={filters.workstream as any} onValueChange={(v) => setFilters({ ...filters, workstream: v as any })}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Workstream" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {workstreams.map(ws => (
                <SelectItem key={ws} value={ws}>{ws}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.responsavelEmail as any} onValueChange={(v) => setFilters({ ...filters, responsavelEmail: v as any })}>
            <SelectTrigger className="w-[220px]"><SelectValue placeholder="Responsável" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {responsaveis.map(r => (
                <SelectItem key={r.email} value={r.email}>{r.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCsv}>Exportar CSV</Button>
        </div>
      </div>

      <div className="grid gap-3">
        {atrasadas.map((p) => (
          <div key={p.id} className="border rounded-md p-3 flex items-center justify-between bg-destructive/5">
            <div className="space-y-1">
              <div className="font-semibold"><span className="text-red-600">{p.codigoPeca}</span> — {p.descricao}</div>
              <div className="text-xs text-muted-foreground">{p.workstream} • {p.status} • Resp.: {p.responsavel?.nome || p.responsavelEmail}</div>
            </div>
            <div className="text-sm">Prevista: {p.dataConclusaoPrevista ? new Date(p.dataConclusaoPrevista).toLocaleDateString() : "–"}</div>
          </div>
        ))}
        {atrasadas.length === 0 && (
          <div className="text-sm text-muted-foreground">Sem peças atrasadas no momento.</div>
        )}
      </div>
    </div>
  );
}
