import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchAllRecipes } from '../services/recipeApi';
import '../styles/CusinesPieChart.css';

const COLORS = [
  '#784062', '#ff7f50', '#edb654', '#6ec6ca', '#b2b2b2',
  '#a3d977', '#f7b267', '#f4845f', '#5c5470', '#b8b5ff',
];

const isMobile = () => window.innerWidth <= 700;

const CusinesPieChart = () => {
  const [data, setData] = useState([]);
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchAllRecipes(1000, 0).then(recipes => {
      const cuisineCount = {};
      recipes.forEach(recipe => {
        if (!recipe.cuisine) return;
        const cuisine = recipe.cuisine;
        cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
      });
      const chartData = Object.entries(cuisineCount).map(([cuisine, count]) => ({
        name: cuisine,
        value: count,
      }));
      // Sort by value desc, show top 8, group rest as 'Other'
      chartData.sort((a, b) => b.value - a.value);
      let top = chartData.slice(0, 8);
      let other = chartData.slice(8);
      if (other.length > 0) {
        const otherSum = other.reduce((sum, item) => sum + item.value, 0);
        top.push({ name: 'Other', value: otherSum });
      }
      setData(top);
    });
  }, []);

  return (
    <div className="cusines-piechart-container">
      <h2 className="cusines-piechart-title">Cuisine Distribution</h2>
      <ResponsiveContainer width="100%" height={mobile ? 260 : 300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={50}
            fill="#784062"
            label={mobile ? false : ({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v} recipes`} />
        </PieChart>
      </ResponsiveContainer>
      {mobile && (
        <div className="cusines-piechart-legend">
          {data.map((entry, idx) => (
            <span key={entry.name} className="cusines-piechart-legend-item">
              <span className="cusines-piechart-legend-color" style={{ background: COLORS[idx % COLORS.length] }} />
              {entry.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CusinesPieChart;
