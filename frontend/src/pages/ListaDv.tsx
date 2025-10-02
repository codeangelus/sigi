import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { PlusSquare } from "lucide-react";


function pct(s: string) {
  const n = parseInt(s.replace("%", ""), 10);
  return isFinite(n) ? Math.min(Math.max(n, 0), 100) : 0;
}

function Bar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-200">
      <div className="h-2 rounded-full bg-slate-900 transition-[width]" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function ListaDv() {
  const navigate = useNavigate();
  const [dvList, setDvList] = useState([]);



    //Excluir dv 
  const handleDelete = async (id: number) => {
    if (!confirm(`Tem certeza que deseja excluir este DV ?`)) return;
  
    try {
      await api.delete(`/dvs/${id}`);
    
      // Atualiza o estado removendo o item
      setDvList(prev => prev.filter(dv => dv.id !== id));
    } catch (err) {
      console.error("Erro ao excluir DV:", err);
      alert("Não foi possível excluir o DV");
    }
  };

  useEffect(() => {
    api.get("/dvs")
      .then(res => setDvList(res.data))
      .catch(err => console.error("Erro ao buscar DVs:", err));
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Lista de DVs</h1>

        <div className="mx-5 flex items-center gap-3">
          <button
            onClick={() => navigate("/new")}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
          >
            <PlusSquare className="h-4 w-4" /> Novo
          </button>        

          <button
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
            onClick={() => navigate("/tracker")}
          >
            Ir para o Tracker
          </button>
        </div>
      </div>

      {/* >>> SOMENTE CARDS <<< */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dvList.map((dv: any) => (
          <div
            key={dv.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <button
                onClick={() => navigate(`/tracker?dv=${dv.id}`)}
                className="text-base font-semibold text-slate-900 underline-offset-2 group-hover:underline"
              >
                {dv.numero}
              </button>

              <button
                className="rounded-full p-1.5 hover:bg-red-50"
                aria-label={`Excluir ${dv.numero}`}
                onClick={() => handleDelete(dv.id)}
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>

            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{dv.cliente}</span>
              {dv.cod && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">Cód: {dv.cod}</span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-1 text-xs text-slate-500">Progresso 0%</div>
                <Bar value={0} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
