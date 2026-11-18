import type { Lang } from './LanguageContext';

type Translation = Record<Lang, string>;
export type WorkFilm = { id: string; title: Translation; src: string; poster: string; duration: string };
export type WorkProject = {
  id: string; name: string; category: Translation; description: Translation;
  cover: string; coverPosition: string; wide: boolean; films: WorkFilm[];
};

export const workProjects: WorkProject[] = [
  {
    id: 'amasya', name: 'Amasya Et Ürünleri',
    category: { en: 'Food content / Recipe films', fr: 'Contenu culinaire / Films recettes' },
    description: {
      en: 'From a platter to share to a freshly made sandwich. Three short films putting Amasya’s deli range on the table.',
      fr: 'Une assiette à partager, des sandwichs fraîchement préparés. Trois films courts autour de la gamme de charcuterie Amasya.',
    },
    cover: '/work/amasya/cover-selected-v2.webp', coverPosition: '50% 50%', wide: true,
    films: [
      { id: 'DYMptICtWQQ', title: { en: 'Carpaccio, ready to share', fr: 'Le carpaccio à partager' }, src: '/work/amasya/carpaccio.mp4', poster: '/work/amasya/carpaccio.jpg', duration: '0:23' },
      { id: 'DW0v6tmDNBQ', title: { en: 'Two takes on the gourmet sandwich', fr: 'Le sandwich gourmet, deux façons' }, src: '/work/amasya/sandwiches.mp4', poster: '/work/amasya/sandwiches.jpg', duration: '0:38' },
      { id: 'DYCeCCzoSl5', title: { en: 'A little everyday gourmet', fr: 'Une touche gourmet au quotidien' }, src: '/work/amasya/gourmet-sandwich.mp4', poster: '/work/amasya/gourmet-sandwich.jpg', duration: '0:13' },
    ],
  },
  {
    id: 'unique-natural', name: 'Unique & Natural',
    category: { en: 'Beauty / UGC', fr: 'Beauté / UGC' },
    description: {
      en: 'A close-up look at the lip and cheek balm, with real application, texture and colour at the centre of the story.',
      fr: 'Le baume lèvres et joues en gros plan : une application réelle, sa texture et sa couleur au cœur du récit.',
    },
    cover: '/work/unique-natural/cover-selected-v2.webp', coverPosition: '50% 40%', wide: false,
    films: [
      { id: 'C_vDjxfIOmZ', title: { en: 'Lip & cheek, in real life', fr: 'Lèvres et joues, en vrai' }, src: '/work/unique-natural/lip-and-cheek.mp4', poster: '/work/unique-natural/lip-and-cheek.jpg', duration: '0:44' },
    ],
  },
  {
    id: 'nutbo', name: 'Nutbo',
    category: { en: 'Food films / Product content', fr: 'Films culinaires / Contenu produit' },
    description: {
      en: 'Sauces in motion. Dessert close-ups and recipe films show the range, from the first pour to the finishing touch.',
      fr: 'Les sauces en mouvement. Gros plans gourmands et films recettes, de la première coulée à la touche finale.',
    },
    cover: '/work/nutbo/cover-ivory-v4.webp', coverPosition: '50% 50%', wide: false,
    films: [
      { id: 'DSDCN7diJQQ', title: { en: 'A sauce for every dessert', fr: 'À chaque dessert sa sauce' }, src: '/work/nutbo/sweet-sauces.mp4', poster: '/work/nutbo/sweet-sauces.jpg', duration: '0:19' },
      { id: 'DSXjuUlgms4', title: { en: 'The finishing touch', fr: 'La touche finale' }, src: '/work/nutbo/finishing-touch.mp4', poster: '/work/nutbo/finishing-touch.jpg', duration: '0:25' },
      { id: 'DXHIDWaDJA0', title: { en: 'A sweeter take on semolina', fr: 'La semoule, version gourmande' }, src: '/work/nutbo/semolina.mp4', poster: '/work/nutbo/semolina.jpg', duration: '0:33' },
    ],
  },
  {
    id: 'zambo', name: 'Zambo',
    category: { en: 'Food films / Recipe content', fr: 'Films culinaires / Contenu recette' },
    description: {
      en: 'Chocolate, fruit and a generous pour. Two recipe-led films featuring Zambo’s waffle and crêpe sauces.',
      fr: 'Du chocolat, des fruits et une généreuse coulée. Deux films recettes autour des sauces pour gaufres et crêpes Zambo.',
    },
    cover: '/work/zambo/cover-selected-v2.webp', coverPosition: '70% 50%', wide: true,
    films: [
      { id: 'DSUphjcjTmW', title: { en: 'A colour for every craving', fr: 'Une couleur pour chaque envie' }, src: '/work/zambo/dessert-sauces.mp4', poster: '/work/zambo/dessert-sauces.jpg', duration: '0:28' },
      { id: 'DSIKM0TjUj6', title: { en: 'Waffle, from start to finish', fr: 'La gaufre, de A à Z' }, src: '/work/zambo/waffle.mp4', poster: '/work/zambo/waffle.jpg', duration: '0:28' },
    ],
  },
];
