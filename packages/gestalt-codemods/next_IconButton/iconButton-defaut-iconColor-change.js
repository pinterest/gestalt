/*
 * Converts
 *  <IconButton bgColor="transparent" /> to <IconButton bgColor="transparent" iconColor="gray"iconColor="gray" />
 *  <IconButton /> to <IconButton iconColor="gray" />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/next_IconButton/iconButton-defaut-iconColor-change.js relative/path/to/your/code

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

      const bgColorAttr = attrs.find((attr) => attr?.name?.name === 'bgColor');
      const iconColorAttr = attrs.find((attr) => attr?.name?.name === 'iconColor');

      // If bgColor and iconColor props aren't literal values, review manually. No automated changes will refact this component.
      if (
        bgColorAttr?.value?.type === 'JSXExpressionContainer' ||
        iconColorAttr?.value?.type === 'JSXExpressionContainer'
      ) {
        // eslint-disable-next-line no-console
        console.log(
          `Review this ${node.openingElement.name.name} with bgColor and iconColor prop manually. Location: ${file.path} @line: ${node.loc.start.line}`,
        );

        return null;
      }

      const bgColorAttrValue = bgColorAttr?.value?.value;
      const iconColorAttrValue = iconColorAttr?.value?.value;
      // DO NOTHING if
      if (bgColorAttrValue && bgColorAttrValue !== 'transparent') return null; // bgColor is already set to transparent or default transparent
      if (iconColorAttrValue) return null; // iconColor is already set

      // ADD iconColor="gray" if bgColor is transparent and there's no iconColor
      if ((bgColorAttrValue === 'transparent' || !bgColorAttrValue) && !iconColorAttrValue) {
        fileHasModifications = true;
      }

      node.openingElement.attributes = [
        ...attrs,
        j.jsxAttribute(j.jsxIdentifier('iconColor'), j.stringLiteral('gray')),
      ];

      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
