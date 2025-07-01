import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { fetchAllRecipes } from '../services/recipeApi';
import '../styles/CusinesChart.css';

const CusinesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllRecipes(1000, 0).then(recipes => {
      // Group by cuisine and calculate average rating
      const cuisineMap = {};
      recipes.forEach(recipe => {
        if (!recipe.cuisine) return;
        const cuisine = recipe.cuisine;
        if (!cuisineMap[cuisine]) {
          cuisineMap[cuisine] = { total: 0, count: 0 };
        }
        cuisineMap[cuisine].total += recipe.rating || 0;
        cuisineMap[cuisine].count += 1;
      });
      const cuisineAverages = Object.entries(cuisineMap).map(([cuisine, { total, count }]) => ({
        cuisine,
        avgRating: count ? total / count : 0,
      }));
      // Sort by avgRating desc and take top 5
      const top5 = cuisineAverages
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 5)
        .map(item => ({ ...item, avgRating: Number(item.avgRating.toFixed(2)) }));
      setData(top5);
    });
  }, []);

  return (
    <div className="cusines-chart-container">
      <h2 className="cusines-chart-title">Top 5 Avg Rated Cuisines</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 24, right: 32, left: 0, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="cuisine" tick={{ fontSize: 14, fill: 'var(--primary-color)' }} />
          <YAxis domain={[0, 5]} tick={{ fontSize: 13 }} allowDecimals={true} />
          <Tooltip formatter={v => v.toFixed(2)} labelStyle={{ color: 'var(--primary-color)' }} />
          <Bar dataKey="avgRating" fill="var(--secondary-color, #ff7f50)" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="avgRating" position="top" formatter={v => v.toFixed(2)} style={{ fill: 'var(--primary-color)', fontWeight: 700, fontSize: 14 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CusinesChart;
