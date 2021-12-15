/*
 * Converts
 *  <Dropdown  dangerouslyRemoveLayer /> to <Dropdown isWithinFixedContainer />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/41.0.0/rename-dropdown-dangerouslyRemoveLayer-to-isWithinFixedContainer.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let fileHasModifications = false;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    // Not Gestalt, bail
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    // Find the local names of Dropdown imports
    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'Dropdown')
      .map((node) => node.local.name);
    return null;
  });

  // No Dropdown imports, bail
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
          `Remove dynamic Dropdown properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAttrs = attrs
        .map((attr) => {
          const propName = attr?.name?.name;

          // Not truncate, bail
          if (propName !== 'dangerouslyRemoveLayer') {
            return attr;
          }

          const propValue = attr?.value?.expression?.value;
          const propValueVariableName = attr?.value?.expression?.name;

          // If explicitly set to false or undefined the prop isn't actually doing anything and can be removed
          if (propValue === false || propValue === null || propValueVariableName === 'undefined') {
            return null;
          }

          if (typeof propValueVariableName === 'string') {
            // eslint-disable-next-line no-console
            console.log(
              `${node.openingElement.name.name} components with ${attr?.name?.name} prop must be converted to lineClamp manually (boolean -> number). Location: ${file.path} @line: ${node.loc.start.line}`,
            );
            return null;
          }
          const renamedAttr = { ...attr };
          renamedAttr.name.name = 'isWithinFixedContainer';
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
