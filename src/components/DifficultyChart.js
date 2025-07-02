import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { fetchAllRecipes } from '../services/recipeApi';
import '../styles/DifficultyChart.css';

const COLORS = ['#784062', '#ff7f50', '#edb654'];

const DifficultyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllRecipes(1000, 0).then(recipes => {
      const difficultyCount = { easy: 0, medium: 0, hard: 0 };
      recipes.forEach(recipe => {
        const diff = (recipe.difficulty || '').toLowerCase();
        if (diff && difficultyCount.hasOwnProperty(diff)) {
          difficultyCount[diff] += 1;
        }
      });
      setData([
        { difficulty: 'Easy', value: difficultyCount.easy },
        { difficulty: 'Medium', value: difficultyCount.medium },
        { difficulty: 'Hard', value: difficultyCount.hard },
      ]);
    });
  }, []);

  return (
    <div className="difficulty-chart-container">
      <h2 className="difficulty-chart-title">Recipe Difficulty Distribution</h2>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart cx="50%" cy="50%" outerRadius={100} data={data}>
          <PolarGrid stroke="#eee" />
          <PolarAngleAxis dataKey="difficulty" tick={{ fontSize: 14, fill: '#784062' }} />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fontSize: 12 }} />
          <Radar name="Recipes" dataKey="value" stroke="#784062" fill="#784062" fillOpacity={0.5} />
          <Tooltip formatter={(v) => `${v} recipes`} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyChart;
