import { buildPreview } from '../utils/validation';

function RecipeCard({ recipe, onViewDetail, onDelete }) {
  return (
    <article className="rounded-card bg-surface border border-border shadow-card overflow-hidden flex flex-col transition-shadow hover:shadow-lift">
      <div className="aspect-[4/3] w-full bg-[#FBEAEC] overflow-hidden">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.namaMakanan}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-5xl" aria-hidden="true">
            🍽️
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink mb-1.5">{recipe.namaMakanan}</h3>
        <p className="text-sm text-ink/60 flex-1 mb-4">{buildPreview(recipe.bahanBahan)}</p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onViewDetail(recipe)}
            className="flex-1 rounded-input bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Lihat Detail
          </button>
          <button
            type="button"
            onClick={() => onDelete(recipe.id)}
            aria-label={`Hapus resep ${recipe.namaMakanan}`}
            className="rounded-input border border-danger px-4 py-2.5 text-sm font-semibold text-danger transition-colors hover:bg-danger hover:text-white"
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
