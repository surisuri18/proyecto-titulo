import React from 'react';
import BarraDeBusqueda from '../../components/BarraDeBusqueda';
import FiltroBusqueda from '../../components/FiltroBusqueda';
import CardServicio from '../../components/CardServicio';

function SearchServices() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Buscar Servicios</h1>

      <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-4">
        <BarraDeBusqueda />
        <FiltroBusqueda />
      </div>

      <div className="d-flex flex-column gap-3">
        <CardServicio />
        <CardServicio />
        <CardServicio />
      </div>
    </div>
  );
}

export default SearchServices;
