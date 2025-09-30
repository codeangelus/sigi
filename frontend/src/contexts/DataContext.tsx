import React, { createContext, useContext, useMemo, useState } from "react";
import { addDays, isBefore, isSameDay, isSameMonth, startOfDay } from "date-fns";


export type Workstream =
  | "Usinagem"
  | "Inox"
  | "Montagem"
  | "Policarbonato";

export type Status = "Não iniciado" | "Em progresso" | "Concluído";
export type Prioridade = "Alta" | "Média" | "Baixa";
export type Papel = "Admin" | "Operador";

export interface Usuario {
  email: string;
  nome: string;
  papel: Papel;
  setor: Workstream;
}

export interface Comentario {
  id: string;
  pecaId: string;
  autorEmail: string;
  texto: string;
  criadoEm: Date;
}

export interface HistoricoItem {
  id: string;
  pecaId: string;
  evento: string;
  autorEmail: string;
  quando: Date;
  senha: string;   // apenas para demonstração
}

export interface Peca {
  id: string;
  codigoPeca: string;
  descricao: string;
  cliente?: string | null;
  workstream: Workstream;
  status: Status;
  responsavelEmail: string;
  prioridade: Prioridade;
  dataInicioPrevista?: Date | null;
  dataConclusaoPrevista?: Date | null;
  dataInicioReal?: Date | null;
  dataConclusaoReal?: Date | null;
  observacoes?: string | null;
  doc?: number;
}

export interface DerivedPeca extends Peca {
  atrasada: boolean;
  responsavel?: Usuario | undefined;
}

function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const demoUsuarios: Usuario[] = [
  { email: "admin@kanban.com", senha: "admin", nome: "Admin", papel: "Admin", setor: "Montagem" },
  { email: "maria@empresa.com", nome: "Maria", papel: "Operador", setor: "Usinagem" },
  { email: "carlos@empresa.com", nome: "Carlos", papel: "Operador", setor: "Montagem" },
  { email: "lucas@empresa.com", nome: "Lucas", papel: "Operador", setor: "Policarbonato" },
  { email: "bruna@empresa.com", nome: "Bruna", papel: "Operador", setor: "Inox" },
];

const today = startOfDay(new Date());
const demoPecas: Peca[] = [
  {
    id: "1",
    codigoPeca: "AX-1001",
    descricao: "Flange de aço 2\"",
    cliente: "ACME",
    workstream: "Usinagem",
    status: "Não iniciado",
    responsavelEmail: "maria@empresa.com",
    prioridade: "Alta",
    dataInicioPrevista: addDays(today, -2),
    dataConclusaoPrevista: addDays(today, 1),
    observacoes: null,
    doc: 1234,
  },
  {
    id: "2",
    codigoPeca: "BR-2200",
    descricao: "Suporte de solda",
    cliente: "Globex",
    workstream: "Usinagem",
    status: "Em progresso",
    responsavelEmail: "joao@empresa.com",
    prioridade: "Média",
    dataInicioPrevista: addDays(today, -3),
    dataConclusaoPrevista: addDays(today, -1),
    dataInicioReal: addDays(today, -1),
    observacoes: "Aguardando inspeção",
    doc: 123,
  },
  {
    id: "3",
    codigoPeca: "PT-3305",
    descricao: "Carcaça ",
    cliente: "Initech",
    workstream: "Inox",
    status: "Concluído",
    responsavelEmail: "ana@empresa.com",
    prioridade: "Baixa",
    dataInicioPrevista: addDays(today, -10),
    dataConclusaoPrevista: addDays(today, -5),
    dataInicioReal: addDays(today, -9),
    dataConclusaoReal: addDays(today, -6),
    doc: 122,
  },
  {
    id: "4",
    codigoPeca: "MT-8080",
    descricao: "Conjunto de montagem",
    cliente: "Soylent",
    workstream: "Montagem",
    status: "Em progresso",
    responsavelEmail: "carlos@empresa.com",
    prioridade: "Alta",
    dataInicioPrevista: addDays(today, -1),
    dataConclusaoPrevista: addDays(today, 2),
    dataInicioReal: addDays(today, 0),
    doc: 111,
  },
  {
    id: "5",
    codigoPeca: "QL-9911",
    descricao: "Checklist de qualidade",
    cliente: "Umbrella",
    workstream: "Policarbonato",
    status: "Não iniciado",
    responsavelEmail: "lucas@empresa.com",
    prioridade: "Média",
    dataInicioPrevista: addDays(today, 0),
    dataConclusaoPrevista: addDays(today, 4),
    doc: 111
  },
  {
    id: "6",
    codigoPeca: "LG-5512",
    descricao: "Programação logística",
    cliente: "Hooli",
    workstream: "Policarbonato",
    status: "Não iniciado",
    responsavelEmail: "bruna@empresa.com",
    prioridade: "Alta",
    dataInicioPrevista: addDays(today, -5),
    dataConclusaoPrevista: addDays(today, -2),
    doc: 1234
  },
];

