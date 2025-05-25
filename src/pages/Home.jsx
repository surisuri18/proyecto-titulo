import React from 'react';
import '../styles/Home.css';
import NavbarLogOut from '../components/NavbarLogOut';
import FooterReact from '../components/FooterReact';
import BarraDeBusqueda from '../components/BarraDeBusqueda';
import BusquedaRapida from '../components/BusquedaRapida';
import CardPrestadorPerfil from '../components/CardPrestadorPerfil';
import FiltroBusqueda from '../components/FiltroBusqueda';

function Home() {
  return (
    <div className="home-background">
      <NavbarLogOut />

      <div className="container mt-4">
        <div className="d-flex flex-wrap gap-1 align-items-center justify-content-center mb-4">


          <BarraDeBusqueda />
          <FiltroBusqueda />
      </div>


        <div className="mb-5">
          <BusquedaRapida />
        </div>

        <section className="mb-4">
          <h2 className="mb-3 text-center">Perfiles Destacados</h2>

          <div className="row justify-content-center">
            <div className="col-6 col-md-3 mb-3"><CardPrestadorPerfil /></div>
            <div className="col-6 col-md-3 mb-3"><CardPrestadorPerfil /></div>
            <div className="col-6 col-md-3 mb-3"><CardPrestadorPerfil /></div>
            <div className="col-6 col-md-3 mb-3"><CardPrestadorPerfil /></div>
          </div>
        </section>
      </div>

      <FooterReact />
    </div>
  );
}

export default Home;

