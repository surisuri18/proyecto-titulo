import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarLogOut from './components/NavbarLogOut';
import Footer from './components/FooterReact';
import BotonAyuda from './components/BotonAyuda';
import Home from './pages/All/Home';
import RegisterUser from './pages/Cliente/RegisterUser';
import RegisterProvider from './pages/Prestador/RegisterProvider';
import SearchServices from './pages/Cliente/SearchServices';
import ProviderProfile from './pages/Prestador/ProviderProfile';
import ProviderEditProfile from './pages/Prestador/ProviderEditProfile';
import ProviderInbox from './pages/Prestador/ProviderInbox';
import UserInbox from './pages/Cliente/UserInbox';
import Soporte from './pages/All/Soporte';
import ConfirmacionSoporte from './pages/All/ConfirmacionSoporte';
import FormularioReporteUsuario from './pages/All/FormularioReporteUsuario';
import MenuAdmin from './pages/Admin/MenuAdmin';
import GestionUsuarios from './pages/Admin/GestionUsuarios';
import ReportesFuncionamiento from './pages/Admin/ReportesFuncionamiento';
import ReportesUsuarios from './pages/Admin/ReportesUsuarios';
import MarcaDeAgua from './components/MarcaDeAgua';
import UserProfile from './pages/Cliente/UserProfile';
import UserEditProfile from './pages/Cliente/UserEditProfile';
import ConfirmarCuenta from './pages/All/ConfirmarCuenta';
import { AuthProvider } from './context/AuthContext';
import LoginPageWrapper from './pages/All/LoginPageWrapper'
//import LoginPage from './pages/All/Login';

function App() {
  const [desc, setDesc] = useState('');

  useEffect(() => {
    console.log('API base URL →', process.env.REACT_APP_API_URL);
  }, []);

  const initial = [
    'https://via.placeholder.com/300x150?text=Ejemplo+1',
    'https://via.placeholder.com/300x150?text=Ejemplo+2',
    'https://via.placeholder.com/300x150?text=Ejemplo+3',
    'https://via.placeholder.com/300x150?text=Ejemplo+4',
  ];

  return (
    <AuthProvider>
    <BrowserRouter>
      <NavbarLogOut />
      <MarcaDeAgua></MarcaDeAgua>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />


          <Route path="/registeruser" element={<RegisterUser />} />

          <Route path="/login" element={<LoginPageWrapper  />} />
          <Route path="/search" element={<SearchServices />} />

          <Route path="/soporte" element={<Soporte />} />
          <Route path="/reporte-enviado" element={<ConfirmacionSoporte />} />
          <Route path="/reportar-usuario" element={<FormularioReporteUsuario />} />

          
          <Route path="/admin" element={<MenuAdmin />} />   
          <Route path="/admin/usuarios" element={<GestionUsuarios />} />
          <Route path="/admin/reportes-app" element={<ReportesFuncionamiento />} />
          <Route path="/admin/reportes-usuarios" element={<ReportesUsuarios />} />

          <Route path="/registerprovider" element={<RegisterProvider />} />
          <Route path="/provider/inbox" element={<ProviderInbox />} />
          <Route path="/provider" element={<ProviderProfile />} />
          <Route path="/provider/edit" element={<ProviderEditProfile />} />

          <Route path="/user/inbox" element={<UserInbox />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/edit" element={<UserEditProfile />} />
          <Route path="/confirmar-cuenta/:token" element={<ConfirmarCuenta />} />

        </Routes>
      </main>
      <BotonAyuda />
      <Footer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

