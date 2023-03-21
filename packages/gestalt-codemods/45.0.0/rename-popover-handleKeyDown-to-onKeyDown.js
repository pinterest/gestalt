/*
 * Converts
 *  <Popover handleKeyDown /> to <Popover onKeyDown />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/45.0.0/rename-popover-handleKeyDown-to-onKeyDown.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let fileHasModifications = false;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    // Not Gestalt, return
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    // Find the local names of Popover imports
    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'Popover')
      .map((node) => node.local.name);
    return null;
  });

  // No Popover imports, return
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
          `Remove dynamic Popover properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAttrs = attrs
        .map((attr) => {
          const propName = attr?.name?.name;

          // Not handleKeyDown prop, return
          if (propName !== 'handleKeyDown') {
            return attr;
          }

          const renamedAttr = { ...attr };

          renamedAttr.name.name = 'onKeyDown';

          // eslint-disable-next-line no-console
          console.log(
            `Popover prop handleKeyDown has being renamed to onKeyDown. Please, manually refactor the event from (event) to ({ event }) as well.   Location: ${file.path} @line: ${node.loc.start.line}`,
          );

          return renamedAttr;
        })
        .filter(Boolean);

      fileHasModifications = true;
      node.openingElement.attributes = newAttrs;

      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
