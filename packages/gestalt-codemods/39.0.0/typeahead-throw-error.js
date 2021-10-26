/**
 * - Throw error if use Typeahead notation
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/39.0.0/typeahead-throw-error.js relative/path/to/your/code

export default function transformer({ source, path }, { jscodeshift }) {
  const researchReference = 'Typeahead';

  // Verify the imports on file
  const src = jscodeshift(source);
  src.find(jscodeshift.ImportDeclaration).forEach(({ node }) => {
    // Return null if not use gestalt and stop the loop
    if (node.source.value !== 'gestalt') {
      return null;
    }

    // If the file have a Typeahead reference throw the error
    if (node.specifiers.some((element) => element.imported?.name === researchReference)) {
      throw new Error(
        `Typeahead must be manually replaced with Combobox. Location: ${path} @line: ${node.loc.start.line}`,
      );
    }

    return null;
  });

  return null;
}
