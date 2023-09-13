/*
 * Converts
 *  <Button role='button' /> to <Button />
 *  <Callout primaryAction={{href... /> to <Callout primaryAction={{role={'link'} href... />
 *  <ModalAlert primaryAction={{href... /> to <Callout primaryAction={{role={'link'} href... />
 *  <PopoverEducational primaryAction={{href... /> to <Callout primaryAction={{role={'link'} href... />
 *  <SlimBanner primaryAction={{href... /> to <Callout primaryAction={{role={'link'} href... />
 *  <Toast primaryAction={{href... /> to <Callout primaryAction={{role={'link'} href... />
 *  <Upsell primaryAction={{href... /> to <Callout primaryAction={{role={'link'} href... />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/123.0.0/button-role-link-deprecation.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let codeHasChanged;

  // Find all import declarations
  const importDeclarations = j(file.source).find(j.ImportDeclaration);

  // Map import specifiers to their original names
  const importSpecifierMap = {};

  importDeclarations.forEach((path) => {
    path.node.specifiers.forEach((specifier) => {
      if (specifier.type === 'ImportSpecifier') {
        const originalName = specifier.imported.name;
        const localName = specifier.local.name;
        importSpecifierMap[localName] = originalName;
      }
    });
  });

  const componentsToTransform = [
    'Callout',
    'ModalAlert',
    'PopoverEducational',
    'SlimBanner',
    'Toast',
    'Upsell',
  ];

  const transform = src
    .find(j.JSXElement)
    .filter((path) => {
      const { openingElement } = path.node;
      const elementName = openingElement.name.name;

      return (
        (componentsToTransform.includes(elementName) ||
          componentsToTransform.includes(importSpecifierMap[elementName])) &&
        openingElement.attributes.some(
          (attr) =>
            attr.name.name === 'primaryAction' &&
            attr.value &&
            attr.value.expression &&
            attr.value.expression.properties.some(
              (prop) => prop.key.name === 'href' && prop.value.type !== 'JSXExpressionContainer',
            ),
        )
      );
    })
    .forEach((path) => {
      const primaryActionAttribute = path.node.openingElement.attributes.find(
        (attr) =>
          attr.name.name === 'primaryAction' &&
          attr.value &&
          attr.value.expression &&
          attr.value.expression.properties.some(
            (prop) => prop.key.name === 'href' && prop.value.type !== 'JSXExpressionContainer',
          ),
      );

      if (primaryActionAttribute) {
        // Check if 'role' property is already present
        const roleProperty = primaryActionAttribute.value.expression.properties.find(
          (prop) => prop.key.name === 'role',
        );

        if (!roleProperty) {
          primaryActionAttribute.value.expression.properties.push(
            j.property('init', j.identifier('role'), j.literal('link')),
          );
          codeHasChanged = true;
        }
      }
    })
    .toSource({ quote: 'single' });

  return codeHasChanged ? transform : null;
}
