/**
 * Convert Heading and Text Sterling components to use new size values using codemod
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/47.0.0/future-typo-changes.js relative/path/to/your/code

export default function transformer({ source }, { jscodeshift }) {
  const researchReference = ['Heading', 'Text'];
  let localIdentifierName;
  let fileHasModifications = false;

  // Verify the imports on file
  const src = jscodeshift(source);
  src.find(jscodeshift.ImportDeclaration).forEach((path) => {
    const decl = path.node;

    // Not Gestalt, bail
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    // Not to research, bail
    localIdentifierName = decl.specifiers
      .filter((node) => researchReference.includes(node.imported.name))
      .map((node) => node.local.name);

    return null;
  });

  // No elements imported, bail
  if (!localIdentifierName) {
    return null;
  }

  const transform = src
    .find(jscodeshift.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      // No elements to refact, bail
      const { name } = node.openingElement.name;
      if (!researchReference.includes(name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;
      if (attrs.length === 0) {
        return null;
      }

      const newAttrs = attrs
        .map((attr) => {
          const propName = attr?.name?.name;

          // Not size prop, bail
          if (propName !== 'size') {
            return attr;
          }

          let propValue = null;
          if (attr?.value?.type !== 'Literal') {
            propValue = attr?.value?.expression?.value;
          } else {
            propValue = attr?.value?.value;
          }

          const propValueVariableName = attr?.value?.expression?.name;

          // If explicitly set to false or undefined the prop isn't actually doing anything and can be removed
          if (propValue === false || propValue === null || propValueVariableName === 'undefined') {
            return null;
          }

          const reValued = { ...attr };

          if (typeof propValue === 'number') {
            reValued.value = jscodeshift.stringLiteral(propValue.toString());
          }

          if (propValue === 'sm') {
            reValued.value = jscodeshift.stringLiteral('100');
          }

          if (propValue === 'md') {
            reValued.value = jscodeshift.stringLiteral('200');
          }

          if (propValue === 'lg') {
            reValued.value = jscodeshift.stringLiteral('300');
          }

          return reValued;
        })
        .filter(Boolean);

      fileHasModifications = true;
      node.openingElement.attributes = newAttrs;

      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
