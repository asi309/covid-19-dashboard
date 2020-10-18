import React, { useEffect, useState } from 'react';

import api from './services/api';
import SearchBar from './components/SearchBar';
import Summary from './components/Summary/';

import './App.css';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('countries');
      setCountries(response.data);
    };

    fetchData();
  }, [])

  return (
    <div className="App">
      <SearchBar countries={countries}/>
      <Summary />
    </div>
  );
}

export default App;
