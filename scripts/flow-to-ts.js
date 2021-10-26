const glob = require('glob');
const jsc = require('jscodeshift');
const flowParser = require('jscodeshift/parser/flow');
const fs = require('fs');
const convert = require('@khanacademy/flow-to-ts/dist/convert.bundle.js');
const ts = require('typescript');

const files = glob.sync('../packages/gestalt/src/**/*.js', {
  root: './',
  ignore: ['../packages/gestalt/src/**/*.*test*.js', '../packages/gestalt/src/**/index.js'],
});

console.log('Files founnd: ', files.length);

const TYPESCRIPT_DIRECTORY = '../packages/gestalt/typescript';

// Create typescript directory iF doesn't exist
if (!fs.existsSync(TYPESCRIPT_DIRECTORY)) {
  fs.mkdirSync(TYPESCRIPT_DIRECTORY, { recursive: true });
}

files.forEach((file) => {
  const FILE_NAME = file.split('/')[file.split('/').length - 1].replace('js', 'ts');
  const flowCode = fs.readFileSync(file, 'utf-8');

  const ast = jsc(flowCode, {
    parser: flowParser(),
  });

  ast
    .find(jsc.GenericTypeAnnotation, {
      id: { name: 'TimeoutID' },
    })
    .replaceWith('number');

  ast
    .find(jsc.GenericTypeAnnotation, {
      id: { name: 'AnimationFrameID' },
    })
    .replaceWith('number');

  ast
    .find(jsc.GenericTypeAnnotation, {
      id: { name: 'MediaQueryListListener' },
    })
    .replaceWith('MediaQueryList');

  const transformedCode = ast.toSource();

  const typescriptCode = convert.convert(transformedCode, {
    printWidth: 80,
    singleQuote: true,
    semi: false,
    prettier: true,
  });

  fs.writeFileSync(`${TYPESCRIPT_DIRECTORY}/${FILE_NAME}`, typescriptCode, (err) => {
    console.log('Error:', err);
  });
});

const tsFiles = glob.sync(`${TYPESCRIPT_DIRECTORY}/**/*.ts`);

const tsOptions = {
  declaration: true,
  emitDeclarationOnly: true,
  outFile: `${TYPESCRIPT_DIRECTORY}/index`,
};

const program = ts.createProgram(tsFiles, tsOptions);
const res = program.emit();

// In case there was some error while generating declaration,
// throw an error.
res.diagnostics.forEach((obj) => {
  console.log('file: ', obj.file.fileName);
  console.error('error: ', obj.messageText);
});
