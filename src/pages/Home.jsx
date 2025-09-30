import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Calendar, Activity, FileText } from 'lucide-react';

// Página inicial (Home)
export const Home = () => {
  const features = [
    { icon: Calendar, title: 'Agenda Dinâmica', description: 'Visualização de horários disponíveis com marcação automática e lembretes por e-mail' },
    { icon: Shield,   title: 'Privacidade Garantida', description: 'Autenticação segura via JWT e proteção total dos dados sensíveis dos pacientes' },
    { icon: Activity, title: 'Análise Inteligente', description: 'Machine Learning para identificar padrões emocionais e agrupar perfis de risco' },
    { icon: Users,    title: 'Impacto Social', description: 'Voltado para projetos voluntários, universidades e ONGs que oferecem apoio psicológico' },
    { icon: FileText, title: 'Histórico Estruturado', description: 'Registro organizado de sessões com temas, recomendações e evolução do paciente' },
    { icon: Zap,      title: 'Interface Acolhedora', description: 'Design responsivo e acessível, pensado para conforto emocional dos usuários' }
  ];

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center justify-center text-center py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl overflow-hidden bg-white">
              <img src="/logo.jpg" alt="Lunysse" className="w-full h-full object-cover" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Lunysse</h1>
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">
              Sistema de Agendamento Psicológico
            </h2>

            <p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
              Plataforma digital que otimiza o agendamento e gestão de atendimentos psicológicos voluntários.
              Desenvolvida para universidades, ONGs e projetos sociais que promovem saúde mental.
            </p>

            {/* Botões de ação (CTA) */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* Link de criação de conta estilizado como botão */}
              <Link
                to="/register"
                className="inline-flex items-center justify-center
                           font-semibold rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-offset-2
                           bg-light text-white hover:bg-accent focus:ring-light
                           px-6 py-3 text-lg min-w-[48px] min-h-[48px]
                           w-full sm:w-auto"
              >
                Começar Agora
              </Link>

              {/* Link de rolagem para recursos estilizado como botão */}
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center
                           font-semibold rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-offset-2
                           bg-transparent border border-white text-white
                           hover:bg-white/10 focus:ring-light
                           px-6 py-3 text-lg min-w-[48px] min-h-[48px]
                           w-full sm:w-auto"
              >
                Conhecer Recursos
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="min-h-screen flex items-center py-20">
        <div className="w-full">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tecnologia a Serviço do Cuidado
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Ferramentas inteligentes para organizar, acompanhar e potencializar atendimentos voluntários
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-light to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA (CALL TO ACTION) SECTION ================= */}
      <section className="min-h-screen flex items-center py-20">
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Faça Parte desta Transformação Social
            </h2>
            <p className="text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
              Una tecnologia e responsabilidade social. Ajude a democratizar o acesso
              à saúde mental através de uma plataforma pensada para o bem-estar coletivo.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center
                         font-semibold rounded-2xl transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2
                         bg-light text-white hover:bg-accent focus:ring-light
                         text-xl px-12 py-5 min-w-[48px] min-h-[48px]"
            >
              Criar Conta Gratuita
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