const demoComentarios: Comentario[] = [];
const demoHistorico: HistoricoItem[] = [];

export interface Filters {
  workstream?: Workstream | "Todos";
  responsavelEmail?: string | "Todos";
  doc?: { doc: number | "Todos" };
  query?: string;
}

interface DataContextShape {
  usuarios: Usuario[];
  pecas: DerivedPeca[]; // filtered by UI filters and security slice
  pecasForCurrentUserAll: DerivedPeca[]; // only security slice applied, no UI filters
  comentarios: Comentario[];
  historico: HistoricoItem[];
  currentUser: Usuario;
  setCurrentUser: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  filters: Filters;
  setFilters: (f: Filters) => void;
  updateStatus: (pecaId: string, status: Status) => void;
  addComentario: (pecaId: string, texto: string) => void;
  addPeca: (params: {
    codigoPeca: string;
    descricao: string;
    cliente?: string | null;
    workstream: Workstream;
    responsavelEmail: string;
    prioridade: Prioridade;
    dataInicioPrevista?: Date | null;
    dataConclusaoPrevista?: Date | null;
    observacoes?: string | null;
    status?: Status;
    doc?: number;
  }) => string;
  deletePeca: (pecaId: string) => void;
  kpis: { atrasadas: number; emProgressoHoje: number; concluidasNoMes: number };
}

