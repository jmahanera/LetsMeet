import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [allLocations, events]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length;
      const city = location.split(', ')[0];
      return { city, count };
    });
    return data;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="city" />
        <YAxis type="number" dataKey="count" name="number of events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Bar name="A school" dataKey="count" fill="#8884d8">
          <LabelList dataKey="city" angle={-60} position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
