import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  FixCommandCliArgs,
  DEFAULT_WATERMARK_MESSAGE,
  DEFAULT_WATERMARK_TAG,
  MigrationReportFormat,
  migrationReportFormats,
  ConvertCommandCliArgs,
  SetupCommandCliArgs,
} from "./arguments";

/**
 * Use yargs to parse CLI args, and then pass them to command functions
 * @param convert - Function to call the convert command
 * @param fix -  Function to call the fix command
 * @param setup - Function to call the setup command
 */
export const parseCommands = (
  convert: (args: ConvertCommandCliArgs) => void,
  fix: (args: FixCommandCliArgs) => void,
  setup: (args: SetupCommandCliArgs) => void
) => {
  const yargsInstance = yargs(hideBin(process.argv));

  yargsInstance
    .scriptName("typescriptify")
    .version()
    .help()
    .example(
      "$0 <setup,convert,fix> --help",
      "Show usage instructions for a specific command."
    )
    .example("$0 convert --path .", "Run the codemod in dry-run mode.")
    .example(
      "$0 convert --path src/ test/",
      "Run the codemod on multiple paths."
    )
    .example(
      "$0 convert --path . --ignore flow_typed/ ",
      "Ignore files from conversion."
    )
    .example(
      "$0 convert --path ./src --format csv --output ./migration-report.csv",
      "Generate a CSV migration report."
    )
    .example(
      "$0 convert --path . --write --delete",
      "Fully convert a project to TypeScript, writing files and deleting Flow files."
    )
    .example(
      "$0 convert --path . --write --target=./dist",
      "Specify a directory to output the TypeScript files. Useful for making declarations."
    )
    .example(
      "$0 fix --autoSuppressErrors --removeUnused",
      "Remove unused ts-expect-errors, and add any for current errors."
    )
    .example(
      "$0 fix --autoSuppressErrors --jiraSlug JIRA-722",
      "Suppress errors but add a JIRA slug to the comments."
    )
    .example(
      "$0 fix --generateReport --output ./migration-report.csv",
      "Generate a CSV file of categorized TS errors."
    )
    .wrap(yargsInstance.terminalWidth())
    .command(
      "setup",
      "Set your project up to support TypeScript.",
      async (yargs) => {
        return yargs
          .option("silent", {
            alias: "s",
            type: "boolean",
            default: false,
            describe: "Prevent logging.",
          })
          .option("installTS", {
            type: "boolean",
            default: false,
            describe: "Install the recommended version of TypeScript.",
          })
          .option("setupTSConfig", {
            type: "boolean",
            default: false,
            describe:
              "Add a TSConfig that inherits from the shared TSConfig at a higher directory. Use tsc if you want to setup a base config.",
          })
          .option("recommendTypeDefinitions", {
            type: "boolean",
            default: false,
            describe:
              "Analyze dependencies for this project and recommend type definitions to install.",
          })
          .option("path", {
            type: "string",
            default: ".",
            describe: "Path to TSConfig.",
          })
          .option("format", {
            type: "string",
            choices: migrationReportFormats,
            default: "stdout" as MigrationReportFormat,
            describe: "Format of report.",
          })
          .option("output", {
            type: "string",
            default: ".",
            describe: "Path to output report.",
          });
      },
      setup
    )
    .command(
      ["convert", "run"],
      "Convert Flow-typed files to TypeScript.",
      (yargs) => {
        return yargs
          .option("delete", {
            alias: "d",
            type: "boolean",
            default: false,
            describe: "Delete Flow files after conversion.",
          })
          .option("silent", {
            alias: "s",
            type: "boolean",
            default: false,
            describe: "Prevent logging.",
          })
          .option("write", {
            alias: "w",
            type: "boolean",
            default: false,
            describe:
              "Whether or not to actually write the generated typescript files. Will only do a dry run and generate a report if this is omitted.",
          })
          .option("target", {
            type: "string",
            default: "",
            describe: "Where the codemod should write the modified files.",
          })
          .option("watermark", {
            type: "boolean",
            default: false,
            describe:
              "Add a watermark to the top of generated typescript files. Useful if you are going to regenerate files on every build.",
          })
          .option("path", {
            alias: "p",
            type: "array",
            default: ["."],
            describe: "Path to source files for conversion.",
          })
          .option("ignore", {
            type: "array",
            default: [],
            describe: "Directories or files to ignore.",
          })
          .option("format", {
            alias: "f",
            choices: migrationReportFormats,
            default: "stdout" as MigrationReportFormat,
            describe: "Format of report.",
          })
          .option("output", {
            alias: "o",
            type: "string",
            default: "./migration-report.json",
            describe: "Path to output migration report.",
          })
          .option("watermark", {
            type: "boolean",
            default: false,
            describe:
              "Add a watermark to the top of generated typescript files.",
          })
          .option("tag", {
            type: "string",
            default: DEFAULT_WATERMARK_TAG,
            describe:
              "The top line tag used in the watermark. Only used if watermark is enabled.",
          })
          .option("message", {
            type: "string",
            default: DEFAULT_WATERMARK_MESSAGE,
            describe:
              "The message block comment used under the tag in the watermark. Only used if watermark is enabled.",
          })
          .option("useStrictAnyObjectType", {
            type: "boolean",
            default: false,
            describe: `Flow has a deprecated 'Object' type that translates to any. By default, typescriptify will take the safe route and just use an equivalent any statement. By enabling this flag, Typescriptify will attempt to use a stricter, type safe semantic equivalent of the Object type.`,
          })
          .option("useStrictAnyFunctionType", {
            type: "boolean",
            default: false,
            describe: `Flow has a deprecated 'AnyFunction' type that translates to any. By default, typescriptify will take the safe route and just use an equivalent any statement. By enabling this flag, Typescriptify will attempt to use a stricter, type safe semantic equivalent of the AnyFunction type.`,
          })
          .option("dropImportExtensions", {
            type: "boolean",
            default: false,
            describe: `Remove JS file extensions like '.js' and '.jsx' in imports, since they will not resolve when the extension changes`,
          })
          .option("keepPrivateTypes", {
            type: "boolean",
            default: false,
            describe: `Don't substitute "." for "$" private subtypes of namespaces.`,
          })
          .option("handleSpreadReactProps", {
            type: "boolean",
            default: false,
            describe: `Flow allows for open objects by default, while TypeScript does not. This flag will modify the React Props to include the props of the underlying HTML Element or component if a spread is present.`,
          })
          .option("forceTSX", {
            type: "boolean",
            default: false,
            describe: `Rename all files to TSX extensions, so that only one extension type is used in the codebase. This is helpful for projects that only used a single extension in Flow.`,
          })
          .option("skipNoFlow", {
            type: "boolean",
            default: false,
            describe: `Skip processing any files found with the @noflow annotation. The default process is to replace @noflow with @ts-nocheck, and change the extension to ts.`,
          })
          .option("disableFlow", {
            type: "boolean",
            default: false,
            describe:
              "Do not use Flow to get inferred types, just insert any. This is useful if the Flow server is taking a while to resolve types.",
          })
          .option("stripPathsForIgnore", {
            type: "boolean",
            default: false,
            describe:
              "Strip any leading relative parts when passing paths to ignore.",
          })
          .option("convertUnannotated", {
            type: "boolean",
            default: false,
            describe: `Converts files with no flow annotations as no-Flow files`,
          });
      },
      convert
    )
    .command(
      ["fix", "check"],
      "Use the TypeScript compiler to identify and fix errors.",
      (yargs) => {
        return yargs
          .option("format", {
            alias: "f",
            choices: migrationReportFormats,
            default: "stdout" as MigrationReportFormat,
            describe: "Format of report.",
          })
          .option("silent", {
            alias: "s",
            type: "boolean",
            default: false,
            describe: "Prevent logging.",
          })
          .option("tsProps", {
            type: "boolean",
            default: false,
            describe:
              "Check for cases where props were passed to a React component that were not defined. Helpful to identify props types that need to be fixed.",
          })
          .option("autoSuppressErrors", {
            type: "boolean",
            default: false,
            describe:
              "Auto suppress any TypeScript errors with a ts-expect-error comment containing the error.",
          })
          .option("generateReport", {
            type: "boolean",
            default: false,
            describe: "Generate a report of TypeScript errors.",
          })
          .option("jiraSlug", {
            type: "string",
            default: "",
            description:
              "Jira slug to use for suppression comments. E.g JIRA-711",
          })
          .option("useIgnore", {
            type: "boolean",
            default: false,
            describe:
              "Auto suppress any TypeScript errors with a ts-ignore, instead of ts-expect-error",
          })
          .option("removeUnused", {
            type: "boolean",
            default: false,
            describe: "Remove unused ts-expect-error comments.",
          })
          .option("config", {
            type: "string",
            default: "./tsconfig.json",
            describe:
              "Specify the tsconfig to be used for the fix command, if different from the default.",
          })
          .option("autoImport", {
            type: "boolean",
            default: false,
            describe: "Auto import missing types using TypeScript.",
          })
          .option("fixTypeExports", {
            type: "boolean",
            default: false,
            describe:
              "Experimental: Fix exported types to use type-only exports, to fix isolatedModules errors.",
          });
      },
      fix
    )
    .parse();
};
