// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
/**
 * Used to find and replace text across the repo. Similar to VSC's find and replace.
 */

const { execSync } = require('child_process');

const replaceMap = {
  '--sema-space-gap-vertical-lg': '--sema-space-200',
  '--sema-space-gap-vertical-xl': '--sema-space-300',
  '--sema-space-gap-vertical-sm': '--sema-space-100',
  '--sema-space-gap-vertical-xxl': '--sema-space-400',
  '--sema-space-padding-horizontal-xxl': '--sema-space-400',
  '--sema-space-padding-horizontal-xl': '--sema-space-300',
  '--sema-space-padding-horizontal-sm': '--sema-space-100',
  '--sema-space-padding-horizontal-lg': '--sema-space-200',
  '--sema-font-weight-ui': '--base-font-weight-500',
  '--sema-font-weight-body': '--base-font-weight-400',
  '--sema-rounding-md': '--sema-rounding-300',
  '--sema-font-lineheight-UI-XS': '--sema-font-lineheight-ui-xs',
};

const pathsToInclude = ['packages/gestalt', '*.css'];
const pathsToExclude = ['gestalt.css', 'node_modules', 'dist'];

// check if replace command exists
if (!execSync('which replace')) {
  console.error('Please install replace. Run `npm install -g replace`');
  process.exit(1);
}

// eslint-disable-next-line no-restricted-syntax
for (const termToFind of Object.keys(replaceMap)) {
  const termToReplace = replaceMap[termToFind];
  console.log(' ');
  console.log('Replacing all instances of', termToFind, 'with', termToReplace);
  console.log(' ');
  const command = `replace \\"${termToFind}\\" \\"${termToReplace}\\"  .. -r --exclude="${pathsToExclude.join(
    ',',
  )}" --include="${pathsToInclude.join(',')}"`;
  const resp = execSync(command);
  console.log(resp.toString());
  console.log('-----------------------------------');
}
