/*
 * Converts
 *  <SelectList options={foo} /> to <SelectList>{foo.map((item) => <SelectList.Option {...item} />)}</SelectList>
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/71.0.0/select-list-options-to-children.js relative/path/to/your/code

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

    // Find the local names of SelectList imports
    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'SelectList')
      .map((node) => node.local.name);
    return null;
  });

  // No SelectList imports, bail
  if (!localIdentifierName) {
    return null;
  }

  const transform = src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      // This isn't SelectList, bail
      if (!localIdentifierName.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      // Spread props can't be codemodded, prompt for manual update
      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove dynamic SelectList properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      // If the options are defined inline (array literal)
      let options;
      // If the options are a variable defined elsewhere
      let optionsVariableName;

      // Map through existing attributes, grabbing the value for `options` and removing it as a prop
      const newAttrs = attrs
        .map((attr) => {
          const propName = attr?.name?.name;

          // Not `options`, bail
          if (propName !== 'options') {
            return attr;
          }

          // options defined inline
          if (
            attr?.value?.type === 'JSXExpressionContainer' &&
            attr?.value?.expression?.type === 'ArrayExpression'
          ) {
            options = attr?.value?.expression?.elements;
            return null;
          }

          // options defined with a variable
          if (
            attr?.value?.type === 'JSXExpressionContainer' &&
            attr?.value?.expression?.type === 'Identifier'
          ) {
            optionsVariableName = attr?.value?.expression?.name;
            return null;
          }

          // Something weird is going on here, this should never be reached
          // eslint-disable-next-line no-console
          console.log(
            `${node.openingElement.name.name} components with "option" prop must be converted to use ${node.openingElement.name.name}.Option manually. Location: ${file.path} @line: ${node.loc.start.line}`,
          );
          return null;
        })
        .filter(Boolean);

      if (options || optionsVariableName) {
        fileHasModifications = true;

        const arrowFuncArgName = 'item';
        const jsxElementName = localIdentifierName[0] ?? 'SelectList';

        // Reassign the new attributes, which no longer contain `options`
        node.openingElement.attributes = newAttrs;
        // We're adding children, so this is no longer self-closing and we need a closing element
        node.openingElement.selfClosing = false;
        node.closingElement = j.jsxClosingElement(j.jsxIdentifier(jsxElementName));

        const mapTarget = options ? j.arrayExpression(options) : j.identifier(optionsVariableName);

        // Add the existing options array as mapped children
        node.children = [
          // The JSX curly brackets, essentially
          j.jsxExpressionContainer(
            // Let's call an expression
            j.callExpression(
              j.memberExpression(
                // The array we're calling the expression on
                mapTarget,
                // What we're calling
                j.identifier('map'),
              ),
              // The expression itself (the map function)
              [
                j.arrowFunctionExpression(
                  // The local args we're defining
                  [j.identifier(arrowFuncArgName)],
                  // What we're returning (the SelectList.Option element)
                  j.jsxElement(
                    j.jsxOpeningElement(
                      j.jsxMemberExpression(
                        // The local name for the SelectList import
                        j.jsxIdentifier(jsxElementName),
                        // The subcomponent name
                        j.jsxIdentifier('Option'),
                      ),
                      // Attributes for the SelectList.Option element
                      [
                        j.jsxAttribute(
                          // Gotta give it a key, we're returning an array of elements
                          j.jsxIdentifier('key'),
                          j.jsxExpressionContainer(
                            j.memberExpression(
                              j.identifier(arrowFuncArgName),
                              j.identifier('label'),
                            ),
                          ),
                        ),
                        // And we'll spread the rest of the props for convenience
                        j.jsxSpreadAttribute(j.identifier(arrowFuncArgName)),
                      ],
                      true,
                    ),
                  ),
                  true,
                ),
              ],
            ),
          ),
        ];
      }

      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
