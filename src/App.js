import React, { useEffect, useState } from 'react';

import api from './services/api';
import Details from './components/Details';
import Summary from './components/Summary';

import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailedData, setDetailedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('countries');
      setCountries(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async (search) => {
      if (search) {
        const date = new Date().toISOString();
        const response = await api.get(
          `country/${search}?from=2020-03-01T00:00:00Z&to=${date}`
        );
        setDetailedData(response.data);
      }
    };

    fetchData(searchTerm);
  }, [searchTerm]);

  return (
    <div className="App">
      <div className="search">
        <label>Search for your country</label>
        <div className="search-input">
          <svg
            width="30px"
            height="30px"
            fill="none"
            stroke="#868686b6"
            strokeWidth="2px"
            strokeLinecap="round"
          >
            <circle cx="14px" cy="14px" r="10px"></circle>
            <line x1="26px" y1="26px" x2="21px" y2="21px"></line>
          </svg>
          <select
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries
              .sort((a, b) =>
                a.Country.toLowerCase() > b.Country.toLowerCase()
                  ? 1
                  : b.Country.toLowerCase() > a.Country.toLowerCase()
                  ? -1
                  : 0
              )
              .map((country) => (
                <option key={country['ISO2']} value={country['Slug']}>
                  {country['Country']}
                </option>
              ))}
          </select>
        </div>
      </div>
      <Summary country={searchTerm} />
      <Details data={detailedData} />
    </div>
  );
}

export default App;
