/*
 * Converts
 *  <Module badgeText="new" /> to <Module badge={{text: "New"}} />
 *  <Heading truncate={truncate} /> to console.log for manual change />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/46.0.0/new_badge_props.js relative/path/to/your/code

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

    // Find the local names of Heading imports
    localIdentifierName = decl.specifiers
      .filter((node) => ['Module', 'Dropdown'].includes(node.imported.name))
      .map((node) => node.local.name);
    return null;
  });

  // No Heading imports, bail
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
          `Remove dynamic Heading properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAttrs = attrs
        .map((attr) => {
          const propName = attr?.name?.name;

          // Not truncate, bail
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
          renamedAttr.value = `{{text="${propValue}"}}`;
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
