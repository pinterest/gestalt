/**
  - Removes `size` prop from Tabs
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/27.0.0/tabs-size.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierNames;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierNames = decl.specifiers
      .filter((node) => node.imported?.name === 'Tabs')
      .map((node) => node.local?.name);

    return null;
  });

  if (!localIdentifierNames || localIdentifierNames.length === 0) {
    return null;
  }

  return src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      if (!localIdentifierNames.includes(node.openingElement.name.name)) {
        return;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic Dropdown properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      node.openingElement.attributes = attrs.filter((attr) => attr?.name?.name !== 'size');
    })
    .toSource();
}
