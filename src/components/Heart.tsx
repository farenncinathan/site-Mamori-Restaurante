// Detalhe vetorial inspirado no motivo do coração. Não substitui nem imita o logotipo.
export default function Heart({ className = "" }: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg viewBox="0 0 64 60" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M32 56C10 40 4 26 4 18a14 14 0 0 1 28-2 14 14 0 0 1 28 2c0 8-6 22-28 38z" stroke="currentColor" />
      <path d="M32 44C19 34 16 27 16 22a8 8 0 0 1 16-1 8 8 0 0 1 16 1c0 5-3 12-16 22z" stroke="#8ebfad" />
    </svg>
  );
}
