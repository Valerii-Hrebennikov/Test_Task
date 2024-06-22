import React from 'react';
import { Marker as GoogleMarker } from '@react-google-maps/api';

const Marker = ({ lat, lng, clusterer }) => {
  return (
    <GoogleMarker
      position={{ lat, lng }}
      clusterer={clusterer} // Передача об'єкту clusterer для кластеризації
    />
  );
};

export default Marker;
