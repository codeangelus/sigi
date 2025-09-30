// TabelaPecas.tsx
import { useEffect, useMemo, useState } from "react";
import { Trash2, RotateCcw } from "lucide-react"

type Row = {
  id: number;
  data: string;
  dv: string;
  cliente: string;
  maquina: string;
  codigo_peca: string;
  data_entrega: string;
  status_atraso: string;
  operador: string;
  quantidade: number;
  imagem_url?: string;
};

export default function TabelaPecas() {
  const [mes, setMes] = useState("");
  const [maquina, setMaquina] = useState("");
  const [operador, setOperador] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const pages = useMemo(() => Math.max(Math.ceil(total / pageSize), 1), [total, pageSize]);

  function buildQuery() {
    const p = new URLSearchParams();
    if (mes) p.set("mes", mes);
    if (maquina) p.set("maquina", maquina);
    if (operador) p.set("operador", operador);
    if (inicio) p.set("inicio", inicio);
    if (fim) p.set("fim", fim);
    p.set("page", String(page));
    p.set("pageSize", String(pageSize));
    return p.toString();
  }

  async function fetchData() {
    setLoading(true);
    try {
      const qs = buildQuery();
      const res = await fetch(`http://localhost:3001/api/pecas?${qs}`);
      const data = await res.json();
      setRows(data.rows);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mes, maquina, operador, inicio, fim, page, pageSize]);

  function limpar() {
    setMes(""); setMaquina(""); setOperador(""); setInicio(""); setFim(""); setPage(1);
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 mb-4">
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium">Setor</span>
          <input type="month" value={mes} onChange={(e) => { setMes(e.target.value); setPage(1); }} className="rounded border px-3 py-2" />
        </label>        
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium">Máquina</span>
          <input value={maquina} onChange={(e) => { setMaquina(e.target.value); setPage(1); }} className="rounded border px-3 py-2" placeholder="BD300PROR" />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium">Operador</span>
          <input value={operador} onChange={(e) => { setOperador(e.target.value); setPage(1); }} className="rounded border px-3 py-2" placeholder="YAN" />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium">Início</span>
          <input type="date" value={inicio} onChange={(e) => { setInicio(e.target.value); setPage(1); }} className="rounded border px-3 py-2" />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium">Fim</span>
          <input type="date" value={fim} onChange={(e) => { setFim(e.target.value); setPage(1); }} className="rounded border px-3 py-2" />
        </label>
        <div className="flex items-end gap-2">
          <button onClick={limpar} className="rounded border px-3 py-2"><Trash2 className="h-5 w-5"/></button>
          <button onClick={fetchData} className="rounded bg-black text-white px-3 py-2"><RotateCcw className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl ring-1 ring-black/10">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-white shadow-sm">
            <tr>
              {["Data","DV","Cliente","Maquina","Código da peça","Data de entrega","Status atraso","Operador","Quantidade","Imagem"].map((h) => (
                <th key={h} className="border-b px-3 py-3 text-left text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={10} className="px-3 py-6 text-center text-sm">Carregando…</td></tr>
            )}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={10} className="px-3 py-6 text-center text-sm">Sem resultados</td></tr>
            )}
            {!loading && rows.map((r) => (
              <tr key={r.id} className="odd:bg-black/[0.03]">
                <td className="border-b px-3 py-2">{r.data}</td>
                <td className="border-b px-3 py-2">{r.dv}</td>
                <td className="border-b px-3 py-2">{r.cliente}</td>
                <td className="border-b px-3 py-2">{r.maquina}</td>
                <td className="border-b px-3 py-2">{r.codigo_peca}</td>
                <td className="border-b px-3 py-2">{r.data_entrega}</td>
                <td className="border-b px-3 py-2">
                  <span className="rounded-full px-2 py-0.5 text-xs ring-1"
                    style={{
                      background: r.status_atraso === "ATRASADO" ? "#fee2e2" :
                                 r.status_atraso === "NO PRAZO" ? "#dcfce7" : "#dbeafe",
                      color: "#111827"
                    }}
                  >
                    {r.status_atraso}
                  </span>
                </td>
                <td className="border-b px-3 py-2">{r.operador}</td>
                <td className="border-b px-3 py-2 text-right tabular-nums">{r.quantidade}</td>
                <td className="border-b px-3 py-2">
                  {r.imagem_url ? <img src={r.imagem_url} alt="" className="h-12 w-auto rounded" /> : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div>Total: {total}</div>
        <div className="flex gap-2">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} className="rounded border px-2 py-1" disabled={page === 1}>Anterior</button>
          <span>{page} / {pages}</span>
          <button onClick={() => setPage((p) => Math.min(p + 1, pages))} className="rounded border px-2 py-1" disabled={page === pages}>Próxima</button>
        </div>
      </div>
    </div>
  );
}
