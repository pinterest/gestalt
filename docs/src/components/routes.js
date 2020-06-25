// @flow strict
const routes = {};

const requireCard = require.context('..', true, /\.doc\.js$/);
const paths = requireCard.keys();
paths.sort((a, b) => a.localeCompare(b));
paths.forEach(path => {
  const pathname = path.match(/\.\/(.+)\.doc\.js$/)[1];
  routes[pathname] = {
    cards: requireCard(path).default,
    navRoute: requireCard(path).navRoute,
  };
});

export default routes;
