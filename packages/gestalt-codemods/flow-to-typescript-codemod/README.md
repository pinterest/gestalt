

<div align="center">
  <img
    src="./llama.png"
    alt="TypeScript Llama"
    width="160px"
  />
  <h1>Flow to TypeScript Codemod</h1>
  <br />
</div>


> <img src="https://stripe.dev/images/badges/archived.png" width="250">
>
> This project is provided as-is and is not actively maintained.

For more background on Stripe's TypeScript migration, check out our [blog post](https://stripe.com/blog/migrating-to-typescript)!

This is the codemod Stripe used to migrate 4m+ lines of [Flow](https://flow.org/en/) to [TypeScript](https://www.typescriptlang.org/).
It has a few commands to automate the separate steps of a migration:

- `setup` - Tools for installing TypeScript and type declarations in a project.
- `convert` - The main codemod, which uses Babel to convert files from Flow to TypeScript.
- `fix` - A second codemod that uses [ts-morph](https://github.com/dsherret/ts-morph) to find, fix, suppress, and report TypeScript errors after initial conversion.

Every codebase and migration will be slightly different, so we recommend forking this repository and modifying it as needed for your use case. Our applications are written in React, so other frameworks will need additional work to support.

> __Note__: We also recommend being on a version of Flow higher than `v0.92.1`, for best support retrieving missing types from Flow. Newer versions of Flow will work better.

## 🚀 Quick start

To try out this codemod on your codebase, you'll want to clone this repository and build the tool. We used `yarn` for package management but others should work as long as the patch packages are applied.

```bash
# Clone the repository
git clone https://github.com/stripe-archive/flow-to-typescript-codemod.git
cd flow-to-typescript-codemod/

# Install dependencies
yarn

# Run on a folder
yarn typescriptify convert -p ../path/to/your/codebase # Run in 'dry-run' without writing files
yarn typescriptify convert -p ../path/to/your/codebase --write --delete # Write converted files and delete Flow source

# Suppress errors
yarn typescriptify fix --autoSuppressErrors -p ../path/to/your/codebase --config ../path/to/your/codebase/tsconfig.json

```

> __Note__: You can publish this package or link it using a workspace management tool to install it into multiple projects.

## 🔨 Basic usage

The main command for the project is `typescriptify`, and there are three sub-commands:

```
typescriptify [command]

Commands:
  typescriptify setup    Set your project up to support TypeScript.
  typescriptify convert  Convert Flow-typed files to TypeScript.                              
  typescriptify fix      Use the TypeScript compiler to identify and fix errors.             

Options:
  --version  Show version number                                                                                                                           
  --help     Show help                                                                                                                                     

Examples:
  typescriptify <setup,convert,fix> --help                                         Show usage instructions for a specific command.
  typescriptify convert --path .                                                   Run the codemod in dry-run mode.
  typescriptify convert --path src/ test/                                          Run the codemod on multiple paths.
  typescriptify convert --path . --ignore flow_typed/                              Ignore files from conversion.
  typescriptify convert --path ./src --format csv --output ./migration-report.csv  Generate a CSV migration report.
  typescriptify convert --path . --write --delete                                  Fully convert a project to TypeScript, 
                                                                                   writing files and deleting Flow files.
  typescriptify convert --path . --write --target=./dist                           Specify a directory to output the TypeScript files.
  typescriptify fix --autoSuppressErrors --removeUnused                            Remove unused ts-expect-errors, and add any for current errors.
  typescriptify fix --autoSuppressErrors --jiraSlug JIRA-722                       Suppress errors but add a JIRA slug to the comments.
  typescriptify fix --generateReport --output ./migration-report.csv               Generate a CSV file of categorized TS errors.
```

## 🏃 Running conversions from Flow to TypeScript
### Dry run

By default, the codemod will run a dry run against your codebase. This mode will not actually write any TypeScript files, but will collect any potential problems in the Flow code that you may want to investigate prior to doing the actual conversion:

```bash
yarn typescriptify convert --path <path to source directory>
```

### Running the conversion

Once you are ready to generate the actual TypeScript files, add the `--write` argument. This will generate new `.ts` and `.tsx` files from existing Flow files, and will leave the Flow files intact. In order to remove the Flow files as well, add the `--delete` argument.

```bash
# By default, this will leave your Flow files intact:
yarn typescriptify convert --write --path <path to source directory>

# If you want to delete the Flow files, and leave only the TypeScript files, add --delete
yarn typescriptify convert --write --delete --path <path to source directory>

# If you want to specify a different directory to emit the TS files add --target
yarn typescriptify convert --write --path <path to source directory> --target <where the source files should go>
```

### Utility types

In cases where the conversion requires a complicated type, the codemod will insert an import for utility types:

```ts
import {Flow} from 'flow-to-typescript-codemod';
Flow.Diff<A, B>;
```

These types are defined in `./flow.d.ts`, and you'll need to do some setup to make the import work. At Stripe, we published a version of this package internally so it could be installed in each codebase and the types would be available. You could also copy `flow.d.ts` into your project and use [paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) to resolve the import.

## 📌 Advanced usage
<details>
  <summary>Click to expand!</summary>
  
### Automatically suppressing TypeScript errors
After conversion, there will likely be a number of errors in the converted TypeScript files. These errors can be the result of pre-existing issues in the Flow code, issues with the installed types, or issues with the codemod. For many conversions, the number of errors may be challenging to fix before merging. The auto suppression feature will run the TypeScript compiler against your converted code, and add [ts-expect-error](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#ts-ignore-or-ts-expect-error) annotations that suppress errors. This allows you to suppress the errors to get a passing type check, and then fix the errors in future changes. If you fix an error that fixes other errors, you can use the `removeUnused` flag to automatically remove unused suppressions.

```bash
yarn typescriptify fix --autoSuppressErrors --jiraSlug <slug i.e JIRA-722>
```
### Auto-generating declarations

If you want to continue writing Flow, but generate additional TypeScript versions, you can use the watermarking flag. Adding the `--watermark` argument will add a watermark to every file:

```bash
yarn typescriptify convert --watermark --path <path to source directory>
```

You can configure the codemod to skip files without a watermark when doing future conversions. Remove the watermark from a file to make manual edits to the type.
### Supporting prop spreads

If your codebase follows the pattern of accepting any prop, and then forwarding them to another component like this:

```ts
const MyComponent = (props: Props) => {
  const { myProp, ...rest } = props;
  return <AnotherComponent test={myProp} {...rest} />
}
```

Flow was likely typing your extra parameters as `any`, and those will be type failures in TypeScript.
We have experimental support for updating prop types to include the props of the underlying HTML element or component.
Add the `--handleSpreadReactProps` to turn on this transformation.

</details>

## 💻 Developing

```bash
# Install dependencies
yarn
# Run on a folder
yarn typescriptify convert -p ../path/to/your/codebase
# Build
yarn build
# Run tests
yarn test
# Type-check
yarn types
# Lint
yarn lint
```

## 📝 Notes

We've compiled our [notes](NOTES.md) documenting the complex type conversions.
## 🎨 Prior art

This project was built on top of [Airtable's TypeScript Codemod](https://github.com/Airtable/typescript-migration-codemod).
We're thankful for the Airtable team ([Caleb Meredith](https://github.com/calebmer) and [Andrew Wang](https://github.com/umbrant)) for open-sourcing their work, and hope others can similarly benefit from our project.

## 📎 License

This project uses the [MIT license](LICENSE).

## ✨ Contributing

This project is not being actively maintained. Please feel free to fork this repository to add changes as needed. Every migration will have some different patterns that need special logic, so it would be hard to maintain any general purpose tool for this task.

If you have questions about this code or our migration, you can reach out to members of our team:

<table>
  <tr>
    <td align="center"><a href="https://github.com/tylerkrupicka"><img src="https://avatars.githubusercontent.com/u/5761061?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tyler Krupicka</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/ken-kenware"><img src="https://avatars.githubusercontent.com/u/3946841?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ken Deland</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/RussGlover"><img src="https://avatars.githubusercontent.com/u/90730502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Russill Glover</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/benbayard"><img src="https://avatars.githubusercontent.com/u/1026035?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ben Bayard</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/alunny"><img src="https://avatars.githubusercontent.com/u/48361?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Lunny</b></sub></a><br /></td>
  </tr>
</table>

