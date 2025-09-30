import { NavLink } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { cn } from "@/lib/utils";
import { PlusSquare, ArrowLeft, BarChart2, KanbanSquare, Cog } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";


export const Drawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const { currentUser } = useData();
    const isAdmin = currentUser.papel === "Admin";
    const base = "flex items-center py-2 px-4 text-xs";
    const active = "text-primary font-bold";
    const { usuarios, setCurrentUser } = useData();

    if (!open) return null; // Só renderiza se estiver aberto

    return (
        <>
            {/* Overlay para fechar ao clicar fora */}
            <div
                className="fixed inset-0 z-40 bg-black/30 "
                onClick={onClose}
                aria-label="Fechar drawer"
            />
            <div
                className="fixed top-0 left-0 h-full w-[250px] z-50 
                bg-card/80 backdrop-blur border-r shadow-lg flex flex-col"
            >
                <button 
                    style={{ margin: 16, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', width:'fit-content' }}
                    onClick={onClose}
                    aria-label="Close drawer"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <Badge className="m-5 fixed top-0 right-0" variant={currentUser.papel === "Admin" ? "default" : "secondary"}>{currentUser.papel}</Badge>
                
                <nav>
                    <ul className="space-y-1 mt-4 grid-flow-col-1 gap-2">
                        <li>
                            <NavLink to="/new" className={({ isActive }) => cn(base, isActive && active)}>
                                <PlusSquare className="h-5 w-5" />
                                <span>Novo Projeto</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => cn(base, isActive && active)}>
                                <BarChart2 className="h-5 w-5" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tracker" className={({ isActive }) => cn(base, isActive && active)}>
                                <KanbanSquare className="h-5 w-5" />
                                <span>Kanban</span>
                            </NavLink>
                        </li>   
                        <li>
                            <NavLink to="/lista" className={({ isActive }) => cn(base, isActive && active)}>
                                <KanbanSquare className="h-5 w-5" />
                                <span>Lista de Dvs</span>
                            </NavLink>
                        </li>                                                                                              

                        <li>
                            <NavLink to="/table" className={({ isActive }) => cn(base, isActive && active)}>
                                <Cog className="h-5 w-5" />
                                <span>Controle de peças</span>
                            </NavLink>
                        </li> 

                        <li>
                            <div className="flex fixed items-end gap-2 bottom-0 mt-auto p-4">
                                <Select  value={currentUser.email} onValueChange={(v) => setCurrentUser(v)}>
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
                              </div>                             
                        </li>
                        
                        
                    </ul>
                </nav>
            </div>
        </>
    );
};