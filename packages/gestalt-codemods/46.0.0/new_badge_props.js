/*
 * Converts
 *  <Module badgeText="new" /> to <Module badge={{text: "New"}} />
 *  <Heading truncate={truncate} /> to console.log for manual change />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/46.0.0/new_badge_props.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierNames;
  let fileHasModifications = false;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    // Not Gestalt, bail
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    // Find the local names of Dropdown and Module imports
    localIdentifierNames = decl.specifiers
      .filter((node) => ['Dropdown', 'Module'].includes(node.imported.name))
      .map((node) => node.local.name);
    return null;
  });

  // No Module or Dropdown imports, bail
  if (!localIdentifierNames) {
    return null;
  }

  const transform = src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;
      const nodeName = node.openingElement.name.name;
      const nodeObjectName = node.openingElement.name.object?.name;

      // If it's not Module or Dropdown.___
      if (
        !localIdentifierNames.includes(nodeName) &&
        !localIdentifierNames.includes(nodeObjectName)
      ) {
        return;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove dynamic badgeText properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAttrs = attrs
        .map((attr) => {
          const propName = attr?.name?.name;

          // Not badgeText, bail
          if (propName !== 'badgeText') {
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
              `${node.openingElement.name.name} components with ${attr?.name?.name} prop must be converted to a "badge" object manually (string -> object with text and optionally type). Location: ${file.path} @line: ${node.loc.start.line}`,
            );
            return null;
          }
          const renamedAttr = { ...attr };
          renamedAttr.name.name = 'badge';
          renamedAttr.value = `{{text: "${attr?.value?.value}"}}`;
          return renamedAttr;
        })
        .filter(Boolean);

      fileHasModifications = true;
      node.openingElement.attributes = newAttrs;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
