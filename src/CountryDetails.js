import React from 'react';

const CountryDetails = ({ country }) => {
    if (!country) {
        return <div>Select a country to view details.</div>;
    }

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            {/* Display more country-specific information */}
        </div>
    );
};

export default CountryDetails;
