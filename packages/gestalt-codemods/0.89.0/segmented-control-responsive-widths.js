/**
 * Converts
 *  <SegmentedControl ... />
 * to
 *  <SegmentedControl ... responsive />
 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.imported.name === 'SegmentedControl');
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  return src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;
      if (!localIdentifierName || node.openingElement.name.name !== localIdentifierName) {
        return;
      }
      const attrs = node.openingElement.attributes;
      attrs.push(j.jsxAttribute(j.jsxIdentifier('responsive')));

      j(path).replaceWith(node);
    })
    .toSource();
}
