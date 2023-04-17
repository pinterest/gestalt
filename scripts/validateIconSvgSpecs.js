#!/usr/bin/env node
require('@babel/register');
const fs = require('fs');
const globby = require('globby');
const { parseString } = require('xml2js');

const requiredAttributesAndValues = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '24',
};

const iconSvgValidation = async () => {
  const files = await globby(['packages/gestalt/src/icons/*.svg']);

  const nonConformatFilesArr = await Promise.all(
    files.map(async (file) => {
      let hasError = false;
      const svgFile = await fs.promises.readFile(file, 'utf8');

      parseString(svgFile, (err, result) => {
        const { svg } = result;
        // Is the outermost element an svg?
        if (!svg) {
          hasError = true;
          return;
        }
        // Does the svg have the required attributes?
        const svgAttributes = result.svg.$;
        Object.keys(requiredAttributesAndValues).forEach((key) => {
          if (svgAttributes[key] !== requiredAttributesAndValues[key]) {
            hasError = true;
          }
        });
        // Does the svg have any extra attributes?
        const extraAttributes = Object.keys(svgAttributes).filter(
          (key) => !Object.keys(requiredAttributesAndValues).includes(key),
        );
        if (extraAttributes.length > 0) {
          hasError = true;
        }
        // Does the svg have a path element?
        if (!result.svg.path) {
          hasError = true;
        }
        // Does the path element have a d attribute?
        if (!result.svg.path[0].$.d) {
          hasError = true;
        }
        // Does the path element have any extra attributes?
        const pathAttributes = result.svg.path[0].$;
        const extraPathAttributes = Object.keys(pathAttributes).filter((key) => key !== 'd');
        if (extraPathAttributes.length > 0) {
          hasError = true;
        }
        // Does the svg have any extra elements?
        const extraElements = Object.keys(result.svg).filter(
          (key) => key !== '$' && key !== 'path',
        );
        if (extraElements.length > 0) {
          hasError = true;
        }
      });
      return hasError ? `- ${file}` : null;
    }),
  );

  const nonConformatFiles = nonConformatFilesArr.filter(Boolean);

  if (nonConformatFiles.length) {
    throw new Error(
      `❌ The following Icon svg ${
        nonConformatFiles.length > 1 ? 'files do not' : 'file does not'
      } conform to format guidelines:

${nonConformatFiles.join('\n')}

Icon svg files must adhere the following pattern:

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="{replace with icon path}"/></svg>
      `,
    );
  }
  // eslint-disable-next-line no-console
  console.log(`✅ All Icon svg files conform to guidelines.`);
};

(async function cssValidate() {
  try {
    await iconSvgValidation();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
})();
