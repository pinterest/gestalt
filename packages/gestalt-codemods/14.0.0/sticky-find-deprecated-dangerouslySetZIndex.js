/*
 * Log an error when `dangerouslySetZIndex` is specified on `<Sticky />`
 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'Sticky')
      .map((node) => node.local.name);
    return null;
  });

  if (!localIdentifierName) {
    return null;
  }

  src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      if (!localIdentifierName.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      attrs.forEach((attr) => {
        if (attr.name && attr.name.name === 'dangerouslySetZIndex') {
          // eslint-disable-next-line no-console
          console.error(
            `Replace legacy dangerouslySetZIndex with zIndex on Sticky: ${file.path}:${attr.loc.start.line}:${attr.loc.start.column}`,
          );
        }
      });
      return null;
    })
    .toSource();

  return null;
}
