import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HealthData, Theme } from '../types';

interface ActivityChartProps {
  data: HealthData[];
  theme: Theme;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data, theme }) => {
  const chartData = data.map(item => ({
    name: new Date(item.date).toLocaleDateString('en-us', { weekday: 'short' }),
    Steps: item.steps,
    Calories: item.mealAnalysis?.calories ?? 0,
  }));

  const colors = {
    light: {
      grid: '#e5e7eb',
      text: '#6b7280',
      tooltipBg: '#ffffff',
      tooltipBorder: '#e5e7eb',
    },
    dark: {
      grid: '#475569',
      text: '#9ca3af',
      tooltipBg: '#0c4a6e',
      tooltipBorder: '#075985',
    }
  }

  const currentTheme = colors[theme];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.grid} />
          <XAxis dataKey="name" stroke={currentTheme.text} fontSize={12} />
          <YAxis yAxisId="left" orientation="left" stroke={currentTheme.text} fontSize={12} />
          <YAxis yAxisId="right" orientation="right" stroke={currentTheme.text} fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: currentTheme.tooltipBg,
              border: `1px solid ${currentTheme.tooltipBorder}`,
              borderRadius: '0.5rem' 
            }}
            labelStyle={{ color: currentTheme.text }}
          />
          <Legend wrapperStyle={{fontSize: "14px", color: currentTheme.text}}/>
          <Bar yAxisId="left" dataKey="Steps" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="Calories" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;