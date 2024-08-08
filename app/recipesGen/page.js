"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const RecipePage = () => {
  const router = useRouter();
  const { recipes } = router.query;
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    if (recipes) {
      setRecipesData(JSON.parse(recipes));
    }
  }, [recipes]);

  return (
    <div>
      <h1>Generated Recipes</h1>
      {recipesData.length > 0 ? (
        <div>
          {recipesData.map((recipe, index) => (
            <div key={index}>
              <h3>Recipe {index + 1}</h3>
              <p>{recipe}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default RecipePage;
