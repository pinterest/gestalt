/**
 * Converts
 *  <Toast text="Help" color="orange" icon="arrow-circle-forward" />
 * to
 *  <Toast text="Help" />
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
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Toast');
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;
      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }

      const hasColorAttribute = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'color',
      );

      const hasIconAttribute = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'icon',
      );

      if (!hasColorAttribute && !hasIconAttribute) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && (attr.name.name === 'color' || attr.name.name === 'icon')) {
            return null;
          }
          return attr;
        })
        .filter(Boolean);

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource();

  return hasModifications ? transform : null;
}
