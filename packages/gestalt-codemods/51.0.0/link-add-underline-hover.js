/*
 * Converts
 *  <Link inline underline="xxx" /> (NO changes)
 *  <Link inline /> to <Link inline underline="hover" />
 */

// Run
// yarn codemod --parser=flow -t=packages/gestalt-codemods/51.0.0/packages/gestalt-codemods/51.0.0/link-add-underline-hover.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let fileHasModifications = false;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'Link')
      .map((node) => node.local.name);
    return null;
  });

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
          `Remove Dynamic properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const isInlined = (attr) => {
        let inlined = false;
        if (attr?.name?.name && attr.name.name === 'inline' && !attr.value) {
          inlined = true;
        }
        if (attr?.name?.name && attr.name.name === 'inline' && attr.value?.value) {
          throw new Error(
            `Inspect this Link manually to evaluate if inline is set dynamically. Location: ${file.path} @line: ${node.loc.start.line}`,
          );
        }

        return inlined;
      };

      const isUnderline = (attr) => attr?.name?.name && attr.name.name === 'underline';

      const hasInline = attrs.filter(isInlined).length > 0;
      const hasUnderline = attrs.filter(isUnderline).length > 0;

      const newAttribute = j.jsxAttribute(j.jsxIdentifier('underline'), j.literal('hover'));
      const newAttributes = [...attrs, newAttribute];

      if (hasInline && !hasUnderline) {
        node.openingElement.attributes = newAttributes;
        fileHasModifications = true;
      }

      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
