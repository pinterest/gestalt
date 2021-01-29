/*
 * Converts
 *   <Column xs={12}>
 *     <RenamedColumn md={12} />
 *   </Column>
 * To
 *   <Column spam={12}>
 *     <RenamedColumn mdSpan={12} />
 *   </Column>
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
      .filter((node) => node.imported.name === 'Column')
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
          `Remove Dynamic ${node.openingElement.name.name} properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAppendAttr = [];

      const newAttrs = attrs
        .map((attr) => {
          if (attr?.name?.name && ['xs', 'sm', 'md', 'lg'].includes(attr.name.name)) {
            const renamedAttr = { ...attr };
            renamedAttr.name.name = attr.name.name === 'xs' ? 'span' : `${attr.name.name}Span`;
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
