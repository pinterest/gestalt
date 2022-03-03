# Gestalt Generic Codemods

Before you start building codemods, please read the following documentation.

## What are codemods?

Codemods are scripts used to programatically rewrite code across our codebase. Think of them as a find and replace functionality that can read and write code. Codemods can be used to update source code to fit coding conventions, make widespread changes when an API is modified, or even auto-fix existing code when your public package makes a breaking change.

## What is jscodeshift?

jscodeshift is a toolkit for running codemods over multiple JavaScript files.

See jscodeshift documentation: https://github.com/facebook/jscodeshift

Learn more about working with jscodeshift codemods: Write Code to Rewrite Your Code: jscodeshift https://www.toptal.com/javascript/write-code-to-rewrite-your-code


### Summary of concepts

-  jscodeshift is a wrapper around recast and ast-types packages.
  - recast handles the conversion from source to abstract syntax tree (AST)
  - ast-types handles the low-level interaction with the AST nodes.

- 3 main objects jscodeshift API works with:
  - nodes or AST nodes: plain JavaScript objects with a specific set of fields and with no methods in accordance with the Mozilla Parser API. Thet compose the AST. Use https://astexplorer.net/ to look into AST nodes. The primary way to identify nodes is via their "type".
  - node-paths or path object: wrappers around AST nodes (provided by ast-types). Paths contain meta-information (scope or relationships of the node), store the AST node in the node property, and provide methods to process AST nodes.
  - collections: groups of 0 or more node-paths that the jscodeshift API returns when you query the AST. A collection has methods to process the nodes inside a collection, often resulting in a new collection.

  Collections contain node-paths >
  Node-paths contain nodes >
  Nodes constitute AST

- It's recommended to install the  jscodeshift-helper package (https://www.npmjs.com/package/jscodeshift-helper) to help you develop codemods


## Run a codemod

Run a codemod with `yarn codemod`:

```
yarn codemod name --option1=value1
```

## Existing codemods

- `replaceImportType`: Replace the name of an imported type.

## Add a codemod

Check out the docs in [jscodeshift](https://github.com/facebook/jscodeshift) from facebook and follow these steps:

1. Add a top level JavaScript file in the `scripts/codemods/` directory which exports a `transformer` function.
2. Add a test in `__tests__/`
3. Add test fixtures to `__testfixtures__/`
