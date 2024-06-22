import React, { useState } from 'react';
import { GoogleMap, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api';
import Marker from '/Marker';
import { firestore } from '/firebase'; 

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 41.3851,
  lng: 2.1734,
};

const MapComponent = ({ apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [markers, setMarkers] = useState([]);

  const handleMapClick = ({ lat, lng }) => {
    // Додавання нового маркера з координатами lat і lng
    const newMarker = {
      id: markers.length + 1, // Унікальний ідентифікатор маркера
      lat,
      lng,
    };

    // Зберігання маркера у Firebase
    saveMarkerToFirebase(newMarker);

    // Оновлення стану з маркером
    setMarkers([...markers, newMarker]);
  };

  const handleDeleteMarkers = () => {
    // Видалення всіх маркерів
    setMarkers([]);

    // Очистка маркерів з Firebase (якщо потрібно)
    clearMarkersFromFirebase();
  };

  const saveMarkerToFirebase = (marker) => {
    // Додаємо новий запис у Firebase
    firestore.collection('markers').add(marker)
      .then(docRef => {
        console.log('Marker added with ID: ', docRef.id);
      })
      .catch(error => {
        console.error('Error adding marker: ', error);
      });
  };

  const clearMarkersFromFirebase = () => {
    // Очищаємо всі записи про маркери з колекції в Firebase (якщо потрібно)
    firestore.collection('markers').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      })
      .catch(error => {
        console.error('Error clearing markers: ', error);
      });
  };

  return isLoaded ? (
    <div>
      <button onClick={handleDeleteMarkers}>Видалити всі маркери</button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onClick={handleMapClick} // Обробник кліку на карту
      >
        {/* Кластеризація маркерів */}
        <MarkerClusterer gridSize={60}>
          {(clusterer) =>
            markers.map((marker) => (
              <Marker
                key={marker.id}
                lat={marker.lat}
                lng={marker.lng}
                clusterer={clusterer} // Передача об'єкту clusterer в компонент маркера
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  ) : (
    <></> // Повертаємо пустий елемент, якщо карта ще не завантажена
  );
};

export default MapComponent;
