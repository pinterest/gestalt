/*
 * Converts
 *  <Icon icon='story-pin'/> to <Icon icon='idea-pin'/>
 *  <Icon icon={ true ? 'story-pin' : 'pin'} /> to <Icon icon={ true ? 'idea-pin' : 'pin'} />
 *  <IconButton icon='story-pin'/> to <IconButton icon='idea-pin'/>
 *  <Pog icon='story-pin'/> to <Pog icon='idea-pin'/>
 *  <Button iconEnd='story-pin'/> to <Button iconEnd='idea-pin'/>
 *
 *  Console logs each Module for a manual review as well as icon props with container expressions `icon={ expression }`
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/40.0.0/rename-story-pin-icon-to-idea-pin.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let localModuleIdentifierName;

  let fileHasModifications = false;

  const ICON_NAME_REMOVED = 'story-pin';
  const ICON_NAME_REPLACEMENT = 'idea-pin';

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
          `Remove Dynamic properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAttrs = attrs
        .map((attr) => {
          // Icon, IconButton, Button, Pog: Replace link > visit icons.
          if (
            attr?.name?.name &&
            ['icon', 'iconEnd'].includes(attr.name.name) &&
            attr.value.value === ICON_NAME_REMOVED
          ) {
            const newAttr = attr;
            newAttr.value.value = ICON_NAME_REPLACEMENT;

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

          if (
            attr?.name?.name &&
            ['icon', 'iconEnd'].includes(attr.name.name) &&
            attr.value.type === 'JSXExpressionContainer'
          ) {
            if (
              attr.value.expression.type === 'ConditionalExpression' &&
              (attr.value.expression.consequent?.value === ICON_NAME_REMOVED ||
                attr.value.expression.alternate?.value === ICON_NAME_REMOVED)
            ) {
              const newAttr = attr;
              if (attr.value.expression.consequent.value === ICON_NAME_REMOVED) {
                newAttr.value.expression.consequent.value = ICON_NAME_REPLACEMENT;
              }
              if (attr.value.expression.alternate.value === ICON_NAME_REMOVED) {
                newAttr.value.expression.alternate.value = ICON_NAME_REPLACEMENT;
              }
              return newAttr;
            }

            throw new Error(
              `Manually check Icon component and replace ${ICON_NAME_REMOVED} with ${ICON_NAME_REPLACEMENT} and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
            );
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
