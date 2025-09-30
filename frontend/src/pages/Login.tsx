import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// supondo que você tenha um componente PopUp
import PopUp from "@/components/ui/PopUp";

export default function Login() {
  const { usuarios, setCurrentUser } = useData();
  const [email, setEmail] = useState(usuarios[0]?.email || "");
  const [password, setPassword] = useState("");       //  estado da senha
  const [showPopup, setShowPopup] = useState(false);  //  estado do popup
  const navigate = useNavigate();

  const handleLogin = () => {
    const usuario = usuarios.find((u) => u.email === email);

    if (!usuario || usuario.senha !== password) {
      // se não encontrar ou senha não bate
      setShowPopup(true);
      return;
    }

    setCurrentUser(email);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">

      {/*Imagem Logo */}
      <div>
      </div>


      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />

          <Button className="w-full" onClick={handleLogin}>
            Entrar
          </Button>
        </CardContent>
      </Card>

      {showPopup && (
        <PopUp showPopUp={showPopup} closePopUp={() => setShowPopup(false)}>
          <h2>Credenciais inválidas</h2>
          <p>Confira seu e-mail e senha e tente novamente.</p>
        </PopUp>
      )}
    </div>
  );
}
