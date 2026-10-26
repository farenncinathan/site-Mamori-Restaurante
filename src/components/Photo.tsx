import Image from "next/image";

type Props = { src: string; alt: string; sizes: string; ratio?: string; priority?: boolean; className?: string; pos?: string };

export default function Photo({ src, alt, sizes, ratio = "aspect-[4/5]", priority, className = "", pos = "object-center" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-grafite/5 ${ratio} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${pos}`} />
    </div>
  );
}
