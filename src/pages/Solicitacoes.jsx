import { useState, useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';

import { Bell, User, Clock, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const Solicitacoes = () => {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState(new Set());

  useEffect(() => {
    loadRequests();
  }, [user.id]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getRequests(user.id);
      const pendingRequests = data.filter(req => req.status === 'pendente');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, requestData) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      const existingPatients = await mockApi.getPatients(user.id);
      const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);
      if (duplicatePatient) {
        toast.error('Este paciente já está cadastrado em sua lista!');
        return;
      }

      await mockApi.createPatient({
        name: requestData.patientName,
        email: requestData.patientEmail,
        phone: requestData.patientPhone,
        birthDate: '1990-01-01',
        age: 30,
        status: 'Ativo',
        psychologistId: user.id
      });

      await mockApi.updateRequestStatus(
        requestId,
        'aceito',
        'Paciente aceito e cadastrado no sistema'
      );

      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação aceita! Paciente adicionado à sua lista.');
    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (requestId) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      await mockApi.updateRequestStatus(
        requestId,
        'rejeitado',
        'Solicitação rejeitada pelo psicólogo'
      );
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação rejeitada.');
    } catch (error) {
      console.error('Erro ao rejeitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aceito': return 'bg-green-100 text-green-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      case 'pendente': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-10 p-6 sm:p-10">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <Bell className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">
          Solicitações de Pacientes
        </h1>
      </div>

      {/* Lista de Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {requests.length === 0 ? (
          <Card className="text-center py-12 rounded-2xl shadow-lg">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma solicitação encontrada
            </h3>
            <p className="text-gray-500">
              As solicitações de novos pacientes aparecerão aqui.
            </p>
          </Card>
        ) : (
          requests.map(request => (
            <Card
              key={request.id}
              className="space-y-5 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{request.patientName}</h3>
                    <p className="text-sm text-gray-600">{request.patientEmail}</p>
                    <p className="text-sm text-gray-600">{request.patientPhone}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency === 'alta' ? 'Alta' : request.urgency === 'media' ? 'Média' : 'Baixa'} urgência
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status === 'aceito' ? 'Aceito' : request.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Descrição da necessidade:</h4>
                <p className="text-gray-600">{request.description}</p>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                Enviado em {new Date(request.createdAt).toLocaleDateString('pt-BR')}
              </div>

              {request.notes && (
                <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                  <strong>Observações:</strong> {request.notes}
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => handleRejectRequest(request.id)}
                  loading={processingRequests.has(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors duration-300 rounded-xl"
                >
                  <X className="w-4 h-4" /> Rejeitar
                </Button>

                <Button
                  onClick={() => handleAcceptRequest(request.id, request)}
                  loading={processingRequests.has(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 transition-colors duration-300 shadow-md rounded-xl"
                >
                  <CheckCircle className="w-4 h-4" /> Aceitar como Paciente
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
