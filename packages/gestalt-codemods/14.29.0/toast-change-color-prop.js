/*
 * Converts
 *  <Toast color='darkGray' /> to <Button color='white'/>
 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let fileHasModifications = false;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'Toast')
      .map((node) => node.local.name);
    return null;
  });

  if (!localIdentifierName) {
    return null;
  }

  const transform = src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      if (!localIdentifierName.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`
        );
      }

      let tempAttr;
      const newAttrs = attrs
        .map((attr) => {
          if (
            attr?.name?.name &&
            attr.name.name === 'color' &&
            attr.value.value === 'darkGray'
          ) {
            tempAttr = [
              j.jsxAttribute(j.jsxIdentifier('color'), j.literal('white')),
            ];
            return null;
          }
          return attr;
        })
        .filter(Boolean);

      fileHasModifications = true;

      const appendedAttr = tempAttr || false;

      node.openingElement.attributes = appendedAttr
        ? [...newAttrs, ...appendedAttr]
        : newAttrs;
      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
