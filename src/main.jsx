import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// App principal carregando normalmente
import App from './App.jsx';

// Exemplo: componentes pesados carregados sob demanda
// const Sidebar = lazy(() => import('./components/Sidebar'));
// const Dashboard = lazy(() => import('./pages/Dashboard'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
