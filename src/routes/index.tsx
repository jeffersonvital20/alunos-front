import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDeAlunos } from '../pages';
//import { ContasService } from '../shared/services/api/contas/contasServices';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        to: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'face',
        to: '/alunos',
        label: 'Alunos',
      }
    ]);
  },[]);

  return (   
    
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard/>} />
      <Route path="/alunos" element={<ListagemDeAlunos/>} />
      {/*<Route path="/contas/detalhe/:id" element={<DetalheDeContas/>} /> */}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};