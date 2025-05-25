import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarLogOut from './components/NavbarLogOut';
import Footer from './components/FooterReact';
import RegisterUser from './pages/Cliente/RegisterUser';

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
        <Route path="/registeruser" element={<RegisterUser />} />
        {/* Aquí puedes agregar más rutas en el futuro */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
