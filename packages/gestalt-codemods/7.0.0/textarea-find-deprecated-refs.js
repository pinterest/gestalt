/*
 * Log an error when a `ref` is specified on `<TextArea />`
 * In 7.0.0 we added forwardRef functionality to TextArea which will break places which already set `ref` on TextArea
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
      .filter((node) => node.imported.name === 'TextArea')
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
        if (attr.name && attr.name.name === 'ref') {
          // eslint-disable-next-line no-console
          console.error(
            `Update legacy ref on TextArea: ${file.path}:${attr.loc.start.line}:${attr.loc.start.column}`,
          );
        }
      });
      return null;
    })
    .toSource();

  return null;
}
