/*
 * Converts
 *  <Icon icon='story-pin'/> to <Icon icon='idea-pin'/>
 *  <IconButton icon='story-pin'/> to <IconButton icon='idea-pin'/>
 *  <Pog icon='story-pin'/> to <Pog icon='idea-pin'/>
 *  <Button iconEnd='story-pin'/> to <Button iconEnd='idea-pin'/>
 *
 *  Console logs each Module for a manual review.
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/19.0.0/rename-story-pin-icon-to-idea-pin.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let localModuleIdentifierName;

  let fileHasModifications = false;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierName = decl.specifiers
      .filter((node) => ['Icon', 'IconButton', 'Pog', 'Button'].includes(node.imported.name))
      .map((node) => node.local.name);

    localModuleIdentifierName = decl.specifiers
      .filter((node) => ['Module'].includes(node.imported.name))
      .map((node) => node.local.name);

    return null;
  });

  if (!localIdentifierName && !localModuleIdentifierName) {
    return null;
  }

  const transform = src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      if (
        !localIdentifierName.includes(node.openingElement.name.name) &&
        !localModuleIdentifierName.includes(node.openingElement.name.name)
      ) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAttrs = attrs
        .map((attr) => {
          // Icon, IconButton, Button, Pog: Replace link > visit icons.
          if (
            attr?.name?.name &&
            ['icon', 'iconEnd'].includes(attr.name.name) &&
            attr.value.value === 'story-pin'
          ) {
            const newAttr = attr;
            newAttr.value.value = 'idea-pin';

            return newAttr;
          }

          // Module: Console logs cmp if contains 'items' prop for a manual review.
          if (
            localModuleIdentifierName.includes(node.openingElement.name.name) &&
            attr?.name?.name === 'items'
          ) {
            // eslint-disable-next-line no-console
            console.log(
              `Module.Expandable components with 'items' prop must be reviewed manually. If 'items' prop contains icon, replace "story-pin" with "idea-pin". Location: ${file.path} @line: ${node.loc.start.line}`,
            );

            return attr;
          }
          return attr;
        })
        .filter(Boolean);

      fileHasModifications = true;

      node.openingElement.attributes = newAttrs;
      return null;
    })
    .toSource({ quote: 'single' });

  return fileHasModifications ? transform : null;
}
