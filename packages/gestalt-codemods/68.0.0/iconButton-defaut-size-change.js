/*
 * Converts
 *  <IconButton /> to <IconButton size="md" />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/68.0.0/iconButton-defaut-size-change.js relative/path/to/your/code

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

    // Find the local names of IconButton imports
    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'IconButton')
      .map((node) => node.local.name);
    return null;
  });

  // No IconButton imports, bail
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
          `Remove dynamic IconButton properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const sizeAttr = attrs.find((attr) => attr?.name?.name === 'size');

      // If size prop isn't a literal values, review manually. No automated changes will refact this component.
      if (sizeAttr?.value?.type === 'JSXExpressionContainer') {
        // eslint-disable-next-line no-console
        console.log(
          `Review this ${node.openingElement.name.name} with size prop manually. Location: ${file.path} @line: ${node.loc.start.line}`,
        );

        return null;
      }

      const sizeAttrValue = sizeAttr?.value?.value;
      // DO NOTHING if
      if (sizeAttrValue) return null; // sizeAttrValue is already set

      // ADD size="md" if size is set to default
      if (!sizeAttrValue) {
        fileHasModifications = true;
      }

      node.openingElement.attributes = [
        ...attrs,
        j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('md')),
      ];

      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
