import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarLogOut from './components/NavbarLogOut';
import Footer from './components/FooterReact';
import RegisterUser from './pages/Cliente/RegisterUser';
import RegisterProvider from './pages/Prestador/RegisterProvider'
import LoginPage from './pages/Login';
import Home from './pages/Home'

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
      <Routes>
         {/* Ruta por defecto */}
        <Route path="/" element={<Home />} />
        <Route path="/registeruser" element={<RegisterUser />} />
        <Route path="/registerprovider" element={<RegisterProvider />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Aquí puedes agregar más rutas en el futuro */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
