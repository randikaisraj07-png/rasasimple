import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onViewDetail, onDelete }) {
  return (
    <section aria-labelledby="list-heading" className="mx-auto max-w-5xl px-5 mt-10 mb-16">
      <h2 id="list-heading" className="text-xl font-bold text-ink mb-5">
        Resep Kamu ({recipes.length})
      </h2>

      {recipes.length === 0 ? (
        <div className="rounded-card border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-ink/60">
            Belum ada resep. Tambahkan resep pertamamu lewat formulir di atas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewDetail={onViewDetail}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecipeList;
