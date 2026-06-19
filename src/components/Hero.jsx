function Hero() {
  return (
    <header className="bg-surface">
      <div className="mx-auto max-w-5xl px-5 pt-12 pb-8 sm:pt-16 sm:pb-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
          <span aria-hidden="true">🍜</span> RasaSimpel
        </h1>
        <p className="mt-3 text-lg sm:text-xl font-semibold text-ink">
          Catat resep favoritmu dengan cepat.
        </p>
        <p className="mt-2 text-sm sm:text-base text-ink/60 max-w-xl mx-auto">
          Simpan, lihat, dan kelola resep makanan favorit tanpa login dan tanpa ribet.
        </p>
      </div>
    </header>
  );
}

export default Hero;
