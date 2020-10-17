import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './summary.css';

export default function Summary({ history }) {
  const [globalData, setGlobalData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('summary');
      console.log(response);
      setGlobalData(response.data['Global']);
    };
    fetchData();
  }, []);

  return (
    <div className="summary">
      <div className="card card--confirmed">
        <p className="heading">Confirmed</p>
        <p className="change">
          {globalData['NewConfirmed'] > 0
            ? `+${globalData['NewConfirmed']}`
            : ''}
        </p>
        <p className="total">{globalData['TotalConfirmed']}</p>
      </div>
      <div className="card card--active">
        <p className="heading">Active</p>
        <p className="change">
          {globalData['NewConfirmed'] -
            globalData['NewRecovered'] -
            globalData['NewDeaths'] >
          0
            ? `+${
                globalData['NewConfirmed'] -
                globalData['NewRecovered'] -
                globalData['NewDeaths']
              }`
            : ''}
        </p>
        <p className="total">{globalData['TotalConfirmed']}</p>
      </div>
      <div className="card card--recovered">
        <p className="heading">Recovered</p>
        <p className="change">
          {globalData['NewRecovered'] > 0
            ? `+${globalData['NewRecovered']}`
            : ''}
        </p>
        <p className="total">{globalData['TotalRecovered']}</p>
      </div>
      <div className="card card--deceased">
        <p className="heading">Deceased</p>
        <p className="change">
          {globalData['NewDeaths'] > 0 ? `+${globalData['NewDeaths']}` : ''}
        </p>
        <p className="total">{globalData['TotalDeaths']}</p>
      </div>
    </div>
  );
}
