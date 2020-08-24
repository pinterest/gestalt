/*
 * Converts
 *  <Box xs={{ column: 12, display: "flex" }}>
 *   <RenamedBox md={{ column: 12, display: false }} />
 *   <RenamedBox sm={{ column: 12, display: "flexColumn" }} />
 *   <RenamedBox lg={{ column: 12, display: true }} />
 *  </Box>
 * To
 * <Box column={12} display="flex">
 *  <RenamedBox mdColumn={12} mdDisplay="none" />
 *  <RenamedBox smColumn={12} smDisplay="flex" smDirection="column" />
 *  <RenamedBox lgColumn={12} />
 * </Box>

 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let fileHasModifications = false;

  src.find(j.ImportDeclaration).forEach(path => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierName = decl.specifiers
      .filter(node => node.imported.name === 'Colun')
      .map(node => node.local.name);
    return null;
  });

  if (!localIdentifierName) {
    return null;
  }

  const transform = src
    .find(j.JSXElement)
    .forEach(jsxElement => {
      const { node } = jsxElement;

      if (!localIdentifierName.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some(attr => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`
        );
      }

      const newAppendAttr = [];
      const newAttrs = attrs
        .map(attr => {
          if (attr?.name?.name && attr.name.name === 'description') {
            const renamedAttr = { ...attr };
            renamedAttr.name.name = 'message';
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
