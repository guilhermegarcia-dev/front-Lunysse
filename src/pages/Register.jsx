// importações das bibliotecas e componentes
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card"; // Import corrigido
import { Phone, TableRowsSplitIcon } from "lucide-react";
import toast from "react-hot-toast"; // Import do toast

export const Register = () => {
  const [userType, setUserType] = useState("paciente"); // corrigido useType -> userType
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    CRP: "",
    specialty: "",
    Phone: "",
    birthDate: "",
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // corrigido () no hook
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await mockApi.register({
        ...formData,
        type: userType,
      });

      login(user, token);
      toast.success("Conta criada com sucesso");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <Card className="bg-amber-400 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Criar Conta</h1>
          <p className="text-dark/50">Cadastre-se na Lunysse</p>
        </div>

        {/* seletor de Usuario */}
        <div className="flex mb-6 gap-1">
          <Button
            type="button"
            variant={userType === "paciente" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setUserType("paciente")}
            className="flex"
          >
            Paciente
          </Button>

          <Button
            type="button"
            variant={userType === "psicologo" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setUserType("psicologo")}
            className="flex"
          >
            Psicólogo
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome Completo"
            value={formData.name}
            onChange={handleInputChange("name")}
            placeholder="Seu nome Completo"
            required
          />
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="seu@email.com"
            required
          />
          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            placeholder="Digite sua senha"
            required
          />
          <Input
            label="Confirme sua Senha"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            placeholder="Confirme sua senha"
            required
          />
          <Input
            label="Telefone"
            type="tel"
            value={formData.Phone}
            onChange={handleInputChange("Phone")}
            placeholder="Digite o seu telefone"
            required
          />

          {userType === "paciente" && (
            <Input
              label="Data de Nascimento"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange("birthDate")}
              placeholder="Digite a sua data de nascimento"
              required
            />
          )}

          {userType === "psicologo" && (
            <>
              <Input
                label="CRP"
                value={formData.CRP}
                onChange={handleInputChange("CRP")}
                placeholder="Ex: 12/34567"
                required
              />
              <Input
                label="Especialidade"
                value={formData.specialty}
                onChange={handleInputChange("specialty")}
                placeholder="Ex: Psicologia Clínica, Terapia Cognitiva"
                required
              />
            </>
          )}

          <Button type="submit" loading={loading} className="w-full">
            Criar Conta
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-dark/70">Já possui conta?</p>
          <Link
            to="/login"
            className="text-light font-bold hover:text-dark"
          >
            Faça login!
          </Link>
        </div>
      </Card>
    </div>
  );
};
