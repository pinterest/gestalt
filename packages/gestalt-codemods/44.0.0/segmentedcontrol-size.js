/**
  - Removes `size` prop from SegmentedControl
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/44.0.0/segmentedcontrol-size.js relative/path/to/your/code

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
      .filter((node) => node.imported?.name === 'SegmentedControl')
      .map((node) => node.local?.name);

    return null;
  });

  // No SegmentedControls here, move along
  if (!localIdentifierNames || localIdentifierNames.length === 0) {
    return null;
  }

  return src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;
      const nodeName = node.openingElement.name.name;

      // We only care about SegmentedControl
      if (!localIdentifierNames.includes(nodeName)) {
        return;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic SegmentedControl properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      // Remove SegmentedControl's `size`
      node.openingElement.attributes = attrs.filter((attr) => attr?.name?.name !== 'size');
    })
    .toSource();
}
