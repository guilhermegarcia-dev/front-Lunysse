import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { PublicNavbar } from '../components/PublicNavbar';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Páginas públicas
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

// Páginas protegidas
import { DashboardPsicologo } from '../pages/DashboardPsicologo';
import { DashboardPaciente } from '../pages/DashboardPaciente';
import { Agendamento } from '../pages/Agendamento';
import { ChatIA } from '../pages/ChatIA';
import { NotFound } from '../pages/NotFound';
import { Relatorios } from '../pages/Relatorios';        // ✅ corrigido: inicial maiúscula
import { Solicitacoes } from '../pages/Solicitacoes';    // ✅ corrigido: inicial maiúscula
import { Pacientes } from '../pages/Pacientes';
import { PacienteDetalhes } from '../pages/PacientesDetalhes'; // ✅ corrigido: nome singular

/* ==============================
   Componente de rota protegida
   ============================== */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

/* ==============================
   Componente de rota pública
   ============================== */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

/* ==============================
   Dashboard condicional
   ============================== */
const Dashboard = () => {
  const { user } = useAuth();
  return user?.type === 'psicologo' ? <DashboardPsicologo /> : <DashboardPaciente />;
};

/* ==============================
   Rotas da aplicação
   ============================== */
export const AppRoutes = () => {
  return (
    <Routes>

      {/* Rotas Públicas */}
      <Route path="/" element={
        <PublicRoute><Home /></PublicRoute>
      }/>
      <Route path="/about" element={
        <PublicRoute><About /></PublicRoute>
      }/>
      <Route path="/login" element={
        <PublicRoute><Login /></PublicRoute>
      }/>
      <Route path="/register" element={
        <PublicRoute><Register /></PublicRoute>
      }/>

      {/* Rotas Protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      }/>
      <Route path="/agendamento" element={
        <ProtectedRoute><Agendamento /></ProtectedRoute>
      }/>
      <Route path="/chat-ia" element={
        <ProtectedRoute><ChatIA /></ProtectedRoute>
      }/>
      <Route path="/relatorios" element={
        <ProtectedRoute><Relatorios /></ProtectedRoute>
      }/>
      <Route path="/solicitacoes" element={
        <ProtectedRoute><Solicitacoes /></ProtectedRoute>
      }/>
      <Route path="/pacientes" element={
        <ProtectedRoute><Pacientes /></ProtectedRoute>
      }/>
      <Route path="/pacientes/:id" element={
        <ProtectedRoute><PacienteDetalhes /></ProtectedRoute>
      }/>

      {/* Página 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
