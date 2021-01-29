export default function transformer(file, api) {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== 'Icon') {
        return;
      }

      node.openingElement.attributes.push(j.jsxAttribute(j.jsxIdentifier('inline')));

      j(path).replaceWith(node);
    })
    .toSource();
}
