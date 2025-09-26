import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  AlertTriangle, TrendingUp, Users, Calendar, BarChart3, Clock, DollarSign, ArrowUp, ArrowDown 
} from 'lucide-react';

export const Relatorios = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [reportsData, setReportsData] = useState({
    stats: { activePatients: 0, totalSessions: 0, attendanceRate: 0, riskAlerts: 0, revenue: 0, avgSessionTime: 0, monthComparison: 0 },
    frequencyData: [],
    statusData: [],
    riskAlerts: [],
    patientsData: [],
    monthlyRevenue: []
  });

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const data = await mockApi.getReportsData(user.id);
        setReportsData({
          stats: data.stats || { activePatients: 0, totalSessions: 0, attendanceRate: 0, riskAlerts: 0, revenue: 0, avgSessionTime: 0, monthComparison: 0 },
          frequencyData: data.frequencyData || [],
          statusData: data.statusData || [],
          riskAlerts: data.riskAlerts || [],
          patientsData: data.patientsData || [],
          monthlyRevenue: data.monthlyRevenue || []
        });
      } catch (error) {
        console.error('Erro ao carregar dados dos relatórios:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReportsData();
  }, [user.id]);

  if (loading) return <LoadingSpinner size="lg" />;

  const { stats, frequencyData, statusData, riskAlerts, patientsData, monthlyRevenue } = reportsData;
  const hasNoData = stats.activePatients === 0 && stats.totalSessions === 0;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-dark mb-1">Relatórios e Analytics</h1>
        <p className="text-dark/70 text-sm">Acompanhe métricas e indicadores da sua prática</p>
      </div>

      {hasNoData ? (
        <Card className="text-center py-16 border-2 border-dashed border-light/30">
          <BarChart3 className="w-20 h-20 text-light/50 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-dark mb-2">Relatórios em Construção</h3>
          <p className="text-dark/70 mb-4">Seus relatórios aparecerão aqui conforme você atender pacientes e realizar sessões.</p>
          <p className="text-sm text-dark/50">Comece aceitando solicitações de pacientes para gerar dados estatísticos.</p>
        </Card>
      ) : (
        <>
          {/* KPIs com tendência */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-200">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-700" />
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-3xl font-bold text-dark">{stats.activePatients}</h3>
                {stats.monthComparison > 0 ? <ArrowUp className="w-4 h-4 text-green-500" /> : <ArrowDown className="w-4 h-4 text-red-500" />}
              </div>
              <p className="text-dark/70 text-sm">Pacientes Ativos</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-green-100 to-green-200">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-green-700" />
              <h3 className="text-3xl font-bold text-dark">{stats.totalSessions}</h3>
              <p className="text-dark/70 text-sm">Total de Sessões</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-200">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-700" />
              <h3 className="text-3xl font-bold text-dark">{stats.attendanceRate}%</h3>
              <p className="text-dark/70 text-sm">Taxa de Conclusão</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-red-100 to-red-200">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-700" />
              <h3 className="text-3xl font-bold text-dark">{stats.riskAlerts}</h3>
              <p className="text-dark/70 text-sm">Alertas de Risco</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-yellow-100 to-yellow-200">
              <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-700" />
              <h3 className="text-3xl font-bold text-dark">{stats.avgSessionTime} min</h3>
              <p className="text-dark/70 text-sm">Tempo Médio/Sessão</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-indigo-100 to-indigo-200">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-indigo-700" />
              <h3 className="text-3xl font-bold text-dark">R$ {stats.revenue}</h3>
              <p className="text-dark/70 text-sm">Faturamento Total</p>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Frequência de Sessões */}
            <Card>
              <h2 className="text-xl font-semibold text-dark mb-4">Frequência de Sessões</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={frequencyData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#2493BF" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Evolução Mensal de Faturamento */}
            <Card>
              <h2 className="text-xl font-semibold text-dark mb-4">Evolução Mensal de Faturamento</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#6B46C1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Status das Sessões */}
            <Card>
              <h2 className="text-xl font-semibold text-dark mb-4">Status das Sessões</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {(statusData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Pacientes por Status */}
            <Card>
              <h2 className="text-xl font-semibold text-dark mb-4 text-center">Pacientes por Status de Sessão</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={patientsData || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {(patientsData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Alertas de Risco */}
            <Card>
              <h2 className="text-xl font-semibold text-dark mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Alertas de Risco
              </h2>
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {(riskAlerts || []).length === 0 ? (
                  <p className="text-dark/70 text-center py-4">Nenhum alerta de risco no momento</p>
                ) : (
                  (riskAlerts || []).map(alert => (
                    <div key={alert.id} className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                      <div>
                        <p className="font-medium text-dark">{alert.patient}</p>
                        <p className="text-sm text-dark/70">{alert.reason}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            alert.risk === 'Alto' ? 'bg-red-500/20 text-red-700' : 'bg-yellow-500/20 text-yellow-700'
                          }`}
                        >
                          Risco {alert.risk}
                        </span>
                        <p className="text-xs text-dark/70 mt-1">{new Date(alert.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
