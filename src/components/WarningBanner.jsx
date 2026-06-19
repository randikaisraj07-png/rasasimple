function WarningBanner() {
  return (
    <div
      role="status"
      className="mx-auto max-w-5xl px-5"
    >
      <div className="flex items-start gap-3 rounded-card border border-[#F6D9B8] bg-[#FFF6E9] px-5 py-4 shadow-soft">
        <span aria-hidden="true" className="text-lg leading-none">
          ⚠️
        </span>
        <p className="text-sm text-ink/80">
          Data hanya tersimpan selama halaman terbuka dan akan hilang setelah browser direfresh.
        </p>
      </div>
    </div>
  );
}

export default WarningBanner;
