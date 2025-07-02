import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchAllRecipes } from '../services/recipeApi';
import '../styles/MealPieChart.css';

const COLORS = [
  '#784062', '#ff7f50', '#edb654', '#6ec6ca', '#b2b2b2',
  '#a3d977', '#f7b267', '#f4845f', '#5c5470', '#b8b5ff',
];

const isMobile = () => window.innerWidth <= 700;

const MealPieChart = () => {
  const [data, setData] = useState([]);
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchAllRecipes(1000, 0).then(recipes => {
      const mealTypeCount = {};
      recipes.forEach(recipe => {
        if (!recipe.mealType) return;
        const types = Array.isArray(recipe.mealType) ? recipe.mealType : [recipe.mealType];
        types.forEach(type => {
          if (!type) return;
          const key = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
          mealTypeCount[key] = (mealTypeCount[key] || 0) + 1;
        });
      });
      const chartData = Object.entries(mealTypeCount).map(([meal, count]) => ({
        name: meal,
        value: count,
      }));
      // Sort by value desc
      chartData.sort((a, b) => b.value - a.value);
      setData(chartData);
    });
  }, []);

  return (
    <div className="meal-piechart-container">
      <h2 className="meal-piechart-title">Meal Type Distribution</h2>
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
        <div className="meal-piechart-legend">
          {data.map((entry, idx) => (
            <span key={entry.name} className="meal-piechart-legend-item">
              <span className="meal-piechart-legend-color" style={{ background: COLORS[idx % COLORS.length] }} />
              {entry.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealPieChart;
