// @flow strict
// $FlowIssue[signature-verification-failure]
const routes = {};

// $FlowIssue[prop-missing]
const requireCard = require.context('..', true, /\.doc\.js$/);
const paths = requireCard.keys();
paths.sort((a, b) => a.localeCompare(b));
paths.forEach(path => {
  const pathname = path.match(/\.\/(.+)\.doc\.js$/)[1];
  routes[pathname] = requireCard(path).default;
});

export default routes;
