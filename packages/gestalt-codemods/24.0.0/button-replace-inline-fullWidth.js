/*
 * Converts
 *  <Button inline/> to <Button fullWidth={false} />
 *  <Button inline={false}/> to <Button fullWidth />
 *  <Button inline={inline} /> to CONSOLE.LOG for manual change />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/24.0.0/button-replace-inline-fullWidth.js relative/path/to/your/code

const transformMap = {
  inline: 'fullWidth',
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
      .filter((node) => ['Button'].includes(node.imported.name))
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

      const newAppendAttr = [];
      const newAttrs = attrs
        .map((attr) => {
          const attrName = attr?.name?.name;
          const disallowedProps = Object.keys(transformMap);

          if (attrName && disallowedProps.includes(attrName)) {
            const renamedAttr = { ...attr };
            renamedAttr.name.name = transformMap[attrName];
            if (attr?.value?.expression?.value === false) {
              return false;
            }
            if (typeof attr?.value?.expression?.name === 'string') {
              // eslint-disable-next-line no-console
              console.log(
                `${node.openingElement.name.name} components with ${attr?.name?.name} prop must be converted to fullWidth manually (truthy/falsy logic must be reversed). Location: ${file.path} @line: ${node.loc.start.line}`,
              );
            }
            if (attr.value === null) {
              return j.jsxAttribute(
                j.jsxIdentifier('fullWidth'),
                j.jsxExpressionContainer(j.booleanLiteral(false)),
              );
            }
            return renamedAttr;
          }
          return attr;
        })
        .filter(Boolean);

      fileHasModifications = true;
      node.openingElement.attributes = [...newAppendAttr, ...newAttrs];
      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
