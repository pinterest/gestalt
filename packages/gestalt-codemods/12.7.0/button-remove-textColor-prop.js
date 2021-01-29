/*
 * Converts
 *  <Button textColor='red' /> to <Button/>
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
      .filter((node) => node.imported.name === 'Button')
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
          `Remove Dynamic Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      let tempAttr;
      let newAttribute;
      const newAttrs = attrs
        .map((attr) => {
          if (
            attr?.name?.name &&
            attr.name.name === 'color' &&
            attr.value.value === 'transparent'
          ) {
            tempAttr = [attr];
            return null;
          }

          if (attr?.name?.name && attr.name.name === 'textColor') {
            if (attr.value.value === 'white') {
              newAttribute = [
                j.jsxAttribute(j.jsxIdentifier('color'), j.literal('transparentWhiteText')),
              ];
            }
            return null;
          }
          return attr;
        })
        .filter(Boolean);

      fileHasModifications = true;

      let appendedAttr = tempAttr || false;
      appendedAttr = tempAttr && newAttribute ? newAttribute : tempAttr;

      node.openingElement.attributes = appendedAttr ? [...newAttrs, ...appendedAttr] : newAttrs;
      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
