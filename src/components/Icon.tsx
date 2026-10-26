type IconName =
  | "arrow"
  | "arrow-up"
  | "pin"
  | "whatsapp"
  | "instagram"
  | "close"
  | "menu"
  | "left"
  | "right"
  | "expand"
  | "clock"
  | "leaf"
  | "utensils"
  | "heart"
  | "people"
  | "sparkle";

const paths: Record<IconName, React.ReactNode> = {
  leaf: (
    <>
      <path d="M5 21c1-8 5-13 13-18M8 15c-6-2-6-7-5-10 5 0 8 4 7 8M13 10c0-6 4-8 8-8 0 5-3 8-8 8M6 18c3-4 7-4 11-2-2 4-7 5-11 2" />
    </>
  ),
  utensils: (
    <>
      <path d="M5 3v5c0 4 6 4 6 0V3M8 3v18M18 3c-3 4-4 8 0 9h2M20 3v18" />
    </>
  ),
  heart: (
    <path d="M20.5 4.5a5.3 5.3 0 0 0-8.5 1 5.3 5.3 0 0 0-8.5-1c-5 5 1.5 11 8.5 16 7-5 13.5-11 8.5-16Z" />
  ),
  people: (
    <>
      <circle cx="12" cy="6" r="3" />
      <path d="M6 21v-5c0-5 12-5 12 0v5M4 4a3 3 0 0 0 0 6M20 4a3 3 0 0 1 0 6M2 20v-5c0-1 .5-2 2-2M22 20v-5c0-1-.5-2-2-2" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 2c1.5 7 3 8.5 10 10-7 1.5-8.5 3-10 10C10.5 15 9 13.5 2 12c7-1.5 8.5-3 10-10Z" />
      <path d="M20 1v4M18 3h4" />
    </>
  ),
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-up": <path d="M6 18 18 6M6 6h12v12" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.6-4.7A9 9 0 1 1 21 11.5Z" />
      <path d="m8.5 7.5-1 1c0 4 4 7 7 7l1.5-1.5-2.5-1.5-1 1c-1.5-.5-2.5-1.5-3-3l1-1-2-2Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  left: <path d="m14 6-6 6 6 6" />,
  right: <path d="m10 6 6 6-6 6" />,
  expand: <path d="M14 4h6v6M10 20H4v-6M20 4l-6 6M4 20l6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

export default function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
