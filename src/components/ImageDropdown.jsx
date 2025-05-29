import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hombre1 from '../assets/IconosUsuario/Hombre1.png';

const ImageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null); // <- para manejar el hover

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const menuItems = [
    { label: 'Perfil', path: '/user/profile' },
    { label: 'Inbox', path: '/user/inbox' },
    { label: 'Cerrar sesión', path: '/' }
  ];

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={Hombre1}
        alt="avatar"
        onClick={toggleDropdown}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
      {isOpen && (
        <ul style={{
          position: 'absolute',
          top: '70px',
          right: 0,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          listStyle: 'none',
          padding: '0.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 9999,
          minWidth: '180px'
        }}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.path)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                fontSize: '15px',
                backgroundColor: hoveredIndex === index ? '#bd4fca' : 'transparent', // rosado suave
                borderRadius: '6px'
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageDropdown;
