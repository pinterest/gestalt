const deprecateResponsiveBoints = (j, attributes) =>
  attributes.reduce((acc, attr) => {
    switch (attr.name.name) {
      case 'margin':
        return acc.concat(j.jsxAttribute(j.jsxIdentifier('deprecatedMargin'), attr.value));
      case 'padding':
        return acc.concat(j.jsxAttribute(j.jsxIdentifier('deprecatedPadding'), attr.value));
      default:
        return acc.concat(attr);
    }
  }, []);

const promoteStaticBoints = (j, attributes) =>
  attributes.reduce((acc, attr) => {
    const { name } = attr.name;
    if (
      attr.name.name.startsWith('_margin') ||
      attr.name.name.startsWith('_padding') ||
      attr.name.name.startsWith('_sm') ||
      attr.name.name.startsWith('_md') ||
      attr.name.name.startsWith('_lg')
    ) {
      return acc.concat(j.jsxAttribute(j.jsxIdentifier(name.replace(/^_/, '')), attr.value));
    }
    return acc.concat(attr);
  }, []);

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  const pkg = 'gestalt';
  const component = 'Box';

  const locals = src
    .find(j.ImportDeclaration, {
      source: {
        value: pkg,
      },
    })
    .find(j.ImportSpecifier, {
      imported: {
        name: component,
      },
    });

  if (locals.size() === 0) {
    return src.toSource();
  }

  return src
    .find(j.JSXOpeningElement, {
      name: {
        name: locals.nodes()[0].local.name,
      },
    })
    .replaceWith((path) => {
      const { node } = path;
      const { attributes } = node;

      if (attributes.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Dynamic Box properties encountered at ${file.path}:${node.loc.start.line}`,
        );
      }

      return j.jsxOpeningElement(
        j.jsxIdentifier(node.name.name),
        promoteStaticBoints(j, deprecateResponsiveBoints(j, node.attributes, file)),
        node.selfClosing,
      );
    })
    .toSource();
}
