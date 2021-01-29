/*
# Setup
    jscodeshift --transform ~/src/gestalt/scripts/stats/transform.js --parser flow --dry ~/src/my-repo > ~/Desktop/gestalt-stats.csv
*/
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const p = file.path;
  const src = j(file.source);
  const localIdentifierNames = {};

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    decl.specifiers.forEach((node) => {
      localIdentifierNames[node.local.name] = node.imported.name;
    });
  });

  src.find(j.JSXOpeningElement).forEach((path) => {
    const { node } = path;
    const { name } = node.name;
    const isInGestalt = Object.prototype.hasOwnProperty.call(localIdentifierNames, name);
    const isTest = p.endsWith('test.js');
    // eslint-disable-next-line no-console
    console.log(`${[p, localIdentifierNames[name] || name, isTest, isInGestalt].join(';')}`);
  });
}
