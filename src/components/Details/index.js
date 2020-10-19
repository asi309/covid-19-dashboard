import React, { useState } from 'react';
import { LineSeries, XAxis, XYPlot, YAxis } from 'react-vis';
import { format } from 'd3-format';

import './Details.css';

export default function Details({ data }) {
  const width = 600;
  const height = 180;
  const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [startIdx, setStartIdx] = useState(0);
  const [confirmedPlotValues, setConfirmedPlotValues] = useState({});
  const [activePlotValues, setActivePlotValues] = useState({});
  const [recoveredPlotValues, setRecoveredPlotValues] = useState({});
  const [deathPlotValues, setDeathPlotValues] = useState({});

  const confirmedData = data.slice(startIdx).map((d) => {
    const date = Date.parse(d['Date']);
    return { x: date, y: d['Confirmed'] };
  });
  const activeData = data.map((d) => {
    const date = new Date(d['Date']);
    const dateString = `${date.getDate()}`;
    // const dateString = `${date.getDate()} ${date.getMonth()}, ${date.getFullYear()}`;
    return { x: parseInt(dateString), y: d['Active'] };
  });
  const recoveredData = data.map((d) => {
    const date = new Date(d['Date']);
    const dateString = `${date.getDate()} ${date.getMonth()}, ${date.getFullYear()}`;
    return { x: dateString, y: d['Recovered'] };
  });
  const deathsData = data.map((d) => {
    const date = Date.parse(d['Date'].slice(0, 9));
    return { x: date, y: d['Deaths'] };
  });

  const confirmedNearestXYHandler = (value) => {
    const date = new Date(value.x);
    const dateString = `${date.getDate()} ${monthList[date.getMonth()]}`;
    setConfirmedPlotValues({ Date: dateString, Confirmed: value.y });
  };

  const confirmedMouseLeaveHandler = () => setConfirmedPlotValues({});

  const activeNearestXYHandler = (value) => {
    const date = new Date(value.x);
    const dateString = `${date.getDate()} ${monthList[date.getMonth()]}`;
    setActivePlotValues({ Date: dateString, Confirmed: value.y });
  };

  const activeMouseLeaveHandler = () => setActivePlotValues({});

  const recoveredNearestXYHandler = (value) => {
    const date = new Date(value.x);
    const dateString = `${date.getDate()} ${monthList[date.getMonth()]}`;
    setRecoveredPlotValues({ Date: dateString, Confirmed: value.y });
  };

  const recoveredMouseLeaveHandler = () => setRecoveredPlotValues({});
  
  const deathNearestXYHandler = (value) => {
    const date = new Date(value.x);
    const dateString = `${date.getDate()} ${monthList[date.getMonth()]}`;
    setDeathPlotValues({ Date: dateString, Confirmed: value.y });
  };

  const deathMouseLeaveHandler = () => setDeathPlotValues({});

  return (
    <div className="details">
      {data.length !== 0 ? (
        <>
          <div className="graph graph--confirmed">
            <div className="stats">
              <p className="heading">Confirmed</p>
              <p className="x-value">{confirmedPlotValues['Date']}</p>
              <p className="y-value">{confirmedPlotValues['Confirmed']}</p>
            </div>
            <XYPlot
              xType="time"
              width={width}
              height={height}
              onMouseLeave={confirmedMouseLeaveHandler}
            >
              <XAxis
                tickTotal={7}
                style={{
                  line: { stroke: '#e90000' },
                  ticks: { stroke: '#e90000b6' },
                }}
              />
              <YAxis
                tickFormat={(t) => format('.2s')(t)}
                style={{
                  line: { stroke: '#e90000' },
                  ticks: { stroke: '#e90000b6' },
                }}
              />
              <LineSeries
                curve={null}
                color="#e90000b6"
                data={confirmedData}
                opacity={1}
                strokeStyle="solid"
                onNearestXY={confirmedNearestXYHandler}
              />
            </XYPlot>
          </div>
          <div className="graph graph--active">
            <div className="stats">
              <p className="heading">Active</p>
              <p className="x-value">{activePlotValues['Date']}</p>
              <p className="y-value">{activePlotValues['Confirmed']}</p>
            </div>
            <XYPlot
              xType="time"
              width={width}
              height={height}
              onMouseLeave={activeMouseLeaveHandler}
            >
              <XAxis
                tickTotal={7}
                style={{
                  line: { stroke: '#0075eb' },
                  ticks: { stroke: '#0076ebb6' },
                }}
              />
              <YAxis
                tickFormat={(t) => format('.2s')(t)}
                style={{
                  line: { stroke: '#0075eb' },
                  ticks: { stroke: '#0076ebb6' },
                }}
              />
              <LineSeries
                curve={null}
                color="#0075ebb6"
                data={confirmedData}
                opacity={1}
                strokeStyle="solid"
                onNearestXY={activeNearestXYHandler}
              />
            </XYPlot>
          </div>
          <div className="graph graph--recovered">
            <div className="stats">
              <p className="heading">Recovered</p>
              <p className="x-value">{recoveredPlotValues['Date']}</p>
              <p className="y-value">{recoveredPlotValues['Confirmed']}</p>
            </div>
            <XYPlot
              xType="time"
              width={width}
              height={height}
              onMouseLeave={recoveredMouseLeaveHandler}
            >
              <XAxis
                tickTotal={7}
                style={{
                  line: { stroke: '#15b325' },
                  ticks: { stroke: '#15b325b6' },
                }}
              />
              <YAxis
                tickFormat={(t) => format('.2s')(t)}
                style={{
                  line: { stroke: '#15B325' },
                  ticks: { stroke: '#15b325b6' },
                }}
              />
              <LineSeries
                curve={null}
                color="#15B325b6"
                data={confirmedData}
                opacity={1}
                strokeStyle="solid"
                onNearestXY={recoveredNearestXYHandler}
              />
            </XYPlot>
          </div>
          <div className="graph graph--deaths">
            <div className="stats">
              <p className="heading">Deceased</p>
              <p className="x-value">{deathPlotValues['Date']}</p>
              <p className="y-value">{deathPlotValues['Confirmed']}</p>
            </div>
            <XYPlot
              xType="time"
              width={width}
              height={height}
              onMouseLeave={deathMouseLeaveHandler}
            >
              <XAxis
                tickTotal={7}
                style={{
                  line: { stroke: '#808080' },
                  ticks: { stroke: '#868686b6' },
                }}
              />
              <YAxis
                tickFormat={(t) => format('.2s')(t)}
                style={{
                  line: { stroke: '#808080' },
                  ticks: { stroke: '#868686b6' },
                }}
              />
              <LineSeries
                curve={null}
                color="#868686b6"
                data={confirmedData}
                opacity={1}
                strokeStyle="solid"
                onNearestXY={deathNearestXYHandler}
              />
            </XYPlot>
          </div>
        </>
      ) : (
        ''
      )}
      {data.length !== 0 ? (
        <div className="buttons">
          <button
            onClick={() => 
              setStartIdx(data.length - 30 >= 0 ? data.length - 30 : 0)
            }
          >
            1 month
          </button>
          <button
            onClick={() =>
              setStartIdx(data.length - 90 >= 0 ? data.length - 90 : 0)
            }
          >
            3 months
          </button>
          <button onClick={() => setStartIdx(0)}>All</button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

//tickFormat={t => t.substring(0, t.length - 5)}
