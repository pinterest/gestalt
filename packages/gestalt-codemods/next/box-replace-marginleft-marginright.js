/*
 * Converts
 *  <Box marginLeft={...} marginRight={...} /> to <Box marginStart={...} marginEnd={...} />
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
      .filter((node) => ['Box'].includes(node.imported.name))
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

      const newAppendAttr = [];
      const newAttrs = attrs
        .map((attr) => {
          if (attr?.name?.name && attr.name.name === 'marginLeft') {
            const renamedAttr = { ...attr };
            renamedAttr.name.name = 'marginStart';
            return renamedAttr;
          }
          if (attr?.name?.name && attr.name.name === 'marginRight') {
            const renamedAttr = { ...attr };
            renamedAttr.name.name = 'marginEnd';
            return renamedAttr;
          }
          return attr;
        })
        .filter(Boolean);

      fileHasModifications = true;
      node.openingElement.attributes = [...newAppendAttr, ...newAttrs];
      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
