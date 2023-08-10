import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import usePlacesAutocomplete, { getLatLng, getGeocode } from 'use-places-autocomplete';

const LeafletMap = ({ searchValue, handleLocationClick }) => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const { ready, suggestions: { data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleMapClick = async (event) => {
    setPosition([event.latlng.lat, event.latlng.lng]);
    clearSuggestions();

    try {
      const results = await getGeocode({ lat: event.latlng.lat, lng: event.latlng.lng });
      const description = results[0].formatted_address;
      handleLocationClick(description); // Call the function in App to handle the click event
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleSuggestionClick = async (description) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      setPosition([lat, lng]);
      handleLocationClick(description); // Call the function in App to handle the click event
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  useEffect(() => {
    if (searchValue) {
      handleSuggestionClick(searchValue);
    }
  }, [searchValue]);

  return (
    <div>
      <div className="MapSection">
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }} onClick={handleMapClick} animate>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Clicked Location</Popup>
          </Marker>
        </MapContainer>
      </div>
      {ready && (
        <div className="SuggestionsSection">
          <ul>
            {data.map((suggestion) => (
              <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.description)}>
                {suggestion.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
