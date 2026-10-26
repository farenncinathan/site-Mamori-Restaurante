import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/standard-italic.css";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { business } from "@/content/business";

export const metadata: Metadata = {
  // TODO(cliente): trocar pelo domínio real após autorização.
  metadataBase: new URL("http://localhost:3000"),
  title: "Mamori Comidinhas com Amor | Almoço no bairro Flores, Manaus",
  description:
    "Buffet de comida brasileira no bairro Flores, em Manaus. Veja fotos do buffet e do salão e consulte as opções do dia pelo WhatsApp.",
  robots: { index: false, follow: false }, // protótipo privado: remover só com autorização do restaurante
  openGraph: {
    title: business.name,
    description: "Almoço no bairro Flores, em Manaus.",
    locale: "pt_BR",
    type: "website",
    images: ["/images/pratos/peixe-assado.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: business.name,
  telephone: "+5592982282194",
  sameAs: [business.instagram],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
