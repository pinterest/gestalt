/*
 * Converts
 *  <Masonry flexible /> to <Masonry layout="flexible" />
 */

// Run
// yarn codemod --parser=flow -t=packages/gestalt-codemods/59.0.0/masonry-update-flexible-prop.js relative/path/to/your/code

const replaceOrRemoveFlexibleProp = (flexibleProp) => {
  if (!flexibleProp.value || flexibleProp?.value.expression.raw === 'true') {
    return 'replaceFlexibleProp';
  }
  if (flexibleProp?.value.expression.raw === 'false') {
    return 'removeFlexibleProp';
  }
  return null;
};

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
      .filter((node) => node.imported.name === 'Masonry')
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
          `Remove Dynamic properties on Masonry and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const flexibleProp = attrs.find((attr) => attr?.name?.name && attr.name.name === 'flexible');

      if (!flexibleProp) {
        return null;
      }

      const transformType = replaceOrRemoveFlexibleProp(flexibleProp);

      if (!transformType) {
        throw new Error(
          `Inspect Masonry component manually to evaluate if 'flexible' is set dynamically. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      // Remove flexible prop
      node.openingElement.attributes = [
        ...attrs
          .map((attr) => {
            if (attr?.name?.name && attr.name.name === 'flexible') {
              return null;
            }
            return attr;
          })
          .filter(Boolean),
      ];

      // Add layout prop as required
      if (transformType === 'replaceFlexibleProp') {
        const layoutProp = attrs.find((attr) => attr?.name?.name && attr.name.name === 'layout');

        if (!layoutProp) {
          node.openingElement.attributes = [
            ...node.openingElement.attributes,
            j.jsxAttribute(j.jsxIdentifier('layout'), j.literal('flexible')),
          ];
        } else if (!['flexible', 'serverRenderedFlexible'].includes(layoutProp?.value?.value)) {
          throw new Error(
            `Invalid prop combination related to "flexible" on Masonry, please update manually. Location: ${file.path} @line: ${node.loc.start.line}`,
          );
        }
      }

      fileHasModifications = true;

      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
