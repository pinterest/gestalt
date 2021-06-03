/*
 * Detects
 *  <Provider colorScheme="" id="" onNavigation={}/>
 *
 *  Console logs each component for a manual update.
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/23.0.0/detect-Provider-to-manually-update.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierName = decl.specifiers
      .filter((node) => ['Provider'].includes(node.imported.name))
      .map((node) => node.local.name);

    return null;
  });

  if (!localIdentifierName) {
    return null;
  }

  src.find(j.JSXElement).forEach((jsxElement) => {
    const { node } = jsxElement;

    if (!localIdentifierName.includes(node.openingElement.name.name)) {
      return null;
    }

    const attrs = node.openingElement.attributes;

    if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
      throw new Error(
        `Remove Dynamic Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
      );
    }

    attrs
      .map((attr) => {
        // Provider: Console logs cmp if contains props for a manual review.
        if (['colorScheme', 'id'].includes(attr?.name?.name)) {
          // eslint-disable-next-line no-console
          console.log(
            `${node.openingElement.name.name} components with ${attr?.name?.name} prop must be converted to ColorSchemeProvider manually. Location: ${file.path} @line: ${node.loc.start.line}`,
          );

          return attr;
        }
        if (['onNavigation'].includes(attr?.name?.name)) {
          // eslint-disable-next-line no-console
          console.log(
            `${node.openingElement.name.name} components with ${attr?.name?.name} prop must be converted to OnLinkNavigationProvider manually. Location: ${file.path} @line: ${node.loc.start.line}`,
          );

          return attr;
        }
        return attr;
      })
      .filter(Boolean);

    return null;
  });

  return null;
}
