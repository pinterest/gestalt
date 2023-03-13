#!/usr/bin/env node
const glob = require('glob');
const jsc = require('jscodeshift');
const flowParser = require('jscodeshift/parser/flow');
const fs = require('fs');
const convert = require('@khanacademy/flow-to-ts/dist/convert.bundle.js');
const ts = require('typescript');

// Get a map of the components we need to create TypeScript declaration files
const indexFile = glob.sync('./packages/gestalt/src/index.js', {
  root: './',
});

const indexFileContent = fs.readFileSync(indexFile[0], 'utf-8');

const ast = jsc(indexFileContent, {
  parser: flowParser(),
});

const indexExports = ast.find(jsc.ExportNamedDeclaration).nodes();

const componentIndex = indexExports[0].specifiers.map((node) => node.exported.name);

const componentMap = new Map();

componentIndex.forEach((cmp, idx) => componentMap.set(cmp, idx));

// Get all files before filtering them out by exported component
const files = glob.sync('./packages/gestalt/src/**/*.js', {
  root: './',
  ignore: ['./packages/gestalt/src/**/*.*test*.js'],
});

const GESTALT_DIRECTORY = './packages/gestalt/';

const TYPESCRIPT_DIRECTORY = `${GESTALT_DIRECTORY}typescript`;

const DECLARATION_DIRECTORY = `${GESTALT_DIRECTORY}declarations`;

// Create typescript directory iF doesn't exist
if (!fs.existsSync(TYPESCRIPT_DIRECTORY)) {
  fs.mkdirSync(TYPESCRIPT_DIRECTORY, { recursive: true });
}

files.forEach((file) => {
  const NAME = file.split('/')[file.split('/').length - 1].replace('.js', '');

  if (componentMap.has(NAME) || NAME === 'index') {
    const FILE_NAME = NAME.concat('.ts');

    const flowCode = fs.readFileSync(file, 'utf-8');

    const astData = jsc(flowCode, {
      parser: flowParser(),
    });

    astData
      .find(jsc.GenericTypeAnnotation, {
        id: { name: 'TimeoutID' },
      })
      .replaceWith('number');

      astData
      .find(jsc.GenericTypeAnnotation, {
        id: { name: 'AnimationFrameID' },
      })
      .replaceWith('number');

      astData
      .find(jsc.GenericTypeAnnotation, {
        id: { name: 'MediaQueryListListener' },
      })
      .replaceWith('MediaQueryList');

    const transformedCode = astData.toSource();

    const typescriptCode = convert.convert(transformedCode, {
      printWidth: 80,
      singleQuote: true,
      semi: false,
      prettier: true,
    });

    fs.writeFileSync(`${TYPESCRIPT_DIRECTORY}/${FILE_NAME}`, typescriptCode, (err) => {
      console.log('Error:', err);
    });
  }
});

const tsFiles = glob.sync(`${TYPESCRIPT_DIRECTORY}/*.ts`);

const tsOptions = {
  declaration: true,
  emitDeclarationOnly: true,
  declarationDir: DECLARATION_DIRECTORY,
};

const program = ts.createProgram(tsFiles, tsOptions);
const res = program.emit();

// In case there was some error while generating declaration,
// throw an error.
res.diagnostics.forEach((obj) => {
  console.log('file: ', obj.file.fileName);
  console.error('error: ', obj.messageText);
});

fs.rmSync(TYPESCRIPT_DIRECTORY, { recursive: true, force: true });

/* references
https://pspdfkit.com/blog/2020/generate-typescript-declarations-from-flow-codebase/ >> https://github.com/pinterest/gestalt/pull/1757/files
*/
