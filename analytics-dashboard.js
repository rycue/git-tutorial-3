// analytics-dashboard.js
// Version 4

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/analytics');
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderChart = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <LineChart width={500} height={300} data={data}>
        <Line type="monotone" dataKey="users" stroke="#8884d8" />
        <Line type="monotone" dataKey="sessions" stroke="#82ca9d" />
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
      </LineChart>
    );
  };

  return (
    <div>
      <h1>Real-time Analytics Dashboard</h1>
      {renderChart()}
    </div>
  );
};

export default AnalyticsDashboard;