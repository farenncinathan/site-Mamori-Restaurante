// Dados comerciais centralizados. Itens marcados TODO dependem de confirmação do Mamori (ver PENDENCIAS_CLIENTE.md).
export const business = {
  name: "Mamori Comidinhas com Amor",
  phoneDisplay: "(92) 98228-2194",
  whatsappNumber: "5592982282194",
  instagram: "https://www.instagram.com/mamoricomidinhascomamor/",
  // TODO(cliente): diretórios divergem no número da porta; confirmar antes de publicar.
  address: ["Av. Prof. Nilton Lins, quadra 2, nº 18", "Conjunto Parque das Palmeiras, bairro Flores", "Manaus/AM, CEP 69058-030"],
  // Busca pelo nome da empresa, para evitar pinagem errada até a conferência do endereço.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Restaurante+Mamori+Comidinhas+com+Amor+Manaus",
  // A rota abre pelo nome do estabelecimento, sem fixar um número de porta ainda não validado.
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Restaurante+Mamori+Comidinhas+com+Amor+Manaus",
  // TODO(cliente): horários vindos de diretórios públicos; exibidos com aviso.
  hours: [
    { days: "Segunda a sexta", time: "11h às 14h" },
    { days: "Sábado", time: "11h às 15h" },
    { days: "Domingo", time: "Fechado" },
  ],
  hoursNote: "Os horários podem mudar. Na dúvida, confirme pelo WhatsApp.",
  demoNotice: "Projeto demonstrativo independente. Conteúdo sujeito à validação do estabelecimento.",
};

export const messages = {
  cardapio: "Olá! Gostaria de saber quais são as opções do buffet de hoje no Mamori.",
  geral: "Olá! Vim pelo site e gostaria de falar com o Mamori.",
};

export const wa = (text?: string) =>
  `https://wa.me/${business.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
