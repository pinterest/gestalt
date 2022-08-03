# Gestalt Codemods

Before you start building codemods, please read the following documentation.

## What are codemods?

Short for "code modification", codemods are scripts used to programatically rewrite code across our codebase. Built on [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) analysis of the code, codemods can make tedious, complicated refactors quick and easy. Think of them as a find and replace functionality that can read and write code.

## When do we use codemods?

Codemods can be used to update source code to fit coding conventions, make widespread changes when an API is modified, or even auto-fix existing code when your public package makes a breaking change.

For Gestalt, we use codemods whenever we introduce breaking changes to a component: renaming or removing props, renaming or removing entire components, etc. If a Gestalt user upgrades to the newest version and their code breaks, we need to write a codemod to address that. This typically corresponds to a major version change, and should be included in the PR introducing the breaking changes.

## Why use codemods?

Codemods are useful for any consumer of Gestalt, thus our policy to create codemods for any breaking change.

Overtime, we've developed custom codemods for each major version. However, we're moving towards generic codemods to prevent custom codemods for straighforward changes such as basic renames, deletions, or detection for manaul replacements. Complex API changes still require custom codemods.

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

  - nodes or AST nodes: plain JavaScript objects with a specific set of fields and with no methods in accordance with the Mozilla Parser API. They compose the AST. Use https://astexplorer.net/ to look into AST nodes. The primary way to identify nodes is via their "type".

  - node-paths or path object: wrappers around AST nodes (provided by ast-types). Paths contain meta-information (scope or relationships of the node), store the AST node in the node property, and provide methods to process AST nodes.

  References:
  https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation#nodepaths
  https://github.com/benjamn/ast-types#nodepath
  https://github.com/benjamn/ast-types#scope

  - collections: groups of 0 or more node-paths that the jscodeshift API returns when you query the AST. A collection has methods to process the nodes inside a collection, often resulting in a new collection.

  References:
  https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation#collections
  https://github.com/facebook/jscodeshift/blob/master/src/Collection.js

  Collections contain node-paths >
  Node-paths contain nodes >
  Nodes constitute AST

- It's recommended to install the jscodeshift-helper package (https://www.npmjs.com/package/jscodeshift-helper) to help you develop codemods.

## jscodeshift Limitations

When using the find() method in the Collection object, the method traverses each node and its children recursively. This affects the resulting Collections. If we chain two find methods, the second find method will traverse all nodePaths returned in the first method including their children.
At a practical level, this affects in different ways. In a <Box color='red'> nesting another <Box color='red'>, the matching results won't be a Collection of 2 nodePaths but a Collection of 3 (parent, child 1, and repeated child 1). If the child Box, also contains another <Box color='red'>, the Collection won't be 3 nodePaths but 6 nodePaths (parent, child 1, child 2, repeated child 1, repeated child 2, and repeated child 2). Also, considering the case <Box color='red'> nesting <Flex color='red'>, if we first look for Box components and we chain the resulting collection with a find method to look for attributes color='red', the final Collection will include both Box and its nested Flex as when looking into Box for color='red', it also traverses its children, finding and returning the Flex component.

To prevent this, most finds are complemented with a filter that matches the JSX element name to the component and subcomponent name, to exclude those children.

Related to this issue, the remove() method in nested-result Collections throws errors while replaceWith() can be used instead.

## Run a codemod

Run a codemod with `yarn codemod`:

See each individual codemod for more information on how to run each particular one.

## Existing generic codemods

- `renameComponent`: Rename Gestalt components.
- `modifyProp`: Modify (rename or remove) Gestalt component props.
- `modifyPropValue`: Modify (rename, add, or remove) prop-value combinations in Gestalt component.
- `detectManualReplacement`: Throws error messages when detects components, props, and prop-value combinations in Gestalt components.

## How do we develop codemods?

BEFORE YOU START DEVELOPING CODEMODS READ THE FOLLOWING SECTIONS

- What is jscodeshift?
- Summary of concepts

### Create a file structure

1. If it's a generic codemods, add a top level JavaScript file in the `packages/gestalt-codemods/generic-codemods/` directory.

If it's a custom codemods, create a folder within `packages/gestalt-codemods` for the next major version (check the [Releases page](https://github.com/pinterest/gestalt/releases) to see the most recent version number).

2. Add a couple of sub-folders, `__tests__` and `__testfixtures__`.

3. Create a file with a name describing the change your codemod will be making, like `button-replace-color-with-type.js`. Create a corresponding `.test.js` file in the `__tests__` folder.

### Develop your codemod

4. You can pattern-match (really copy/paste/adjust) the test file from previous ones. It's largely boilerplate. In addition to the file name, the main part you'll change is to individually list the fixtures files you'll create in `__testfixtures__`.

In the codemod file, add a usage comment at the top describing the purpose of the codemod (expected input and output) as well as a CLI command for easy copy/paste usage:

```js
yarn codemod --parser=flow -t=packages/gestalt-codemods/{version number}/{codemod file name} relative/path/to/code/to/modify
```

5. Now comes the fun part: create your transform function! We use [jscodeshift](https://github.com/facebook/jscodeshift), so you'll want to familiarize yourself with that specific flavor of AST traversal and manipulation. [AST Explorer](https://astexplorer.net/) is invaluable for familiarizing yourself with how specific blocks of code are parsed in an AST.

We recommend taking a test-driven approach. Create input files in the `__testfixtures__` folder to replicate all the expected usages that will need to be transformed. Each `.input.js` file should have a corresponding `.output.js` file with the expected output after running the codemod. We recommend creating the input files, duplicating them to create the output files, then manually making the expected changes. Be thorough, and think like a testing engineer! You want to make sure you capture every edge/corner case that might exist: was the component import renamed? Was the prop given a variable as a value? Or does it use a ternary? Are the ternary values primitives or variables themselves? There are limits to what codemods can do — but not many! Remember to also test instances where the codemod should _not_ change anything.

One codemod limit is dealing with spread props, something like `<Component {...props} />`. Typically in this case we throw an error noting the location, with a message indicating that the component will need to be updated manually. There can be other cases where a prop value is defined outside of the file at hand (e.g. a wrapper component that passes a prop directly through to the Gestalt component) — we typically take a similar error+message approach. You're largely writing the codemod to save yourself manual work when you update the Gestalt version in your repo, so cover as many cases as you can, but know that some cases can't be covered (or aren't worth the time).

Once you have your fixture files, start running the test watcher using `yarn jest packages/gestalt-codemods/{codemod name} --watch`. As you develop your transformer function, we recommend starting with the simplest cases and building up to the more complex ones (disable the tests you're not addressing yet to speed up the development cycle). Once all your tests pass, you're done! Double-check that you've covered every possible type of usage, then commit your codemod work with the rest of your changes. They should be in the same PR.
