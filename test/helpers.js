const randomString = (length) => {
  const x = 36 ** (length + 1);
  const y = 36 ** length;
  return Math.round(x - (Math.random() * y)).toString(36).slice(1);
};

const pages = [
  {
    route: '/',
    title: 'Eren Özkul',
    heading: 'ABOUT THIS SITE',
  }/*,TODO : GEÇİCİ AÇIKLAMA SATIRI
  {
    route: '/about',
    title: 'About | Eren Özkul',
    heading: 'ABOUT ME',
  },
  {
    route: '/projects',
    title: 'Projects | Eren Özkul',
    heading: 'PROJECTS',
  },
  {
    route: '/stats',
    title: 'Stats | Eren Özkul',
    heading: 'STATS',
  },
  {
    route: '/contact',
    title: 'Contact | Eren Özkul',
    heading: 'CONTACT',
  },*/
];

export { pages, randomString };
