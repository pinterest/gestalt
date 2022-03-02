/*
 * Converts
 *   <Sheet ref={ref}/>
 *   <Modal ref={ref}/>
 * To
 *   <Sheet />
 *   <Modal />
 */

// Run
// yarn codemod --parser=flow -t=packages/gestalt-codemods/28.0.0/sheet_modal_deprecate_ref_props.js relative/path/to/your/code

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
      .filter((node) => ['Sheet', 'Modal'].includes(node.imported.name))
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

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic ${node.openingElement.name.name} properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }
      attrs
        .map((attr) => {
          if (attr?.name?.name && attr.name.name === 'ref') {
            // eslint-disable-next-line no-console
            console.log(
              `Manually remove ref: Location: ${file.path} @line: ${node.loc.start.line}`,
            );
            return attr;
          }
          return attr;
        })
        .filter(Boolean);

      return null;
    })
    .toSource();

  return null;
}
