# Gestalt Generic Codemods

Before you start building codemods, please read the following documentation.

## What are codemods?

Codemods are scripts used to programatically rewrite code across our codebase. Think of them as a find and replace functionality that can read and write code. Codemods can be used to update source code to fit coding conventions, make widespread changes when an API is modified, or even auto-fix existing code when your public package makes a breaking change.

## What is jscodeshift?

jscodeshift is a toolkit for running codemods over multiple JavaScript files.

See jscodeshift documentation:

- https://github.com/facebook/jscodeshift
- https://htmlpreview.github.io/?https://raw.githubusercontent.com/facebook/jscodeshift/aea20523d9d616e7debc7bc00b66835284278555/docs/index.html

Learn more about working with jscodeshift codemods: Write Code to Rewrite Your Code: jscodeshift

- https://www.toptal.com/javascript/write-code-to-rewrite-your-code

Finally, it can come handy the jscodeshift API

- https://npmdoc.github.io/node-npmdoc-jscodeshift/build/apidoc.html#apidoc.element.jscodeshift.jscodeshift

### Summary of concepts

- jscodeshift is a wrapper around recast and ast-types packages.
- recast handles the conversion from source to abstract syntax tree (AST)
- ast-types handles the low-level interaction with the AST nodes.

- 3 main objects jscodeshift API works with:

  - nodes or AST nodes: plain JavaScript objects with a specific set of fields and with no methods in accordance with the Mozilla Parser API. Thet compose the AST. Use https://astexplorer.net/ to look into AST nodes. The primary way to identify nodes is via their "type".
  - node-paths or path object: wrappers around AST nodes (provided by ast-types). Paths contain meta-information (scope or relationships of the node), store the AST node in the node property, and provide methods to process AST nodes.
  - collections: groups of 0 or more node-paths that the jscodeshift API returns when you query the AST. A collection has methods to process the nodes inside a collection, often resulting in a new collection.

  Collections contain node-paths >
  Node-paths contain nodes >
  Nodes constitute AST

- It's recommended to install the jscodeshift-helper package (https://www.npmjs.com/package/jscodeshift-helper) to help you develop codemods

## jscodeshift Limitations

When using the find() method in the Collection object, the resulting Collection doesn't return unique nodepaths when matching complex objects are nested within each other. Therefore, in a <Box color='red'> containing <Box color='red'>, the matching results won't be a Collection of 2 nodepaths but a Collection of 3. If the child Box, also contains another <Box color='red'>, the Collection won't be 3 nodepaths but 6 nodepaths. Related to this issue, the remove() method in nested-result Collections throws errors while replaceWith() can be used instead.

## Run a codemod

Run a codemod with `yarn codemod`:

See each individual codemod for more information on how to run each particular one.

## Existing codemods

- `renameComponent`: Rename Gestalt components.
- `modifyProp`: Modify (rename or remove) Gestalt component props.
- `modifyPropValue`: Modify (rename, add, or remove) prop-value combinations in Gestalt component.
- `throwErrorMessage`: Throws error messages when detects components, props, and prop-value combinations in Gestalt components.

## Add a codemod

1. Add a top level JavaScript file in the `packages/gestalt-codemods/generic-codemods/` directory which exports a `transform` function.
2. Add a test in `__tests__/`
3. Add test fixtures to `__testfixtures__/`
