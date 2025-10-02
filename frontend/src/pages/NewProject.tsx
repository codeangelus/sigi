import { useState } from "react";
import { useData, Workstream, Prioridade, Status } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ArrowLeft } from "lucide-react";


const workstreams: Workstream[] = ["Usinagem", "Inox", "Policarbonato", "Montagem"];
const statuses: Status[] = ["Não iniciado", "Em progresso", "Concluído"];




export default function NewProject() {
  const { currentUser, usuarios, addPeca } = useData();
  const isAdmin = currentUser.papel === "Admin";
  const navigate = useNavigate();





  const [form, setForm] = useState({
    workstream: "Usinagem" as Workstream,
    dataInicioPrevista: "",
    dataConclusaoPrevista: "",
    cliente: "",
    doc: "",

  });
  
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!isAdmin) return;

  try {
    const payload = {
      numero: form.doc || null,
      cliente: form.cliente,
      dt_inicio: form.dataInicioPrevista || null,
      dt_fim: form.dataConclusaoPrevista || null,
    };

    const { data } = await api.post("/dvs", payload);

    if (data && data.id){
      console.log("DV criada no backend:", data);
      navigate("/lista");
    }

  } catch (err) {
    console.error("Erro ao criar DV:", err);
    alert("Não foi possível criar o DV");
  }
};



  return (
    <div className="mx-auto max-w-screen-sm p-4 pt-2">

        <Card className="items-center">
          <CardHeader className="relative border-b flex items-center justify-center">
            <button
              className="absolute left-4 cursor-pointer"
              onClick={() => navigate("/lista")}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <CardTitle className="text-lg font-semibold">Novo Projeto</CardTitle>
          </CardHeader>
    
 
        <CardContent className="space-y-3">
          {!isAdmin && (
            <div className="text-sm text-muted-foreground">Apenas Administradores podem criar novos projetos.</div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 pt-3 items-center">
            

            {/* SETOR 
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
            </Select>*/}
              
            {/* TIPO DE PROJETO 
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
            </Select>*/}



            {/* CODIGO */}
            <span>Codigo:</span>
            <Input
              className="w-full"
              disabled={!isAdmin}
              placeholder="Codigo"
              value={form.doc}
              onChange={(e) => setForm((f) => ({ ...f, doc: e.target.value }))}
            />

              
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
              type="date"
              placeholder="Data Início Prevista"
              value={form.dataInicioPrevista}
              onChange={(e) => setForm((f) => ({ ...f, dataInicioPrevista: e.target.value }))}
            />

            {/* DATA CONCLUSÃO */}
            <span>Data de Conclusão:</span>
            <Input
              className="w-full"
              disabled={!isAdmin}
              type="date"
              placeholder="Data Conclusão Prevista"
              value={form.dataConclusaoPrevista}
              onChange={(e) => setForm((f) => ({ ...f, dataConclusaoPrevista: e.target.value }))}
            />
          
              


                {/* SALVAR */}

              <Button 
                disabled={!isAdmin} 
                type="submit"
                className="flex items-center justify-center mt-4 col-span-2"
              >
                Salvar
              </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
