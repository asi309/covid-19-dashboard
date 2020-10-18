import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './searchBar.css';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = (search) => {
      if (search) {
        const query = search.toLowerCase();
        const date = new Date().toISOString();
        const response = api.get(`country/${query}?from=2020-03-01T00:00:00Z&to=${date}`);
        console.log(response['Country']);
      }
    };

    fetchData(searchTerm);
  }, [searchTerm]);

  return (
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
        <input
          type="text"
          name="search-bar"
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
