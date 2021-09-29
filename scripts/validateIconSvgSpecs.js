#!/usr/bin/env node
require('@babel/register');
const globby = require('globby');
const fs = require('fs');

const iconSvgValidation = async () => {
  const files = await globby(['packages/gestalt/src/icons/*.svg']);
  const templateRegexp = new RegExp(
    /<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="24" height="24"><path d="([a-z]|[A-Z]|[0-9.\-,\s])*"\/><\/svg>/,
    'g',
  );

  const nonConformatFilesArr = await Promise.all(
    files.map(async (file) => {
      const svgFile = await fs.promises.readFile(file, 'utf8');
      const followsTemplateRegexp = Array.from(svgFile.matchAll(templateRegexp));
      if (followsTemplateRegexp.length === 0) {
        return `- ${file}`;
      }
      return false;
    }),
  );

  const nonConformatFiles = nonConformatFilesArr.filter((file) => !!file);

  if (nonConformatFiles.length) {
    throw new Error(
      `❌ The following Icon svg ${
        nonConformatFiles.length > 1 ? 'files do not' : 'file does not'
      } conform to format guidelines:

${nonConformatFiles.join('\n')}

Icon svg files must adhere the following pattern:

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="<replace with icon path"/></svg>
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
