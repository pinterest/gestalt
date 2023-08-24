import fs from 'fs';
import {
  API,
  ASTPath,
  Collection,
  FileInfo,
  JSCodeshift,
  JSXAttribute,
  JSXElement,
  JSXSpreadAttribute,
} from 'jscodeshift';

const targetComponent = process.env.COMP;
const fileNames: string[] = JSON.parse(process.env.FILENAMES || '[]');
const exampleNames: string[] = JSON.parse(process.env.EXAMPLENAMES || '[]');
const componentFolder = `./docs/examples/${targetComponent}`;

const descriptions = [];

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const hasSampleCodeImport = root.find(j.ImportDeclaration, {
    source: { value: '../../docs-components/SandpackExample.js' },
  }).length;

  if (!hasSampleCodeImport) {
    const sampleCodeImportStatement = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier('SandpackExample'))],
      j.literal('../../docs-components/SandpackExample.js')
    );
    root
      .find(j.ImportDeclaration)
      .at(-1)
      .insertAfter(sampleCodeImportStatement);
  }
  let i = 0;
  // Find all JSXElements named "Card"
  root
    .find(j.JSXElement)
    .filter((path) => {
      const jsxElement = path.node.openingElement;

      return (
        (jsxElement.name.type === 'JSXMemberExpression' &&
          jsxElement.name.object.type === 'JSXIdentifier' &&
          jsxElement.name.object.name === 'MainSection' &&
          jsxElement.name.property.name === 'Card') ||
        (jsxElement.name.type === 'JSXIdentifier' &&
          jsxElement.name.name === 'PageHeader')
      );
    })
    .forEach((path) => {
      const cardAttributes = path.node.openingElement.attributes;

      // Find the prop named "defaultCode" on the Card component
      const defaultCodeAttribute = cardAttributes?.find(
        (attribute: JSXAttribute) =>
          attribute.name && attribute.name.name === 'defaultCode'
      );

      // Check if "defaultCode" prop exists
      if (!defaultCodeAttribute || defaultCodeAttribute.type !== 'JSXAttribute')
        return;

      function findDescriptiom(
        attrs: (JSXAttribute | JSXSpreadAttribute)[] | undefined,
        name = 'description'
      ) {
        return attrs?.find(
          (attribute: JSXAttribute) =>
            attribute.name && attribute.name.name === name
        );
      }

      function getAttrText(attr: any) {
        return (
          attr?.value?.value ||
          attr?.value?.expression.quasis?.[0].value.raw.trim() ||
          null
        );
      }

      // console.log(path.parent.parent);
      const descriptionAttribute =
        findDescriptiom(cardAttributes) ||
        findDescriptiom(path.parent.value.openingElement.attributes) ||
        findDescriptiom(path.parent.parent.value.openingElement.attributes);

      const titleAttribute =
        findDescriptiom(path.parent.value.openingElement.attributes, 'title') ||
        findDescriptiom(
          path.parent.parent.value.openingElement.attributes,
          'title'
        );

      const typeAttribute = findDescriptiom(cardAttributes, 'type');

      const descriptionText = getAttrText(descriptionAttribute);
      const titleText = getAttrText(titleAttribute);
      const typeText = getAttrText(typeAttribute);

      descriptions.push({
        type: typeText,
        title: titleText,
        description: descriptionText,
      });

      if (!fileNames.length) return;

      const oldval =
        //@ts-ignore
        defaultCodeAttribute.value.expression.quasis?.[0].value.raw;

      const oldvalroot = j(oldval.replace('\\$', '$').replaceAll('\\`', '`'));
      const funcDecls = oldvalroot.find(j.FunctionDeclaration);

      const localCompNames = oldvalroot
        .find(j.VariableDeclaration)
        .filter(
          (nod) =>
            !!nod.value?.declarations?.[0].id.name &&
            nod.value?.declarations?.[0].id.name.match(/^[A-Z]/)
        )
        .nodes()
        .map((nod) => nod.declarations?.[0].id.name);

      const usedComps = Array.from(
        new Set(
          oldvalroot
            .findJSXElements()
            .nodes()
            .map(
              (node) =>
                node.openingElement.name.name ||
                node.openingElement.name.object.name
            )
            .filter((node) => node && node.match(/^[A-Z]/))
            .concat('Box')
            .filter((comp) => !localCompNames.includes(comp))
        )
      );
      const hasState = oldval.includes('React.useState');
      const nodeTypeImport = j.importDeclaration(
        [
          j.importSpecifier(j.identifier('type Node')),
          ...(hasState ? [j.importSpecifier(j.identifier('useState'))] : []),
        ],
        j.literal('react')
      );
      const compImport = j.importDeclaration(
        usedComps.map((c) => j.importSpecifier(j.identifier(c))),
        j.literal('gestalt')
      );

      findReturnJSX(j, funcDecls, (p: ASTPath<any>) => {
        p.node.argument = wrapBox(j, p.node.argument);
      });

      const dec =
        funcDecls.nodes()[0] ||
        j.functionDeclaration(
          j.identifier('Example'),
          [],
          j.blockStatement([
            j.returnStatement(
              j.jsxText(
                '<Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">' +
                  oldval +
                  '</Box>'
              )
            ),
          ])
        );

      let wrapper = j.program([
        nodeTypeImport,
        compImport,
        j.exportDefaultDeclaration(dec),
      ]);

      j(wrapper)
        .find(j.FunctionDeclaration)
        .forEach((path) => {
          j(path)
            .find(j.VariableDeclaration)
            .filter(
              (nod) =>
                !!nod.value?.declarations[0].id.name &&
                nod.value?.declarations[0].id.name.match(/^[A-Z]/)
            )
            .forEach((nod) => {
              j(path.parent).insertBefore(nod.node);
              j(nod).remove();
            });
        });

      const exampleNameProp = exampleNames[i];
      const exampleName = fileNames[i];
      const exampleFileName = `${exampleName}.js`;
      const exampleFileContent =
        '// @flow strict\n' +
        j(wrapper)
          .toSource()
          .replace(/Example\(\)/, 'Example(): Node')
          .replace(/React\.useState/g, 'useState') +
        '\n';

      if (!fs.existsSync(componentFolder)) {
        fs.mkdirSync(componentFolder);
      }

      fs.writeFileSync(
        `${componentFolder}/${exampleFileName}`,
        exampleFileContent
      );

      const sandpackAttrs = [
        j.jsxAttribute(j.jsxIdentifier('name'), j.literal(exampleNameProp)),
        j.jsxAttribute(
          j.jsxIdentifier('code'),
          j.jsxExpressionContainer(j.identifier(exampleName))
        ),
      ];

      if (!!typeText) {
        sandpackAttrs.push(j.jsxAttribute(j.jsxIdentifier('hideEditor')));
        sandpackAttrs.push(
          j.jsxAttribute(j.jsxIdentifier('layout'), j.literal('column'))
        );
      }

      if (typeText === "don't")
        sandpackAttrs.push(j.jsxAttribute(j.jsxIdentifier('hideControls')));

      defaultCodeAttribute.name.name = 'sandpackExample';
      defaultCodeAttribute.value = j.jsxExpressionContainer(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxIdentifier('SandpackExample'),
            sandpackAttrs,
            true
          )
        )
      );

      // Add import statement for "sampleCode" if it doesn't exist
      const sampleCodeImportStatement = j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier(exampleName))],
        j.literal(`../../examples/${targetComponent}/${exampleFileName}`)
      );
      root
        .find(j.ImportDeclaration)
        .at(-1)
        .insertAfter(sampleCodeImportStatement);

      i++;
    });

  fs.writeFileSync('./descriptions.json', JSON.stringify(descriptions));

  return root.toSource();
}

function findReturnJSX(j: JSCodeshift, funcDecls: Collection, clb: any) {
  funcDecls.forEach((path) => {
    j(path).find(j.ReturnStatement).forEach(clb);
  });
}

function wrapBox(j: JSCodeshift, a: JSXElement) {
  return j.jsxElement(
    j.jsxOpeningElement(
      j.jsxIdentifier('Box'),
      [
        j.jsxAttribute(
          j.jsxIdentifier('padding'),
          j.jsxExpressionContainer(j.numericLiteral(8))
        ),
        j.jsxAttribute(j.jsxIdentifier('height'), j.literal('100%')),
        j.jsxAttribute(j.jsxIdentifier('display'), j.literal('flex')),
        j.jsxAttribute(j.jsxIdentifier('alignItems'), j.literal('center')),
        j.jsxAttribute(j.jsxIdentifier('justifyContent'), j.literal('center')),
      ],
      false
    ),
    j.jsxClosingElement(j.jsxIdentifier('Box')),
    [a]
  );
}
