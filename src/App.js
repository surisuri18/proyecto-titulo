import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/NavbarLogOut'
import NavbarLogOut from './components/NavbarLogOut';
import NavbarCliente from './components/NavbarCliente';
import NavbarPrestador from './components/NavbarPrestador';
import Footer from './components/Footer';
import BotonInicioRegistro from './components/BotonInicioRegistro';
import TituloCrearInicio from './components/TituloCrearInicio';
import BarraDeBusqueda from './components/BarraDeBusqueda';
import BusquedaRapida from './components/BusquedaRapida';

function App() {
  return (
    <BrowserRouter>
      <NavbarPrestador></NavbarPrestador>
    <div>
      <BarraDeBusqueda />
    </div>
    <div>
      <BusquedaRapida></BusquedaRapida>
    </div>
    <div>
      <TituloCrearInicio texto="Crear una cuenta nueva" />
    </div>
    <div>
      <BotonInicioRegistro text= "Iniciar Sesion"></BotonInicioRegistro>
    </div>
      
      <AppRoutes />
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
