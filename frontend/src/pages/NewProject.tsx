import { useState } from "react";
import { useData, Workstream, Prioridade, Status } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const workstreams: Workstream[] = ["Usinagem", "Inox", "Policarbonato", "Montagem"];
const prioridades: Prioridade[] = ["Alta", "Média", "Baixa"];
const statuses: Status[] = ["Não iniciado", "Em progresso", "Concluído"];

export default function NewProject() {
  const { currentUser, usuarios, addPeca } = useData();
  const isAdmin = currentUser.papel === "Admin";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    workstream: "Usinagem" as Workstream,
    codigoPeca: "",
    descricao: "",
    responsavelEmail: usuarios[0]?.email || "",
    prioridade: "Média" as Prioridade,
    status: "Não iniciado" as Status,
    dataInicioPrevista: "",
    dataConclusaoPrevista: "",
    cliente: "",
    doc: "",
    observacoes: "",
  });

  const onSubmit = () => {
    if (!isAdmin) return;
    if (!form.codigoPeca || !form.descricao || !form.responsavelEmail) return;
    const id = addPeca({
      codigoPeca: form.codigoPeca,
      descricao: form.descricao,
      cliente: form.cliente ? form.cliente : null,
      workstream: form.workstream,
      responsavelEmail: form.responsavelEmail,
      prioridade: form.prioridade,
      dataInicioPrevista: form.dataInicioPrevista ? new Date(form.dataInicioPrevista) : null,
      dataConclusaoPrevista: form.dataConclusaoPrevista ? new Date(form.dataConclusaoPrevista) : null,
      observacoes: form.observacoes ? form.observacoes : null,
      status: form.status,
      doc: form.doc ? parseInt(form.doc) : 0,
    });
    if (id) navigate("/tracker");
  };

  return (
    <div className="mx-auto max-w-screen-sm p-4 pt-2">
      <Card>
        <CardHeader className="border-b flex items-center justify-between">
          <CardTitle>Novo Projeto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!isAdmin && (
            <div className="text-sm text-muted-foreground">Apenas Administradores podem criar novos projetos.</div>
          )}
          <div className="grid grid-cols-2 gap-3 pt-3 items-center">
            {/* SETOR */}
            <span>Setor:</span>
            <Select
              disabled={!isAdmin}
              value={form.workstream}
              onValueChange={(v) => setForm((f) => ({ ...f, workstream: v as Workstream }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Workstream" />
              </SelectTrigger>
              <SelectContent>
                {workstreams.map((ws) => (
                  <SelectItem key={ws} value={ws}>
                    {ws}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
              
            {/* TIPO DE PROJETO */}
            <span>Tipo de projeto:</span>
            <Select
              disabled={!isAdmin}
              value={form.workstream}
              onValueChange={(v) => setForm((f) => ({ ...f, workstream: v as Workstream }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Workstream" />
              </SelectTrigger>
              <SelectContent>
                {workstreams.map((ws) => (
                  <SelectItem key={ws} value={ws}>
                    {ws}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
              
            {/* CLIENTE */}
            <span>Cliente:</span>
            <Input
              className="w-full"
              disabled={!isAdmin}
              placeholder="Cliente"
              value={form.cliente}
              onChange={(e) => setForm((f) => ({ ...f, cliente: e.target.value }))}
            />

            {/* DATA INICIO */}
            <span>Data Início:</span>
            <Input
              className="w-full"
              disabled={!isAdmin}
              type="datetime-local"
              placeholder="Data Início Prevista"
              value={form.dataInicioPrevista}
              onChange={(e) => setForm((f) => ({ ...f, dataInicioPrevista: e.target.value }))}
            />

            {/* DATA CONCLUSÃO */}
            <span>Data de Conclusão:</span>
            <Input
              className="w-full"
              disabled={!isAdmin}
              type="datetime-local"
              placeholder="Data Conclusão Prevista"
              value={form.dataConclusaoPrevista}
              onChange={(e) => setForm((f) => ({ ...f, dataConclusaoPrevista: e.target.value }))}
            />
          
              


                {/* SALVAR */}
            <Button 
              disabled={!isAdmin ? true : false} 
              onClick={onSubmit}
              className="flex items-center justify-center mt-4 col-span-2"
            >
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
