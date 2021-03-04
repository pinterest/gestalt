/*
 * Detects
 *  <Link onNavigateOptions/>
 *  <Button onNavigateOptions/>
 *  <IconButton onNavigateOptions/>
 *  <TapArea onNavigateOptions/>
 *  <Dropdown onNavigateOptions/>
 *  <Callout primaryAction secondaryAction/>
 *  <Upsell primaryAction secondaryAction/>
 *  <ActivationCard link/>
 *
 *  Console logs each component for a manual update.
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/20.0.0/detect-onNavigateOptions-to-manually-update.js relative/path/to/your/code

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
      .filter((node) =>
        [
          'Link',
          'Button',
          'IconButton',
          'TapArea',
          'Dropdown',
          'Callout',
          'Upsell',
          'ActivationCard',
        ].includes(node.imported.name),
      )
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
        // Module: Console logs cmp if contains props for a manual review.
        if (
          ['onNavigateOptions', 'primaryAction', 'secondaryAction', 'link'].includes(
            attr?.name?.name,
          )
        ) {
          // eslint-disable-next-line no-console
          console.log(
            `${node.openingElement.name.name} components with ${attr?.name?.name} prop must be reviewed manually. If 'onNavigationOptions' is used, it must be manually replaced with 'customOnNavigation'. Location: ${file.path} @line: ${node.loc.start.line}`,
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
