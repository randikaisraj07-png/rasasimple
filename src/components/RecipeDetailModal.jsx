import { useEffect, useRef } from 'react';

function RecipeDetailModal({ recipe, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-card bg-surface shadow-lift"
      >
        <div className="aspect-[16/9] w-full bg-[#FBEAEC] overflow-hidden rounded-t-card">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.namaMakanan}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-6xl" aria-hidden="true">
              🍽️
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-5">
            <h2 id="modal-title" className="text-2xl font-bold text-ink">
              {recipe.namaMakanan}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup detail resep"
              className="shrink-0 rounded-full h-9 w-9 flex items-center justify-center text-ink/60 hover:bg-background hover:text-ink transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
              Bahan-bahan
            </h3>
            <p className="text-ink/80 whitespace-pre-line leading-relaxed">{recipe.bahanBahan}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
              Cara Membuat
            </h3>
            <p className="text-ink/80 whitespace-pre-line leading-relaxed">{recipe.caraMembuat}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailModal;
