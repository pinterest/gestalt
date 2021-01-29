/**
 * Converts
 *  import { Tooltip } from "gestalt";
 *  <Tooltip {...props}>
 *    {children}
 *   </Tooltip>
 * to
 *  import { Box, Flyout } from "gestalt";
 *  <Flyout {...props} color="darkGray" shouldFocus={false} size="md">
 *    <Box column={12} padding={3}>
 *      {children}
 *    </Box>
 *  </Flyout>
 * in order to depreacte the Tooltip component from gestalt
 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);

  // Fix all the imports
  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }

    // If Tooltip is not used, skip the file
    if (!decl.specifiers.some((node) => node.imported.name === 'Tooltip')) {
      return;
    }

    const newSpecifiers = [
      // Strip out Tooltip import
      ...decl.specifiers.filter((node) => node.imported.name !== 'Tooltip'),
      // Only add the new Flyout import if it is not already imported
      decl.specifiers.every((node) => node.imported.name !== 'Flyout') &&
        j.importSpecifier(j.identifier('Flyout')),
      // Only add the new Box import if it is not already imported
      decl.specifiers.every((node) => node.imported.name !== 'Box') &&
        j.importSpecifier(j.identifier('Box')),
    ].filter(Boolean);

    // Sort all the imports alphabetically
    newSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

    const newNode = j.importDeclaration(newSpecifiers, j.literal('gestalt'));

    j(path).replaceWith(newNode);
  });

  // Fix all the components
  src.find(j.JSXElement).forEach((path) => {
    const { node } = path;

    if (node.openingElement.name.name !== 'Tooltip') {
      return;
    }

    const { attributes } = node.openingElement;

    const hasSizeAttribute = attributes.some((attribute) => attribute.name.name === 'size');

    // Inject the old props with new props to mimic the Tooltip
    const attributesWithTooltipProps = [
      ...attributes,
      j.jsxAttribute(j.jsxIdentifier('shouldFocus'), j.jsxExpressionContainer(j.literal(false))),
      j.jsxAttribute(j.jsxIdentifier('color'), j.stringLiteral('darkGray')),
      !hasSizeAttribute && j.jsxAttribute(j.jsxIdentifier('size'), j.stringLiteral('md')),
    ].filter(Boolean);

    // Sort all the props alphabetically
    attributesWithTooltipProps.sort((a, b) => a.name.name.localeCompare(b.name.name));

    // Create a new child for the Flyout that is the old child wrapped in a Box
    const newChild = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier('Box'), [
        j.jsxAttribute(j.jsxIdentifier('column'), j.jsxExpressionContainer(j.literal(12))),
        j.jsxAttribute(j.jsxIdentifier('padding'), j.jsxExpressionContainer(j.literal(3))),
      ]),
      j.jsxClosingElement(j.jsxIdentifier('Box')),
      node.children,
    );

    // Create the new node that is a Flyout with the new props and new child
    const newNode = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier('Flyout'), attributesWithTooltipProps),
      j.jsxClosingElement(j.jsxIdentifier('Flyout')),
      [newChild],
    );

    // Finally, replace the old Tooltip with the new Flyout
    j(path).replaceWith(newNode);
  });

  // Return new AST
  return src.toSource();
}
