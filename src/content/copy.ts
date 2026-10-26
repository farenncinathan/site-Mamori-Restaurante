export const nav = [
  { href: "#mamori", label: "O Mamori" },
  { href: "#historia", label: "Nossa história" },
  { href: "#sabores", label: "Nossos sabores" },
  { href: "#espaco", label: "O espaço" },
  { href: "#visita", label: "Como chegar" },
];

export const copy = {
  hero: {
    eyebrow: "Uma mesa acolhedora no bairro Flores, Manaus",
    titleLines: ["Comida de verdade.", "Boa companhia."],
    emphasis: "Sinta-se em casa.",
    text: "Receitas brasileiras, um buffet cheio de escolhas e o carinho de uma cozinha de família. No Mamori, sempre cabe uma boa pausa para o almoço.",
    photo: {
      src: "/images/pratos/peixe-assado.jpg",
      alt: "Peixe assado inteiro sobre folha de bananeira, com limões ao lado, em travessa do buffet do Mamori",
      caption: "Um dos sabores do nosso buffet",
    },
  },
  intro: {
    features: [
      {
        title: "Sabores brasileiros",
        text: "Receitas conhecidas, acompanhamentos e opções para montar o prato do seu jeito.",
      },
      {
        title: "Grelhados no buffet",
        text: "Carnes e acompanhamentos que variam com as escolhas da nossa cozinha.",
      },
      {
        title: "Cozinha de família",
        text: "Uma história de cuidado com a comida e com quem chega à nossa mesa.",
      },
      {
        title: "Feito para reunir",
        text: "Uma pausa no almoço, uma conversa boa e um lugar para se sentir à vontade.",
      },
    ],
    eyebrow: "Muito prazer, Mamori",
    titleLines: ["Uma casa de portas", "e panelas abertas."],
    text: "O almoço por aqui tem variedade no balcão, conversa à mesa e receitas de família. Você escolhe o que vai no prato. A gente cuida do resto.",
    themes: [
      { title: "Buffet", text: "Variedade para montar o prato do seu jeito." },
      { title: "Grelhados", text: "Carnes e churrasco, conforme o dia." },
      {
        title: "Sabores regionais",
        text: "Receitas brasileiras, com um olhar para a nossa região.",
      },
    ],
    photo: {
      src: "/images/buffet/buffet-02.jpg",
      alt: "Balcão do buffet com frango, enroladinhos ao molho de tomate, gratinados e saladas",
    },
  },
  gallery: {
    eyebrow: "Um passeio pelo buffet",
    title: "Da nossa cozinha,",
    emphasis: "para a sua mesa.",
    text: "Dos clássicos brasileiros aos sabores da nossa região. Um pouco do que você encontra por aqui.",
    // Proporção da imagem original, usada na visualização ampliada sem cortes.
    items: [
      {
        src: "/images/buffet/buffet-01.jpg",
        ratio: 0.755,
        alt: "Balcão do buffet com travessas de arroz, carne cozida, gratinados e frango assado",
        caption: "Buffet",
        description: "Arroz, acompanhamentos e receitas que mudam com os dias.",
        category: "Buffet",
      },
      {
        src: "/images/pratos/lasanha-de-carne.jpg",
        ratio: 0.739,
        alt: "Travessa de vidro com lasanha de carne gratinada, com etiqueta escrita à mão",
        caption: "Lasanha de carne",
        description: "Uma das receitas que já passaram pelo nosso balcão.",
        category: "Da cozinha",
      },
      {
        src: "/images/pratos/churrasco.jpg",
        ratio: 0.727,
        alt: "Carnes grelhadas, linguiças e miúdos em travessa de ferro, com espeto ao fundo",
        caption: "Churrasco",
        description: "Grelhados e acompanhamentos, conforme as opções do dia.",
        category: "Da cozinha",
      },
      {
        src: "/images/pratos/prato-servido.jpg",
        ratio: 0.764,
        alt: "Prato com arroz branco, frango em molho amarelo e ovos cozidos, sobre a mesa de madeira",
        caption: "Prato servido",
        description: "Você escolhe o que vai no prato. A gente cuida do resto.",
        category: "Da cozinha",
      },
      {
        src: "/images/buffet/buffet-04.jpg",
        ratio: 0.744,
        alt: "Travessas coloridas do buffet: salada de grão-de-bico com ovos, ovos fritos e arroz temperado",
        caption: "Buffet do almoço",
        description:
          "Saladas, acompanhamentos e variedade para a hora do almoço.",
        category: "Buffet",
      },
      {
        src: "/images/pratos/sobremesa.jpg",
        ratio: 0.796,
        alt: "Caixinha com doces cobertos de creme de chocolate e de baunilha, com biscoito escuro por cima",
        caption: "Sobremesa",
        description:
          "Um doce para encerrar a pausa. Consulte a disponibilidade.",
        category: "Doces",
      },
    ],
    note: "O buffet muda ao longo da semana. Pergunte o que tem de bom hoje.",
    cta: "Consultar opções do dia",
  },
  space: {
    eyebrow: "Puxe uma cadeira",
    titleLines: ["A pausa do dia", "tem lugar certo."],
    text: "Mesas de madeira, o nosso coração na parede e espaço para uma boa conversa. Venha conhecer o Mamori de perto.",
    mural: {
      src: "/images/ambiente/mural-coracao.jpg",
      alt: "Mural do salão com coração rosa e verde-claro, peixe e panelas desenhados em traço preto, mesas de madeira à frente",
    },
    salao: {
      src: "/images/ambiente/salao-01.jpg",
      alt: "Salão do Mamori com mesas e bancos de madeira, prateleira de garrafas na parede e piso de ladrilho",
    },
  },
  story: {
    eyebrow: "Nossa história",
    titleLines: ["Uma história feita de", "comida e afeto."],
    emphasis: "Desde 1999.",
    paragraphs: [
      "Em 1999, Fábio e Iracema deram os primeiros passos no Bar e Lanche do Mamuri. Um lugar simples, onde vizinhos se encontravam, amigos se reuniam e famílias compartilhavam momentos — quase uma extensão de casa.",
      "Em 2015, nasceu o Restaurante Mamori Comidinhas com Amor. O novo capítulo levou para a mesa o cuidado e o aconchego de sempre. Iracema transformou sua paixão pela cozinha em profissão, deixando seu carinho em cada receita.",
      "Hoje, a família segue construindo essa história. Entre pratos servidos, encontros e lembranças, permanece o desejo de unir pessoas pelo sabor e pelo afeto.",
    ],
    milestones: [
      {
        year: "1999",
        title: "O começo",
        text: "Fábio e Iracema abrem o Bar e Lanche do Mamuri, ponto de encontro da vizinhança.",
      },
      {
        year: "2015",
        title: "Uma nova fase",
        text: "Nasce o Restaurante Mamori Comidinhas com Amor, com a cozinha de Iracema no centro dessa história.",
      },
      {
        year: "Hoje",
        title: "A história continua",
        text: "A família mantém vivo o legado de receber, cozinhar e reunir pessoas.",
      },
    ],
    photo: {
      src: "/images/equipe/equipe-01.jpg",
      alt: "Equipe do Mamori reunida no salão, de uniforme, segurando sacolas",
      caption: "As pessoas que fazem parte dessa história",
    },
  },
  reviews: {
    eyebrow: "A conversa continua",
    title: "Já sentou à nossa mesa?",
    text: "Conheça as experiências de quem já passou por aqui.",
    cta: "Avaliações no Google",
  },
};
