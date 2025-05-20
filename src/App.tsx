
import './App.css'
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/component/menu-lateral/MenuLateral';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (    
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

export default App
