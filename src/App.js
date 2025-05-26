import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarLogOut from './components/NavbarLogOut';
import Footer from './components/FooterReact';
import RegisterUser from './pages/Cliente/RegisterUser';
import SearchServices from './pages/Cliente/SearchServices';
import ProviderProfile from './pages/Cliente/ProviderProfile';
import ProviderEditProfile from './pages/Prestador/ProviderEditProfile';
import ProviderInbox from './pages/Prestador/ProviderInbox';
import Soporte from './pages/Soporte';
import BotonAyuda from './components/BotonAyuda';

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
      <NavbarLogOut />
      <main>
        <Routes>
          <Route path="/registeruser" element={<RegisterUser />} />
          {/* Aquí puedes agregar más rutas en el futuro */}
          <Route path="/search" element={<SearchServices />} />

          <Route path="/provider" element={<ProviderProfile />} />

          <Route path="/provider/edit" element={<ProviderEditProfile />} />

          <Route path="/inbox" element={<ProviderInbox />} />

          <Route path="/soporte" element={<Soporte />} />

          

        </Routes>
      </main>
      <BotonAyuda />
      <Footer />
    </BrowserRouter>
  )
}

export default App;
