import { useState } from 'react';
import Hero from './components/Hero';
import WarningBanner from './components/WarningBanner';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetailModal from './components/RecipeDetailModal';
import { defaultRecipes } from './data/defaultRecipes';

function App() {
  const [recipes, setRecipes] = useState(defaultRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleAddRecipe = (recipe) => {
    setRecipes((prev) => [recipe, ...prev]);
  };

  const handleDeleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const handleViewDetail = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <WarningBanner />
      <RecipeForm onAddRecipe={handleAddRecipe} />
      <RecipeList
        recipes={recipes}
        onViewDetail={handleViewDetail}
        onDelete={handleDeleteRecipe}
      />
      <RecipeDetailModal recipe={selectedRecipe} onClose={handleCloseDetail} />
    </div>
  );
}

export default App;
