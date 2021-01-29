/**
 * Converts
 *  <Text size="xs" />
 * to
 *  <Text size="md" />
 */

const validHeadingProps = ['color', 'overflow', 'size', 'truncate'];

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Text');
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }

      const hasSize = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'size',
      );

      if (!hasSize) {
        return;
      }

      let hasSizeXL = false;

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && attr.name.name === 'size' && attr.value.value) {
            if (attr.value.value === 'xs') {
              return j.jsxAttribute(j.jsxIdentifier('size'), j.literal('sm'));
            }
            if (attr.value.value === 'sm') {
              return j.jsxAttribute(j.jsxIdentifier('size'), j.literal('md'));
            }
            if (attr.value.value === 'xl') {
              hasSizeXL = true;
              return attr;
            }
            // These sizes moved to the default value of "lg" so just remove custom sizes
            if (['md', 'lg', 'xl'].includes(attr.value.value)) {
              return null;
            }
          }
          return attr;
        })
        .filter(Boolean);

      if (hasSizeXL) {
        let hasBold = false;
        let hasInvalidProp = false;
        const newAttrs = node.openingElement.attributes.reduce((attrs, attr) => {
          if (attr.name.name === 'weight' && attr.value.value === 'bold') {
            hasBold = true;
          } else if (attr.name.name === 'size' && attr.value.value === 'xl') {
            attrs.push(j.jsxAttribute(j.jsxIdentifier('size'), j.literal('sm')));
          } else if (validHeadingProps.includes(attr.name.name)) {
            attrs.push(attr);
          } else {
            hasInvalidProp = true;
          }
          return attrs;
        }, []);
        if (hasBold && !hasInvalidProp) {
          let headingIdentifierName = 'Heading';
          // Check what we imported Heading as (if it isn't already there, manually add import after codemod)
          src.find(j.ImportDeclaration).forEach((importPath) => {
            const decl = importPath.node;
            if (decl.source.value !== 'gestalt') {
              return;
            }
            const specifier = decl.specifiers.find(
              (importNode) => importNode.imported.name === 'Heading',
            );
            if (!specifier) {
              return;
            }
            headingIdentifierName = specifier.local.name;
          });

          // Replace the Text with Heading
          node.openingElement.name.name = headingIdentifierName;
          node.openingElement.attributes = newAttrs;
          node.closingElement.name.name = headingIdentifierName;
        }
      }

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource();

  return hasModifications ? transform : null;
}