const DataContext = createContext<DataContextShape | undefined>(undefined);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarios] = useState<Usuario[]>(demoUsuarios);
  const [pecasState, setPecasState] = useState<Peca[]>(demoPecas);
  const [comentariosState, setComentariosState] = useState<Comentario[]>(demoComentarios);
  const [historicoState, setHistoricoState] = useState<HistoricoItem[]>(demoHistorico);
  const initialEmail = typeof window !== 'undefined' ? localStorage.getItem('kanban_current_user') : null;
  const [currentUserEmail, setCurrentUserEmail] = useState<string>(initialEmail || demoUsuarios[0].email);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(initialEmail));
  const [filters, setFilters] = useState<Filters>({ workstream: "Todos", responsavelEmail: "Todos", query: "" });

  const currentUser = useMemo(() => usuarios.find(u => u.email === currentUserEmail) || usuarios[0], [usuarios, currentUserEmail]);

  const pecas: DerivedPeca[] = useMemo(() => {
    const todayMid = startOfDay(new Date());
    const withDerived: DerivedPeca[] = pecasState.map((p) => ({
      ...p,
      responsavel: usuarios.find(u => u.email === p.responsavelEmail),
      atrasada: Boolean(
        p.status !== "Concluído" && p.dataConclusaoPrevista ? isBefore(p.dataConclusaoPrevista, todayMid) : false
      ),
    }));

    // Security slice for Operador
    const sliced = currentUser.papel === "Operador"
      ? withDerived.filter(p => p.workstream === currentUser.setor)
      : withDerived;

    // Apply filters
    return sliced.filter((p) => {
      const wsOk = !filters.workstream || filters.workstream === "Todos" || p.workstream === filters.workstream;
      const respOk = !filters.responsavelEmail || filters.responsavelEmail === "Todos" || p.responsavelEmail === filters.responsavelEmail;
      const q = (filters.query || "").trim().toLowerCase();
      const qOk = !q || p.codigoPeca.toLowerCase().includes(q) || (p.cliente || "").toLowerCase().includes(q);
      return wsOk && respOk && qOk;
    });
  }, [pecasState, usuarios, filters, currentUser]);

  const updateStatus = (pecaId: string, status: Status) => {
    setPecasState((prev) => prev.map((p) => {
      if (p.id !== pecaId) return p;
      const next: Peca = { ...p, status };
      const now = new Date();
      if (status === "Em progresso" && !p.dataInicioReal) {
        next.dataInicioReal = now;
      }
      if (status === "Concluído" && !p.dataConclusaoReal) {
        next.dataConclusaoReal = now;
      }
      return next;
    }));

    const peca = pecasState.find(p => p.id === pecaId);
    if (peca) {
      const evento = `Status alterado de ${peca.status} para ${status}`;
      const h: HistoricoItem = { id: uid("h"), pecaId, evento, autorEmail: currentUser.email, quando: new Date() };
      setHistoricoState((prev) => [h, ...prev]);
    }
  };

  const addComentario = (pecaId: string, texto: string) => {
    const c: Comentario = { id: uid("c"), pecaId, autorEmail: currentUser.email, texto, criadoEm: new Date() };
    setComentariosState((prev) => [c, ...prev]);
    const h: HistoricoItem = { id: uid("h"), pecaId, evento: "Comentário adicionado", autorEmail: currentUser.email, quando: new Date() };
    setHistoricoState((prev) => [h, ...prev]);
  };

  const addPeca = (params: {
    codigoPeca: string;
    descricao: string;
    cliente?: string | null;
    workstream: Workstream;
    responsavelEmail: string;
    prioridade: Prioridade;
    dataInicioPrevista?: Date | null;
    dataConclusaoPrevista?: Date | null;
    observacoes?: string | null;
    status?: Status;
    doc?: number;
  }): string => {
    const id = uid("p");
    const peca: Peca = {
      id,
      codigoPeca: params.codigoPeca,
      descricao: params.descricao,
      cliente: params.cliente ?? null,
      workstream: params.workstream,
      status: params.status ?? "Não iniciado",
      responsavelEmail: params.responsavelEmail,
      prioridade: params.prioridade,
      dataInicioPrevista: params.dataInicioPrevista ?? null,
      dataConclusaoPrevista: params.dataConclusaoPrevista ?? null,
      dataInicioReal: null,
      dataConclusaoReal: null,
      observacoes: params.observacoes ?? null,
      doc
    };
    setPecasState((prev) => [peca, ...prev]);
    const h: HistoricoItem = { id: uid("h"), pecaId: id, evento: "Peça criada", autorEmail: currentUser.email, quando: new Date() };
    setHistoricoState((prev) => [h, ...prev]);
    return id;
  };

  const deletePeca = (pecaId: string) => {
    setPecasState((prev) => prev.filter((p) => p.id !== pecaId));
    setComentariosState((prev) => prev.filter((c) => c.pecaId !== pecaId));
    const h: HistoricoItem = { id: uid("h"), pecaId, evento: "Peça excluída", autorEmail: currentUser.email, quando: new Date() };
    setHistoricoState((prev) => [h, ...prev]);
  };

  // KPI helpers
  const pecasAllDerived = useMemo<DerivedPeca[]>(() => {
    const todayMid = startOfDay(new Date());
    return pecasState.map((p) => ({
      ...p,
      responsavel: usuarios.find(u => u.email === p.responsavelEmail),
      atrasada: Boolean(
        p.status !== "Concluído" && p.dataConclusaoPrevista ? isBefore(p.dataConclusaoPrevista, todayMid) : false
      ),
    }));
  }, [pecasState, usuarios]);

  // Counts computed with security slice too
  const pecasForKpi = currentUser.papel === "Operador" ? pecasAllDerived.filter(p => p.workstream === currentUser.setor) : pecasAllDerived;

  const kpis = useMemo(() => {
    const now = new Date();
    const atrasadas = pecasForKpi.filter(p => p.atrasada).length;
    const emProgressoHoje = pecasForKpi.filter(p => p.status === "Em progresso" && p.dataInicioReal && isSameDay(p.dataInicioReal, now)).length;
    const concluidasNoMes = pecasForKpi.filter(p => p.status === "Concluído" && p.dataConclusaoReal && isSameMonth(p.dataConclusaoReal, now)).length;
    return { atrasadas, emProgressoHoje, concluidasNoMes };
  }, [pecasForKpi]);

  const setCurrentUser = (email: string) => {
    setCurrentUserEmail(email);
    try { localStorage.setItem('kanban_current_user', email); } catch {}
    setIsAuthenticated(true);
  };

  const logout = () => {
    try { localStorage.removeItem('kanban_current_user'); } catch {}
    setIsAuthenticated(false);
  };

  const value: DataContextShape = {
    usuarios,
    pecas,
    pecasForCurrentUserAll: pecasForKpi,
    comentarios: comentariosState,
    historico: historicoState,
    currentUser,
    setCurrentUser,
    logout,
    isAuthenticated,
    filters,
    setFilters,
    updateStatus,
    addComentario,
    addPeca,
    deletePeca,
    kpis,
  };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};
