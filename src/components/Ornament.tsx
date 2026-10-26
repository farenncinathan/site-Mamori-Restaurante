export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <span className={`ornament ${className}`} aria-hidden="true">
      <span />
      <svg width="25" height="29" viewBox="0 0 28 32" fill="none">
        <path
          d="M14 2c1.5 9 3 11 12 14-9 2-10.5 5-12 14C12 21 10.5 18 2 16c8.5-3 10-5 12-14Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span />
    </span>
  );
}
