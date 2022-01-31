/**
 * Alerts
 * Identify the <TextField type="number" /> and alert the user to the manual fix
 */
// yarn codemod --parser=flow -t=packages/gestalt-codemods/42.0.0/remove-textFields-number-prop.js relative/path/to/your/code

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

    // Find the local names of TextField imports
    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'TextField')
      .map((node) => node.local.name);
    return null;
  });

  // No TextField imports, bail
  if (!localIdentifierName) {
    return null;
  }

  src.find(j.JSXElement).forEach((jsxElement) => {
    const { node } = jsxElement;

    if (!localIdentifierName.includes(node.openingElement.name.name)) {
      return null;
    }

    // No dynamic props
    const attrs = node.openingElement.attributes;
    if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
      throw new Error(
        `Remove dynamic TextField properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
      );
    }

    // Identify `type="number"` and alert the use
    attrs.forEach((attr) => {
      const propName = attr?.name?.name;

      // Not type prop, bail
      if (propName !== 'type') {
        return;
      }

      const propValue = attr?.value?.value;

      if (propValue === 'number') {
        throw new Error(
          'Please, prefer use the `NumberField` component rather than use the `type="number"` prop. ' +
            `Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }
    });
  });

  return null;
}
