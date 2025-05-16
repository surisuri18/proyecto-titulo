import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavbarPrestador from './components/PrestadorServicio/NavbarPrestador';
import Footer from './components/Footer';
import BotonInicioRegistro from './components/BotonInicioRegistro';
import TituloCrearInicio from './components/TituloCrearInicio';
import BarraDeBusqueda from './components/BarraDeBusqueda';
import BusquedaRapida from './components/BusquedaRapida';
<<<<<<< Updated upstream
import CrearCuentaUsuario from './components/formularios/FormularioRegistroUsuario';
import FilterButton from './components/FiltroBúsqueda';
import Valoracion from './components/PrestadorServicio/Valoracion';
import DescriptionBox from './components/PrestadorServicio/FotosTrabajo';
import { useState } from 'react';
import FotosTrabajo from './components/PrestadorServicio/FotosTrabajo';

=======
import BotonBlancoOvalado from './components/BotonBlancoOvalado';
import CardPrestadorPerfil from './components/CardPrestadorPerfil';
import RegisterUser from './pages/Cliente/RegisterUser';
>>>>>>> Stashed changes

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
    <BrowserRouter>
<<<<<<< Updated upstream
      <NavbarPrestador />
      <div> <DescriptionBox
      description={desc}
      onChange={setDesc}
      placeholder="Describe aquí tus servicios y datos de contacto"
      rows={6}
      /></div>
      <BarraDeBusqueda />
      <BusquedaRapida />
=======
        <NavbarPrestador></NavbarPrestador>
      <div>
        <BarraDeBusqueda />
      </div>
      <div>
        <BusquedaRapida></BusquedaRapida>
      </div>
      <div>
        <CardPrestadorPerfil imagenUrl="https://via.placeholder.com/100" nombre="Lucas Altamirano"/>
      </div>
      <div>
        <TituloCrearInicio texto="Crear una cuenta nueva" />
      </div>
      <div>
        <BotonInicioRegistro text= "Iniciar Sesion"></BotonInicioRegistro>
      </div>
      
      <div>
        <BotonBlancoOvalado texto="Iniciar chat" onClick={() => console.log("Botón presionado")} />
      </div>
>>>>>>> Stashed changes
      
      <FilterButton />
      <TituloCrearInicio texto="Crear una cuenta nueva" />
      <BotonInicioRegistro text="Iniciar Sesión" />
      <CrearCuentaUsuario />
      <Valoracion />
  
      <FotosTrabajo initialPhotos={initial} />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
