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
  let codeHasChanged = false;

  const imports = src.find(j.ImportDeclaration);

  // Store component mappings
  const componentMappings = {
    Button: 'Button',
    Callout: 'Callout',
    ModalAlert: 'ModalAlert',
    PopoverEducational: 'PopoverEducational',
    SlimBanner: 'SlimBanner',
    Toast: 'Toast',
    Upsell: 'Upsell',
  };

  imports.forEach((path) => {
    const importSource = path.value.source.value;
    const importSpecifiers = path.value.specifiers;

    // Check if the import is being renamed
    if (importSource && importSpecifiers) {
      importSpecifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          const originalName = specifier.imported.name;
          const renamedName = specifier.local.name;
          componentMappings[renamedName] = componentMappings[originalName];
        }
      });
    }
  });

  // Helper function to update an attribute's value
  function updateAttribute(attributes, attributeName, newValue) {
    return attributes.map((attr) => {
      if (attr.name.name === attributeName) {
        return j.jsxAttribute(
          j.jsxIdentifier(attributeName),
          j.jsxExpressionContainer(j.literal(newValue)),
        );
      }
      codeHasChanged = true;
      return attr;
    });
  }

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const node = path.value;
      const componentName = node.openingElement.name.name;

      // Check if the component is in the mappings
      if (componentMappings[componentName]) {
        // Get the mapped component name
        const mappedComponentName = componentMappings[componentName];

        switch (mappedComponentName) {
          case 'Button':
            // Update Button role attribute
            node.openingElement.attributes = updateAttribute(
              node.openingElement.attributes,
              'role',
              undefined,
            );
            break;
          case 'Callout':
          case 'ModalAlert':
          case 'PopoverEducational':
          case 'SlimBanner':
          case 'Toast':
          case 'Upsell':
            // Update primaryAction attribute
            node.openingElement.attributes = updateAttribute(
              node.openingElement.attributes,
              'primaryAction',
              { role: 'link', ...node.openingElement.attributes[0].value.expression },
            );
            break;
          default:
            break;
        }
      }
    })
    .toSource({ quote: 'single' });

  return codeHasChanged ? transform : null;
}
