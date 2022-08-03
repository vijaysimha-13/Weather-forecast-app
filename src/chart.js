import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function Chart({temps, num}) {
  const data = [
    {
      time: `${num%24}:00`,
      temp: temps[0],
    },
    {
      time: `${(num+3)%24}:00`,
      temp: temps[1],
    },
    {
      time: `${(num+6)%24}:00`,
      temp: temps[2],
    },
    {
      time: `${(num+9)%24}:00`,
      temp: temps[3],
    },
    {
      time: `${(num+12)%24}:00`,
      temp: temps[4],
    },
  ];
    return (
      <ResponsiveContainer width="50%" aspect={2.5}>
        <AreaChart
          width={300}
          height={3000}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid horizontal='false' vertical='false'/>
          <XAxis dataKey="time" stroke='#fff'/>
          <YAxis dataKey="temp" stroke='#fff'/>
          <Tooltip />
          <Area type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
}

export default Chart;