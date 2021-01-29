/*
 * Converts
 *  <Text smSize="sm" size="xs" lgSize="lg" /> to <Text size="xs"/>
 *  <Heading smSize="sm" size="xs" lgSize="lg" /> to <Heading size="xs"/>
 */

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
      .filter((node) => node.imported.name === 'Text' || node.imported.name === 'Heading')
      .map((node) => node.local.name); // Save Alias for Gestalt Text / Heading
    return null;
  });

  if (!localIdentifierName) {
    return null;
  }

  const transform = src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;
      const oldSizes = {};

      if (!localIdentifierName.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic ${node.openingElement.name.name} properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAttrs = attrs
        .map((attr) => {
          if (
            !attr?.name?.name ||
            !['size', 'smSize', 'mdSize', 'lgSize'].includes(attr?.name?.name)
          ) {
            return attr;
          }

          if (attr.name.name === 'size') {
            oldSizes.hasSize = true;
            return attr.value.type === 'Literal' && attr.value.value === 'md' ? null : attr;
          }

          oldSizes.hasResponsiveSizes = true;

          if (attr.value.type !== 'Literal') {
            oldSizes.skipTransform = true;

            throw new Error(
              `Replace Text size attributes from ${attr.value.type} to strings and rerun codemod if needed. Location: ${file.path} @line: ${node.loc.start.line}`,
            );
          }
          if (!['xs', 'sm', 'md', 'lg', 'xl'].includes(attr.value.value)) {
            oldSizes.skipTransform = true;

            throw new Error(
              `Replace invalid Text size attributes to be 'xs', 'sm', 'md', 'lg' or 'xl' and rerun codemod if needed. Location: ${file.path} @line: ${node.loc.start.line}`,
            );
          }

          oldSizes[attr.name.name] = attr.value.value;

          return null;
        })
        .filter(Boolean);

      if (oldSizes.hasResponsiveSizes && oldSizes.hasSize) {
        node.openingElement.attributes = newAttrs;
      }

      const newSize = oldSizes.lgSize || oldSizes.mdSize || oldSizes.smSize;

      if (!oldSizes.hasSize && !oldSizes.skipTransform && newSize) {
        if (newSize !== 'md') {
          newAttrs.unshift(j.jsxAttribute(j.jsxIdentifier('size'), j.literal(newSize)));
        }
        node.openingElement.attributes = newAttrs;
      }

      fileHasModifications = true;
      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
