import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './summary.css';

export default function Summary({ country }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async (country = '') => {
      const response = await api.get('summary');
      if (country) {
        const countries = response.data['Countries'];
        const filteredCountry = countries.filter((c) => c['Slug'] === country);
        setData(filteredCountry[0]);
      } else {
        setData(response.data['Global']);
      }
    };
    fetchData(country);
  }, [country]);

  return (
    <div className="summary">
      <div className="card card--confirmed">
        <p className="heading">Confirmed</p>
        <p className="change">
          {data
            ? data['NewConfirmed'] > 0
              ? `+${data['NewConfirmed']}`
              : ''
            : ''}
        </p>
        <p className="total">{data ? data['TotalConfirmed'] : 0}</p>
      </div>
      <div className="card card--active">
        <p className="heading">Active</p>
        <p className="change">
          {data
            ? data['NewConfirmed'] - data['NewRecovered'] - data['NewDeaths'] >
              0
              ? `+${
                  data['NewConfirmed'] -
                  data['NewRecovered'] -
                  data['NewDeaths']
                }`
              : ''
            : ''}
        </p>
        <p className="total">{data ? data['TotalConfirmed'] : 0}</p>
      </div>
      <div className="card card--recovered">
        <p className="heading">Recovered</p>
        <p className="change">
          {data
            ? data['NewRecovered'] > 0
              ? `+${data['NewRecovered']}`
              : ''
            : ''}
        </p>
        <p className="total">{data ? data['TotalRecovered'] : 0}</p>
      </div>
      <div className="card card--deceased">
        <p className="heading">Deceased</p>
        <p className="change">
          {data ? (data['NewDeaths'] > 0 ? `+${data['NewDeaths']}` : '') : ''}
        </p>
        <p className="total">{data ? data['TotalDeaths'] : 0}</p>
      </div>
    </div>
  );
}
