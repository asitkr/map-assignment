import React, { useState } from 'react';
import './App.css';
import LeafletMap from './LeafletMap';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchValue(searchValue);
  };

  const handleLocationClick = (locationDetails) => {
    console.log(locationDetails, "locationDetails")
    setSelectedLocation(locationDetails);
  };

  return (
    <div className="App">
      <h1>Search and Click on the Map</h1>
      <div className="SearchBox">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for a city or country"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="MapContainer">
        <LeafletMap searchValue={searchValue} handleLocationClick={handleLocationClick} />
      </div>
      <div className="SelectedLocation">
        {selectedLocation && <p>Selected Location: {selectedLocation}</p>}
      </div>
    </div>
  );
}

export default App;
