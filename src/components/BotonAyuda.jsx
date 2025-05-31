import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Components/BotonAyuda.css';

function BotonAyuda() {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const mouseDownPosition = useRef({ x: 0, y: 0 });
  const clickThreshold = 5;

  const startDrag = (clientX, clientY) => {
    setDragging(true);
    offset.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };
    mouseDownPosition.current = { x: clientX, y: clientY };
  };

  const updatePosition = (clientX, clientY) => {
    const button = buttonRef.current;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const newX = clientX - offset.current.x;
    const newY = clientY - offset.current.y;

    const maxX = windowWidth - (button?.offsetWidth || 100) - 10;
    const maxY = windowHeight - (button?.offsetHeight || 50) - 10;

    setPosition({
      x: Math.max(10, Math.min(newX, maxX)),
      y: Math.max(10, Math.min(newY, maxY))
    });
  };

  const endDrag = () => {
    setDragging(false);
  };

  const handleClick = (e) => {
    const dx = Math.abs(e.clientX - mouseDownPosition.current.x);
    const dy = Math.abs(e.clientY - mouseDownPosition.current.y);

    if (dx < clickThreshold && dy < clickThreshold) {
      navigate('/soporte');
    }
  };

  const handleTouchClick = (e) => {
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - mouseDownPosition.current.x);
    const dy = Math.abs(touch.clientY - mouseDownPosition.current.y);

    if (dx < clickThreshold && dy < clickThreshold) {
      navigate('/soporte');
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (!dragging) return;
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseUp = endDrag;
    const handleTouchEnd = endDrag;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging]);

  // Responsividad: evita que quede fuera en resize
  useEffect(() => {
    const handleResize = () => {
      const button = buttonRef.current;
      if (!button) return;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const maxX = windowWidth - button.offsetWidth - 10;
      const maxY = windowHeight - button.offsetHeight - 10;

      setPosition((prev) => ({
        x: Math.min(prev.x, maxX),
        y: Math.min(prev.y, maxY)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <button
      ref={buttonRef}
      className="boton-ayuda"
      style={{
        left: position.x,
        top: position.y,
        position: 'fixed'
      }}
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      onClick={handleClick}
      onTouchEnd={handleTouchClick}
    >
      ❓ Ayuda
    </button>
  );
}

export default BotonAyuda;
