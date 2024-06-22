import React from 'react';
import Draggable from 'react-draggable'; // Бібліотека для перетягування елементів


const Marker = ({ lat, lng }) => {
  const handleDrag = (e, data) => {
    // Обробник події перетягування маркера
    // Можна додати логіку для збереження нових координат маркера у стані
    console.log('New position:', { lat: data.y, lng: data.x });
  };

  return (
    <Draggable
      defaultPosition={{ x: lng, y: lat }} // Початкові координати маркера
      onStop={handleDrag} // Обробник закінчення перетягування
    >
      <div style={{ position: 'absolute', cursor: 'move', color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
        📍
      </div>
    </Draggable>
  );
};

export default Marker;
